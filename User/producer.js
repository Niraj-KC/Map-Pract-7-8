// producer.js
import {Kafka} from 'kafkajs';

const kafka = new Kafka({
  clientId: 'email-producer',
  brokers: ['kafka-1:19092', 'kafka-2:19093', 'kafka-3:19094'], // ✅ use internal listeners
});

const producer = kafka.producer();

export async function sendEmailJob(to, subject, text) {
  await producer.connect();
  await producer.send({
    topic: 'email-jobs',
    messages: [
      {
        value: JSON.stringify({ to, subject, text }),
      },
    ],
  });
  console.log(`📤 Email job queued for ${to}`);
  await producer.disconnect();
}

// Example usage
// sendEmailJob('niraj.kc.128@gmail.com', 'Hello from Kafka!', 'This is a test email.');
