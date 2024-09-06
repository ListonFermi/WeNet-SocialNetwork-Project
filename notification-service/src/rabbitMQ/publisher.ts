import amqp, { Channel, Connection } from "amqplib";
import {  MQExchangeName, notificationServiceProducers } from "./config";
import { RABBITMQ_URL } from "../constants";
import { INotification } from "../models/notificationCollection";

export const publisher = {
  connectRabbitMQ: async function (): Promise<[Channel, Connection]> {
    try {
      // Establish connection to RabbitMQ
      const connection: Connection = await amqp.connect(RABBITMQ_URL);
      const channel: Channel = await connection.createChannel();
      return [channel, connection];
    } catch (error: any) {
      throw new Error(error.message);
    }
  },

  disconnectRabbitMQ: async function (
    channel: Channel,
    connection: Connection
  ) {
    try {
      // Close connection
      await channel.close();
      await connection.close();
    } catch (error: any) {
      throw new Error(error.message);
    }
  },

  publishNotificationToMessageService: async function (
    notificationData : INotification,
    action: string
  ) {
    try {
      const [channel, connection] = await this.connectRabbitMQ();

      const exchangeName = MQExchangeName;
      const routingKey = notificationServiceProducers[0] ; // Specific routing key
      await channel.assertExchange(exchangeName, "direct", { durable: true });

      const messageProperties = {
        headers: {
          function: action,
        },
      };

      const message = JSON.stringify(notificationData);
      channel.publish(
        exchangeName,
        routingKey,
        Buffer.from(message),
        messageProperties
      );

      console.log("Message published to RabbitMQ:", notificationData);

      await this.disconnectRabbitMQ(channel, connection);
    } catch (error: any) {
      console.error("Error publishing message to RabbitMQ:", error);
      throw new Error(error.message);
    }
  },
};
