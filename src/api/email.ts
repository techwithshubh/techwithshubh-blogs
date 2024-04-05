'use server'

import { redirect } from "next/navigation";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(receiver: string) {
  try {
    const name = process.env.SENDER_NAME;
    const email = process.env.SENDER_EMAIL;

    //Save the entry in mongodb aswell

    const data = await resend.emails.send({
      from: `${name} <${email}>`,
      to: [receiver],
      subject: "Thank You for Subscribing to Our Weekly Newsletter!",
      html: `
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Thank You for Subscribing!</title>
          <style>
              body {
                  font-family: Arial, sans-serif;
                  background-color: #f4f4f4;
                  margin: 0;
                  padding: 0;
              }
              .container {
                  width: 80%;
                  margin: auto;
                  padding: 20px;
                  background-color: #fff;
                  border-radius: 5px;
                  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
              }
              h1 {
                  color: #333;
              }
              p {
                  color: #666;
              }
              .cta-button {
                  display: inline-block;
                  padding: 10px 20px;
                  background-color: #007bff;
                  color: #fff;
                  text-decoration: none;
                  border-radius: 5px;
              }
              .cta-button:hover {
                  background-color: #0056b3;
              }
          </style>
      </head>
      <body>
          <div class="container">
              <h1>Thank You for Subscribing!</h1>
              <p>Dear Subscriber,</p>
              <p>We are thrilled to have you on board for our weekly newsletter. Get ready to dive into the latest updates and insights covering web development, architecture best practices, and the exciting world of generative AI.</p>
              <p>Each week, we'll be curating valuable content to keep you informed and inspired. Whether you're a seasoned developer or just starting out, there's something for everyone in our newsletter.</p>
              <p>Stay tuned for:</p>
              <ul>
                  <li>Insights into cutting-edge web development techniques</li>
                  <li>Best practices for designing scalable and efficient architectures</li>
                  <li>Fascinating explorations into generative AI and its applications</li>
              </ul>
              <p>Get ready to level up your skills and stay ahead of the curve!</p>
              <p>Should you have any questions, feedback, or suggestions, feel free to reach out to us. We'd love to hear from you!</p>
              <p>Happy reading!</p>
              <p><strong>Techwithshubh Team</strong></p>
          </div>
      </body>
      </html>
      `,
    });
  } catch (error) {
    console.log(error)
  }
}
