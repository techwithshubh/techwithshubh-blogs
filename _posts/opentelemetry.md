---
title: 'Setting Up OpenTelemetry and Signoz in Express Microservices'
date: '2024-04-02'
category: 'Observability'
coverImage: '/assets/posts/opentelemetry.webp'
tags: 'Microservices, Observability, OpenTelemetry'
excerpt: "In this guide, ,we're diving deep into the art of crafting Observability for your express microservices using the powerful duo of OpenTelemetry and Signoz."
---

In this guide, ,we're diving deep into the art of crafting Observability for your express microservices using the powerful duo of OpenTelemetry and Signoz. 

We're putting you in the driver's seat with the Manual Instrumentation option offered by OpenTelemetry. Why? Because who doesn't love having total control? With this approach, you'll wield the power to monitor precisely what matters most to you, custom-tailored to your system's unique intricacies.

### Prequisites

* You should have Node and npm installed
* You should be familiar with Node and the npm ecosystem
* You have a code editor installed (preferably VS Code, it's the champ for TypeScript)

### Goals

In this short guide, I'll walk you through the process of adding distributed tracing, logging and metrics in your express microservices. Trust me, it's as easy as pie!

* Learn how to set up tracing step by step, no sweat.
* Understand how to pass tracing info between your microservices.
* Get cozy with logging using Winston, combined effortlessly with traces.
* Easily set up metrics for your microservices.
* And the best part? See it all come to life in Signoz or your favorite Observability platform.

Ready to make your microservices sing? Let's dive in! 🚀

### About Observability

Ever wondered what "observability" really means? It's like having superpowers for understanding your microservices.

Imagine three essential tools in your toolkit: traces, logs, and metrics.

Traces help you follow the path of requests through your services.
Logs keep a detailed record of what's happening in your system, like a diary.
Metrics are like your microservices' vital signs, showing you how they're performing.
With observability, you're not just watching from the sidelines – you're in control, spotting issues, optimizing performance, and keeping everything running smoothly. It's like having a superhero cape for your microservices! 🦸‍♂️🚀

### Initial Setup

First things first, let's grab the starter code from our trusty old friend, Github. Don't sweat it, I'll walk you through everything.

```bash
git clone express-starter
cd express-starter
```
Here's a quick rundown of what you'll find in the code:

* src/orders-service.ts: This file houses a method called get which fetches all the orders associated with a specific user ID.
* src/users-service.ts: Inside this file, you'll find another method called get that retrieves user details such as name and email, based on the provided user ID.
* package.json: Take a peek here to see what dependencies we're using, like express and axios.
* tsconfig.json: This is our Typescript configuration file, ensuring everything runs smoothly.

Install `signoz` using the below command

```bash
git clone -b main https://github.com/SigNoz/signoz.git && cd signoz/deploy/

# Before starting, Rmove `hotrod` and `load_hotrod` services from docker compose file.

docker compose -f docker/clickhouse-setup/docker-compose.yaml up -d
```

### Adding Distributed Tracing

Before we embark on our tracing journey, let's make sure OpenTelemetry is all set up in our Node.js application. Here's what you need to do:

```bash
npm install @opentelemetry/sdk-trace-base \
@opentelemetry/api \
@opentelemetry/semantic-conventions \
@opentelemetry/resources
```

Now, let's understand the key components of a Trace Provider:

* Resources represent the entities or attributes associated with our application. These could include information such as service name, version, environment, etc. Resources help contextualize traces and provide additional metadata.

* Processors manipulate spans before they are exported. They can be used for tasks like sampling, filtering, or adding additional attributes to spans. In our case, we'll keep the processor simple, but it's worth noting its importance for more complex tracing scenarios.

* Exporters are responsible for transmitting trace data to a backend system for storage, analysis, and visualization. OpenTelemetry supports various exporters, including console, Zipkin, Jaeger, and others. For simplicity, we'll use the console exporter in this example.

**Initializing the Trace Provider**: We start by initializing the Trace Provider with the desired configuration, including the resource attributes, processor, and exporter.

```js
// src/observability/tracer.ts
const init = function (serviceName: string, metricPort: number) {

    const provider = new SimpleTracerProvider({
        resource: new Resource({
            [SEMRESATTRS_SERVICE_NAME]: serviceName,
        })
    });
    
    provider.addSpanProcessor(new BatchSpanProcessor(ConsoleTraceExporter()));
    provider.register();
    const tracer = provider.getTracer(serviceName);

    return { tracer }
}
```

**Creating Spans**: Within our application code, we manually create spans to represent units of work or operations. For example, when a user requests a service appointment, we create a span to encompass the entire booking process.

```js
//src/orders-service.ts

```

**Adding Attributes**: We enrich spans with relevant attributes such as service name, operation name, and any additional contextual information. These attributes provide valuable insights into the behavior of our application.

```js
//src/orders-service.ts

```

**Recording Events**: Throughout the lifecycle of a span, we record events to mark significant moments or actions. For instance, we might record events when a request enters a service, when it exits, or when an error occurs.

```js
//src/orders-service.ts

```

**Ending Spans**: Once the operation represented by a span is complete, we end the span, signaling its conclusion. At this point, the span is ready to be exported.

```js
//src/orders-service.ts

```

**Adding Same steps in Users Service**:

```js
//src/users-service.ts
```

**Context Propagation**:Trace context encompasses all the information necessary to identify and correlate spans within a trace. It typically includes the Trace ID, which uniquely identifies a trace, and the Span ID, which uniquely identifies a span within that trace.Propagation involves transmitting trace context between different services. When a service makes an outgoing request, it includes trace context in the request headers. Upon receiving the request, the receiving service extracts this context from the headers and uses it to create or continue the trace.

Installation: Ensure you have the necessary OpenTelemetry packages installed, including the W3C Trace Context Propagator package.

```bash
npm install @opentelemetry/core 
```

Configuration: Configure the W3C Trace Context Propagator in your application.

```js
const { W3CTraceContextPropagator } = require('@opentelemetry/core');
const { propagation } = require('@opentelemetry/api');
const propagator = new W3CTraceContextPropagator();
propagation.setGlobalPropagator(propagator);
```

Propagation: When making outgoing requests from your service, include trace context in the request headers using the W3C Trace Context format.

```js
const outgoingHeaders = {};
propagator.inject(context.active(), outgoingHeaders);
// Add outgoingHeaders to the HTTP request headers
```

Extraction: Upon receiving incoming requests, extract trace context from the request headers and use it to continue the trace.

```js
const incomingHeaders = req.headers; // Assuming `req` is the incoming HTTP request object
const context = propagator.extract(context.active(), incomingHeaders);
propagation.setGlobalContext(context);
```

**Exporting Traces**: Finally, we export the collected trace data to the configured backend using the exporter.

```js
//tracer.ts
```

### Implementing Logging with Winston and Signoz

Logging plays a vital role in observability, offering a window into our application's inner workings. While tracing helps us track the journey of requests, logging grabs key details like errors, warnings, info messages, and debugging insights.

With OpenTelemetry, we can tap into logging superpowers using instrumentation libraries like the Winston instrumentation. This nifty tool seamlessly integrates with the widely-used Winston logging library in Node.js apps.

Ready to shed light on your app's behavior? Let's get logging! 🌟

**Using Winston Instrumentation**

The winston instrumentation provided by OpenTelemetry integrates with the Winston logging library, allowing you to automatically capture trace context and enrich log messages with tracing information.

1. In register instrumentation add `import { WinstonInstrumentation } from '@opentelemetry/instrumentation-winston`. This will automatically add trace_id and span_id in log.

2. Create logging.ts and add below content

```js
//logger.ts
import { createLogger, format, transports } from "winston";

export const logger = createLogger({
  level: "info",
  exitOnError: false,
  format: format.json(),
  transports: [
    new transports.File({
      filename: "app.log",
      maxsize: 10000000,
    }),
  ],
});
```

3. In docker-compose of signoz add app.log volume in otel_collector service.

```yaml
app.log:/tmp/app.log
```

4. In `otel-collector.yaml` file add the following. [This](https://signoz.io/docs/userguide/collect_logs_from_file/#collecting-logs-in-self-hosted-signoz) contains the detailed steps

```yaml

#In receiver
filelog:
    include: [ /tmp/app.log ] #include the full path to your log file
    start_at: end

#In pipelines
logs:
      receivers: [otlp, filelog]
      processors: [batch]
      exporters: [clickhouselogsexporter]
```

5. Once this is done. Add logger in your code `logger.log("info", "Something is logged")`
6. In logger message, trace_id is part of message body. We need to parse the trace_id value.
    * First create a pipeline and add json parser which parses body to attribites json. [More](https://signoz.io/docs/logs-pipelines/guides/json/)
    * Second create tracepreprocessor that maps attributes.trace_id to trace_id. [More](https://signoz.io/docs/logs-pipelines/guides/trace/)

### Implementing Metrics using Opentelemetry and Signoz

Metrics are like the heartbeat of your application, giving you insights into its performance, health, and behavior over time. They offer hard numbers that help monitor different aspects of the system, spot trends, catch anomalies, and guide decision-making.

Thanks to OpenTelemetry, we have a versatile framework for instrumenting our applications to gather and export metrics data. Now, let's dive into the world of metrics and discover various types with practical examples. 📊🚀

**Types of Metrics**
1. Counter: Represents a monotonically increasing value, typically used for counting events. For example, the number of requests processed or errors encountered.

2. Gauge: Represents a value that can increase or decrease over time. Gauges are used to measure instantaneous values, such as CPU usage, memory usage, or the number of active connections.

3. Histogram: Represents the distribution of observed values over a period. Histograms are useful for capturing the distribution of request latencies or response sizes.

4. Summary: Similar to histograms, summaries also capture the distribution of values over a period but provide additional quantiles (percentiles) to describe the data distribution more precisely.


**Initializing the Metric Provider**: We start by initializing the Metric Provider with the desired configuration, including the resource attributes, readers, and exporter.

```ts
//tracer.ts

import { OTLPMetricExporter, } from '@opentelemetry/exporter-metrics-otlp-http';
import { MeterProvider, PeriodicExportingMetricReader, ConsoleMetricExporter } from '@opentelemetry/sdk-metrics';

 const metricE = new OTLPMetricExporter({
        url: 'http://localhost:4318/v1/metrics'
    })

    const metricReader = new PeriodicExportingMetricReader({
        exporter: metricE,
        exportIntervalMillis: 1000,
    });

    const myServiceMeterProvider = new MeterProvider({
        resource: new Resource({
            [SEMRESATTRS_SERVICE_NAME]: serviceName,
        }),
        readers: [metricReader],
      });
    export const meter = myServiceMeterProvider.getMeter(serviceName)
```

**Creating Metrics**

```ts

```

Explain code.

### View the source

A reminder that you can view the entire source code for this here.