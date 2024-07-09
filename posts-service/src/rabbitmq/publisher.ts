import amqp, { Channel, Connection } from "amqplib";
import { Types } from "mongoose";
import { MQExchangeName, MQPostsAds, MQRoutingKey } from "./config";
import { IWeNetAds } from "../models/postsCollection";

export interface MQINotification {
  userId: string | Types.ObjectId;
  doneByUser: string | Types.ObjectId;
  type: "follow" | "like" | "comment";
  notificationMessage: string;
  entityType: "posts" | "users";
  entityId: string | Types.ObjectId;
}

export interface MQIPost {
  _id : string | Types.ObjectId;
  userId:  string | Types.ObjectId;
  caption: string;
  imageUrl : string;
  isDeleted: boolean
}

export interface MQIPostForAds {
  _id : string | Types.ObjectId;
  userId:  string | Types.ObjectId;
  caption: string;
  imageUrl : string;
  isDeleted: boolean;
  WeNetAds: IWeNetAds
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

  publishPostMessage: async function (postData: MQIPost, action: string) {
    try {
      const [channel, connection] = await this.connectRabbitMQ();

      const exchangeName = MQExchangeName;
      const routingKey = MQRoutingKey[2]; // Specific routing key
      await channel.assertExchange(exchangeName, "direct", { durable: true });

      const messageProperties = {
        headers: {
          function: action,
        },
      };

      const message = JSON.stringify(postData);
      channel.publish(
        exchangeName,
        routingKey,
        Buffer.from(message),
        messageProperties
      );

      console.log("Message published to RabbitMQ:", postData);

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

  publishPostForAdsMessage: async function (postData: MQIPostForAds, action: string) {
    try {
      const [channel, connection] = await this.connectRabbitMQ();

      const exchangeName = MQExchangeName;
      const routingKey = MQPostsAds.routingKey; // Specific routing key
      await channel.assertExchange(exchangeName, "direct", { durable: true });

      const messageProperties = {
        headers: {
          function: action,
        },
      };

      const message = JSON.stringify(postData);
      channel.publish(
        exchangeName,
        routingKey,
        Buffer.from(message),
        messageProperties
      );

      console.log("Message published to RabbitMQ:", postData);

      await this.disconnectRabbitMQ(channel, connection);
    } catch (error: any) {
      console.error("Error publishing message to RabbitMQ:", error);
      throw new Error(error.message);
    }
  },
};
