import amqp from 'amqplib';
import consumeMessages from './consumer';

export default async () => {
  try {
    const connection = await amqp.connect('amqp://rabbitmq:5672');
    const channel = await connection.createChannel();

    const exchangeName = 'wenet_exchange';
    const queueName = 'user_signup_queue';  // Queue name to be bound
    const routingKey = 'user.signup';

    console.log('Declaring exchange and queue...');
    await channel.assertExchange(exchangeName, 'direct', { durable: true });
    await channel.assertQueue(queueName, { durable: true, exclusive : false});

    console.log('Binding queue to exchange...');
    await channel.bindQueue(queueName, exchangeName, routingKey);

    console.log('Starting to consume messages...');
    await consumeMessages(channel, queueName);

    console.log('Consumer is up and running.');
  } catch (error) {
    console.error('Error setting up consumer:', error);
  }
};