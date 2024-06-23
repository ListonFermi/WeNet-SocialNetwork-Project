import amqp, { Channel, Connection } from "amqplib";
import { ObjectId } from "mongoose";
import { v4 as uuidv4 } from "uuid";

export type MQUserData = {
  _id: string | ObjectId;
  username: string;
  firstName: string;
  lastName: string;
  profilePicUrl: string;
};

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

  publishSignupMessage: async function (userData: MQUserData) {
    try {
      const [channel, connection] = await this.connectRabbitMQ();

      const exchangeName = "wenet_exchange";
      const routingKey = "user.signup"; // Specific routing key
      await channel.assertExchange(exchangeName, "direct", { durable: true });

      const messageProperties = {
        headers: {
          function: "createUser",
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
    //   try {
    //     // Establish connection to RabbitMQ
    //     const connection = await amqp.connect('amqp://rabbitmq:5672');

    //     const channel = await connection.createChannel();

    //     // Declare exchange
    //     const exchangeName = 'user_signup_exchange';
    //     await channel.assertExchange(exchangeName, 'direct', { durable: false });

    //     // Publish message
    //     const message = JSON.stringify(userData);
    //     await channel.publish(exchangeName, '', Buffer.from(message));

    //     console.log('Message published to RabbitMQ: ', userData);

    //     // Close connection
    //     await channel.close();
    //     await connection.close();
    // } catch (error) {
    //     console.error('Error publishing message to RabbitMQ:', error);
    // }
  },
};
