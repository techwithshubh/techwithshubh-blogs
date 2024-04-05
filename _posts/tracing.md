---
title: 'How to setup Distributed Tracing in Express Project'
date: '2024-04-06'
category: 'Observability'
coverImage: '/assets/posts/tracing.webp'
tags: 'Microservices, Observability, OpenTelemetry'
excerpt: "In this guide, ,we're diving deep into the art of crafting distributed tracing for your express microservices using the powerful duo of OpenTelemetry and Signoz."
---

In this guide, we're diving deep into the art of crafting Distributed Tracing for your express microservices using the powerful duo of OpenTelemetry and Signoz. 

We're start with the Manual Instrumentation option from OpenTelemetry. Starting with manual helps you learn the basics before moving to automated instrumentation. We think a mix of both is best. Manual lets you understand tracing better and tailor your monitoring exactly how you want it. As you get more experienced, you can switch to automated for efficiency while still keeping that personalized touch.

### Prequisites

* You should have Node and npm installed
* You should be familiar with Node and the npm ecosystem
* You have a code editor installed (preferably VS Code, it's the champ for TypeScript)

### Goals

In this short guide, I'll walk you through the process of adding distributed tracing, both manual and automated way in your express microservices. Trust me, it's as easy as pie!

* Learn how to set up tracing step by step, no sweat.
* Understand how to pass tracing info between your microservices.
* And the best part? See it all come to life in Signoz or your favorite Observability platform.

### What is distributed tracing

Distributed tracing in microservices allows developers to track and analyze the flow of requests as they move through interconnected services, providing insights into performance and troubleshooting. By tracing the journey of requests across the system, developers can identify bottlenecks, debug errors, and optimize performance for enhanced reliability and efficiency in distributed environments.

### Initial Setup

First things first, let's grab the starter code from our trusty old friend, Github. Don't sweat it, I'll walk you through everything.

```bash
git clone https://github.com/techwithshubh/opentelemetry-tuts.git
cd opentelemetry-tuts
```

Here's a quick rundown of what you'll find in the code:

* src/orders-service.ts: This file houses a method called get which fetches all the orders associated with a specific user ID.
* src/users-service.ts: Inside this file, you'll find another method called get that retrieves user details such as name and email, based on the provided user ID.
* package.json: Take a peek here to see what dependencies we're using, like express and axios.

Install `signoz` using the below command

```bash
git clone -b main https://github.com/SigNoz/signoz.git && cd signoz/deploy/

# Before starting, Rmove `hotrod` and `load_hotrod` services from docker compose file.
docker compose -f docker/clickhouse-setup/docker-compose.yaml up -d
```

### Adding Distributed Tracing

Before we embark on our tracing journey, let's make sure OpenTelemetry is all set up in our Node.js application. Here's what you need to do:

```bash
npm i @opentelemetry/api \
    @opentelemetry/resources \
    @opentelemetry/semantic-conventions \
    @opentelemetry/sdk-trace-base
```

**Initializing the Trace Provider**: We start by initializing the Trace Provider with the desired configuration, including the resource attributes, processor, and exporter.

```js
//src/libs/telemetry.ts

import { Resource } from "@opentelemetry/resources";
import {
  SEMRESATTRS_SERVICE_NAME,
  SEMRESATTRS_SERVICE_VERSION,
} from "@opentelemetry/semantic-conventions";
import opentelemetry from "@opentelemetry/api";
import {
  BasicTracerProvider,
  BatchSpanProcessor,
  ConsoleSpanExporter,
} from "@opentelemetry/sdk-trace-base";

const init = (serviceName: string, serviceVersion: string) => {
  const resource = Resource.default().merge(
    new Resource({
      [SEMRESATTRS_SERVICE_NAME]: serviceName,
      [SEMRESATTRS_SERVICE_VERSION]: serviceVersion,
    })
  );

  // Add a span processor to process spans and export them to the console
  const provider = new BasicTracerProvider({
    resource: resource,
  });
  provider.addSpanProcessor(new BatchSpanProcessor(new ConsoleSpanExporter()));
  provider.register();

  // Retrieve a tracer instance associated with the given service name
  const tracer = provider.getTracer(serviceName);

  return { tracer };
};
```

* **Resources** represent the entities or attributes associated with our application. These could include information such as service name, version, environment, etc. Resources help contextualize traces and provide additional metadata.

* **Processors** manipulate spans before they are exported. They can be used for tasks like sampling, filtering, or adding additional attributes to spans. In our case, we'll keep the processor simple, but it's worth noting its importance for more complex tracing scenarios.

* **Exporters** are responsible for transmitting trace data to a backend system for storage, analysis, and visualization. OpenTelemetry supports various exporters, including console, Zipkin, Jaeger, and others. For simplicity, we'll use the console exporter in this example.


**Creating Spans**: Within our application code, we manually create spans to represent units of work or operations. For example, when a user requests a service orders, we create a span to encompass the entire orders process.

```js
// src/orders-service.ts

import init from "./libs/telemetry";
const { tracer } = init("orders-service", "0.0.1");

app.get("/order", async (request: Request, response: Response) => {
  // Start an active span named "Get Order Details"
  tracer.startActiveSpan(
    "Get Order Details",
    { kind: SpanKind.CLIENT },
    async (span: Span) => {
      try {
        const userId = request.get("X-User-Id");
        if (!userId) {
          throw new Error("A really bad error :/");
        }

        // Set span attributes for HTTP method and route
        span.setAttribute(SEMATTRS_HTTP_METHOD, "GET");
        span.setAttribute(SEMATTRS_HTTP_ROUTE, `/user/${userId}`);

        // Add an event to the span indicating calling Users Service
        span.addEvent("Calling Users Service");

        const user = await axios.get(`http://localhost:8090/user/${userId}`);

        const order = {
          productName: faker.commerce.productName(),
          productDescription: faker.commerce.productDescription(),
          price: faker.commerce.price(),
        };

        // Set span status based on the HTTP response status from Users Service
        span.setStatus({
          code: user.status,
        });

        // End the span
        span.end();
        response.json(Object.assign(order, user.data));
      } catch (e: any) {
        // If an error occurs, record the exception in the span
        span.recordException(e);
        span.end();
        response.sendStatus(500);
      }
    }
  );
});
```

**Explanation**

* `startActiveSpan` is used to start the span. Span consist of Name, Kind(Whether it is Server or Client) and a callback.
* Enrich spans with relevant `attributes` such as service name, operation name, and any additional contextual information.
* Throughout the lifecycle of a span, we record `events` to mark significant moments or actions.
* Once the operation represented by a span is complete, we end the span, signaling its conclusion.
* One special kind of event in span is Exception which is logged using `span.recordException` method.

Similar steps are followed in Users Service as well.

```js
// src/users-service.ts

app.get('/user/:userid', async (request:Request, response:Response) => {
    tracer.startActiveSpan("Get User Details",{ kind: SpanKind.SERVER }, async (span: Span)=>{
        try {
            const userId = request.params['userid']
            if (!userId) {
                throw new Error('A really bad error :/')
            }
            span.setAttribute("user.id",userId)
            const user = {
                userid: userId,
                userName: faker.person.fullName(),
                userPhone: faker.phone.number()
            }
            span.addEvent(`User with ${userId} generated`)
            span.end()
            response.json(user);
        } catch (e:any) {
            span.recordException(e);
            span.end()
            response.sendStatus(500);
        }
    })
})
```

The sample trace object from users-service includes the following properties:. Note that the parentId is not defined; ideally, it should be the parentId of the Orders Service trace. Here comes the concept of Context Propagation.

```js
{
  traceId: '0d2c02e3042e4df053966ab5cc085b37',
  parentId: undefined, // It should have orders service traceId
  traceState: undefined,
  name: 'Get User Details',
  id: '8daa81ddf15969bf',
  kind: 1,
  timestamp: 1711985636362000,
  duration: 2446,
  attributes: { 'user.id': '1' },
  status: { code: 0 },
  events: [
    {
      name: 'User with 1 generated',
      attributes: {},
      time: [ 1711985636, 364333458 ],
      droppedAttributesCount: 0
    }
  ],
  links: []
}
```

**Context Propagation**:Trace context encompasses all the information necessary to identify and correlate spans within a trace. It typically includes the Trace ID, which uniquely identifies a trace, and the Span ID, which uniquely identifies a span within that trace.Propagation involves transmitting trace context between different services. When a service makes an outgoing request, it includes trace context in the request headers. Upon receiving the request, the receiving service extracts this context from the headers and uses it to create or continue the trace.

**Installation**: Ensure you have the necessary OpenTelemetry packages installed, including the W3C Trace Context Propagator package.

```bash
npm install @opentelemetry/core
```

Initialize the `W3CTraceContextPropagator` in `telemetry.ts` file

```js
// src/libs/telemetry

import { W3CTraceContextPropagator } from "@opentelemetry/core";

//inside init function
const propagator = new W3CTraceContextPropagator();
return { tracer, propagator };
```

```js
// orders-service.ts

const carrier = {};

propagator.inject(
  trace.setSpanContext(ROOT_CONTEXT, span.spanContext()),
  carrier,
  defaultTextMapSetter
);

const user = await axios.get(`http://localhost:8090/user/${userId}`, {
  headers: {
    TraceContext: JSON.stringify(carrier),
  },
});
```

* Carrier object will contains the active traceId, spanId and Trace Flags. For Injecting these details, call `propagator.inject` method.
* Once the inject method is called, pass the carrier as Custom header while calling the User service.

Consume the parent context in users-service using the below approach:

```js
// users-service.ts

const traceparent = request.get("TraceContext") || "";
const parentCtx = propagator.extract(
  ROOT_CONTEXT,
  JSON.parse(traceparent),
  defaultTextMapGetter
);

tracer.startActiveSpan(
  "Get User Details",
  { kind: SpanKind.SERVER },
  parentCtx,
  async (span: Span) => {}
);
```

* Get the trace details from the Custom header.
* Use `propagator.extract` method for getting the traceId, spanId and Trace Flag from parent span.
* In `startActiveSpan`, pass the extracted context as third parameter. This will automatically add the parentId in trace object. 

The final `users-service` trace object with parent id of orders-service span.

```js
{
  traceId: 'f0257b911326fc360ef8e9db3009245b',
  parentId: 'c0ccec86f8057e41',
  traceState: undefined,
  name: 'Get User Details',
  id: '9f0e7e73d6e1bf25',
  kind: 1,
  timestamp: 1711987438139000,
  duration: 4305.833,
  attributes: { 'user.id': '1' },
  status: { code: 0 },
  events: [
    {
      name: 'User with 1 generated',
      attributes: {},
      time: [ 1711987438, 143296208 ],
      droppedAttributesCount: 0
    }
  ],
  links: []
}
```

**Exporting Traces to Signoz using otlp collector**

Install the neccessary package.

```bash
npm i @opentelemetry/exporter-trace-otlp-http
```

Replace `ConsoleSpanExporter` with `OTLPTraceExporter` as shown below.

```js
// src/libs/telemetry.ts

provider.addSpanProcessor(
  new BatchSpanProcessor(
    new OTLPTraceExporter({
      url: "http://localhost:4318/v1/traces",
    })
  )
);
```

### Automated Instrumentation

Opentelemetry provides multiple auto instrumentations based on the nature of application(Node, Express, gRPC etc). Using Auto over manual in OpenTelemetry offers automated tracking of HTTP requests, providing simplified implementation and consistent monitoring, enhancing observability in distributed systems.

**Installation**

```
npm i @opentelemetry/sdk-trace-node \
 @opentelemetry/instrumentation-http
```

Update the `tracing.ts` file. Instead of using Basic Tracer, use `NodeTracerProvider`. 

```js
// src/libs/telemetry.ts

// NodeTraceProvider instead of BasicTracerProvider
const provider = new NodeTracerProvider({
  resource: resource,
});

provider.addSpanProcessor(
  new BatchSpanProcessor(
    new OTLPTraceExporter({
      url: "http://localhost:4318/v1/traces",
    })
  )
);
provider.register();

// imported from @opentelemetry/instrumentation
registerInstrumentations({
  instrumentations: [new HttpInstrumentation()],
});

const tracer = provider.getTracer(serviceName);

// remove propagator as HTTPInstrumentation will automatically handles it!!
// Note: Context Propagation doesn't work with Fetch API
return { tracer };
```

Remove all the tracing related code from both `orders-service` and `users-service`. The HttpInstrumentation trace object has the following properties:


```js
{
  traceId: '1af966d49324b1cec3fbba947af4fc54',
  parentId: '7f2c258cfc47f5f3',
  traceState: undefined,
  name: 'GET',
  id: 'e10ea6082790b542',
  kind: 1,
  timestamp: 1711992571813000,
  duration: 13373.291,
  attributes: {
    'http.url': 'http://localhost:8090/user/1',
    'http.host': 'localhost:8090',
    'net.host.name': 'localhost',
    'http.method': 'GET',
    'http.scheme': 'http',
    'http.target': '/user/1',
    'http.user_agent': 'axios/1.6.8',
    'http.flavor': '1.1',
    'net.transport': 'ip_tcp',
    'net.host.ip': '::1',
    'net.host.port': 8090,
    'net.peer.ip': '::1',
    'net.peer.port': 52540,
    'http.status_code': 200,
    'http.status_text': 'OK'
  },
  status: { code: 0 },
  events: [],
  links: []
}
```

![Signoz Tracing Example](/assets/posts/signoz-tracing.webp)

### Hybrid Approach

Sometimes, you need to add custom attributes, events, status, links etc in the trace span. Here is the example of how you can add custom event in `orders-service.ts`.

```js
//src/orders-service.ts

const activeSpan = trace.getSpan(context.active());

activeSpan?.setAttribute("custom.user.id", userId);

const user = await axios.get(`http://localhost:8090/user/${userId}`);

activeSpan?.addEvent("User generated successfully");
```

![Signoz Tracing Example](/assets/posts/signoz-hybrid.webp)

### View the source

A reminder that you can view the entire source code for this [here](https://github.com/techwithshubh/opentelemetry-tuts/tree/hybrid-tracing).
