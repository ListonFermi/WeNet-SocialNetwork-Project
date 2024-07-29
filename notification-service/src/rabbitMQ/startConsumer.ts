import amqp from "amqplib";
import consumeMessages from "./consumer";
import { MQExchangeName, notificationServiceConsumers } from "./config";
import { RABBITMQ_URL } from "../constants"; 

export default async () => {
  try {
    const connection = await amqp.connect(RABBITMQ_URL);
    const channel = await connection.createChannel();

    const exchangeName = MQExchangeName;
    const consumers = notificationServiceConsumers;

    await channel.assertExchange(exchangeName, "direct", { durable: true });
    consumers.forEach(
      async ({ queueName }) =>
        await channel.assertQueue(queueName, {
          durable: true,
          exclusive: false,
        })
    );

    consumers.forEach(
      async ({ queueName, routingKey }) =>
        await channel.bindQueue(queueName, exchangeName, routingKey)
    );

    // Set prefetch count
    const prefetchCount = 1;
    await channel.prefetch(prefetchCount);

    consumers.forEach(async ({ queueName }) => {
      await consumeMessages(channel, queueName);
      console.log(`Started consuming messages in ${queueName} queue` )
    });
  } catch (error) {
    console.error("Error setting up consumer:", error);
  }
};
