import amqp from 'amqplib';
import consumeMessages from './consumer';
import { MQExchangeName, MQQueueName, MQRoutingKey } from './config';
import { RABBITMQ_URL } from '../utils/constants';

export default async () => {
  try {
    console.log({RABBITMQ_URL})
    const connection = await amqp.connect(RABBITMQ_URL);
    const channel = await connection.createChannel();

    const exchangeName = MQExchangeName;
    const queueName = MQQueueName;  // Queue name to be bound
    const routingKey = MQRoutingKey;

    console.log('Declaring exchange and queue...');
    await channel.assertExchange(exchangeName, 'direct', { durable: true });
    await channel.assertQueue(queueName[0], { durable: true, exclusive : false});
    await channel.assertQueue(queueName[3], { durable: true, exclusive : false});

    console.log('Binding queue to exchange...');
    await channel.bindQueue(queueName[0], exchangeName, routingKey[0]);
    await channel.bindQueue(queueName[3], exchangeName, routingKey[3]);

    // Set prefetch count
    const prefetchCount = 1; 
    await channel.prefetch(prefetchCount);

    console.log('Starting to consume messages...');
    await consumeMessages(channel, queueName[0]);
    await consumeMessages(channel, queueName[3]);

    console.log('Consumer is up and running.');
  } catch (error) {
    console.error('Error setting up consumer:', error);
  }
};