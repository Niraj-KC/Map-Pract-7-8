// consumer.js
const { Kafka } = require('kafkajs');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');  // if you're using ES modules
dotenv.config();

const EMAIL = process.env.EMAIL
const APP_PASS = process.env.APP_PASS

const kafka = new Kafka({
  clientId: 'email-producer',
  brokers: ['kafka-1:19092', 'kafka-2:19093', 'kafka-3:19094'], // ✅ use internal listeners
});

const consumer = kafka.consumer({ groupId: 'email-workers' });

// setup mail transport
const transporter = nodemailer.createTransport({
  service: 'gmail', // or SMTP details
  auth: {
    user: EMAIL,
    pass: APP_PASS,
  },
});

async function start() {
  await consumer.connect();
  await consumer.subscribe({ topic: 'email-jobs', fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ message }) => {
      const { to, subject, text } = JSON.parse(message.value.toString());

      try {
        await transporter.sendMail({
          from: EMAIL,
          to,
          subject,
          text,
        });
        console.log(`✅ Email sent to ${to}`);
      } catch (err) {
        console.error(`❌ Failed to send email to ${to}`, err);
      }
    },
  });
}

start().catch(console.error);
