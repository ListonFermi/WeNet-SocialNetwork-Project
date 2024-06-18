import amqp from 'amqplib';
import consumeMessages from './consumer';

export default async () => {
  try {
    const connection = await amqp.connect('amqp://rabbitmq:5672');
    const channel = await connection.createChannel();

    const exchangeName = 'user_signup_exchange';
    const queueName = 'wenet_queue'; // Replace with your actual queue name

    await channel.assertExchange(exchangeName, 'fanout', { durable: false });
    await channel.assertQueue(queueName, { durable: true });

    // Bind the queue to the exchange
    await channel.bindQueue(queueName, exchangeName, '');

    // Start consuming messages from the queue
    await consumeMessages(channel, queueName);

    console.log('Consumer is up and running.');
  } catch (error) {
    console.error('Error setting up consumer:', error);
  }
}
