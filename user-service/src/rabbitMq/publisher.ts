import amqp, { Channel, Connection } from "amqplib";
import { ObjectId, Types } from "mongoose";
import { MQExchangeName, MQRoutingKey } from "./config";

export type MQUserData = {
  _id: string | ObjectId;
  username: string;
  firstName: string;
  lastName: string;
  profilePicUrl: string;
};

export type MQUserDataToAds = {
  _id: string | ObjectId;
  username: string;
  firstName: string;
  lastName: string;
  profilePicUrl: string;
  email: string;
};

export interface MQINotification {
  userId: string | Types.ObjectId;
  doneByUser: string | Types.ObjectId;
  type: "follow" | "like" | "comment";
  notificationMessage: string;
  entityType: "posts" | "users";
  entityId: string | Types.ObjectId;
}

export const publisher = {
  connectRabbitMQ: async function (): Promise<[Channel, Connection]> {
    try {
      // Establish connection to RabbitMQ
      const connection: Connection = await amqp.connect("amqp://rabbitmq:5672");
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

  publishUserMessage: async function (userData: MQUserData, action: string) {
    try {
      const [channel, connection] = await this.connectRabbitMQ();

      const exchangeName = MQExchangeName;
      const routingKey = MQRoutingKey[0]; // Specific routing key
      await channel.assertExchange(exchangeName, "direct", { durable: true });

      const messageProperties = {
        headers: {
          function: action,
        },
      };

      const message = JSON.stringify(userData);
      channel.publish(
        exchangeName,
        routingKey,
        Buffer.from(message),
        messageProperties
      );

      console.log("Message published to RabbitMQ:", userData);

      await this.disconnectRabbitMQ(channel, connection);
    } catch (error: any) {
      console.error("Error publishing message to RabbitMQ:", error);
      throw new Error(error.message);
    }
  },

  publishUserMessageToAds: async function (userData: MQUserDataToAds, action: string) {
    try {
      const [channel, connection] = await this.connectRabbitMQ();

      const exchangeName = MQExchangeName;
      const routingKey = MQRoutingKey[3]; // Specific routing key
      await channel.assertExchange(exchangeName, "direct", { durable: true });

      const messageProperties = {
        headers: {
          function: action,
        },
      };

      const message = JSON.stringify(userData);
      channel.publish(
        exchangeName,
        routingKey,
        Buffer.from(message),
        messageProperties
      );

      console.log("Message published to RabbitMQ:", userData);

      await this.disconnectRabbitMQ(channel, connection);
    } catch (error: any) {
      console.error("Error publishing message to RabbitMQ:", error);
      throw new Error(error.message);
    }
  },

  publishNotificationMessage: async function (
    notificationData: MQINotification,
    action: string
  ) {
    try {
      const [channel, connection] = await this.connectRabbitMQ();

      const exchangeName = MQExchangeName;
      const routingKey = MQRoutingKey[1]; // Specific routing key
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
