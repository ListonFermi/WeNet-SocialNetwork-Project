import amqp from "amqplib";
import consumeMessages from "./consumer";
import { MQExchangeName, MQQueueName, MQRoutingKey } from "./config";

export default async () => {
  try {
    const connection = await amqp.connect("amqp://rabbitmq:5672");
    const channel = await connection.createChannel();

    const exchangeName = MQExchangeName;
    const queueName = MQQueueName; 
    const routingKey = MQRoutingKey;

    console.log("Declaring exchange and queue...");
    await channel.assertExchange(exchangeName, "direct", { durable: true });
    queueName.forEach(
      async (queueName) =>
        await channel.assertQueue(queueName, {
          durable: true,
          exclusive: false,
        })
    );

    console.log("Binding queue to exchange...");
    queueName.forEach(
      async (queueName, i) =>
        await channel.bindQueue(queueName, exchangeName, routingKey[i])
    );

    // Set prefetch count
    const prefetchCount = 1; 
    await channel.prefetch(prefetchCount);

    console.log("Starting to consume messages...");
    queueName.forEach(
      async (queueName) => await consumeMessages(channel, queueName)
    );

    console.log("Consumer is up and running.");
  } catch (error) {
    console.error("Error setting up consumer:", error);
  }
};
