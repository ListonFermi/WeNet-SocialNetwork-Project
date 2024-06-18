import amqp from "amqplib";

type MQUserData = {
  _id: string;
  username: string;
  firstName: string;
  profilePicUrl: string;
};

export async function publishSignupMessage(userData: MQUserData) {
  try {
    // Establish connection to RabbitMQ
    const connection = await amqp.connect("amqp://rabbitmq:5672");
    const channel = await connection.createChannel();

    // Declare fanout exchange
    const exchangeName = "user_signup_exchange";
    await channel.assertExchange(exchangeName, "fanout", { durable: false });

    // Publish message to the fanout exchange
    const message = JSON.stringify(userData);
    channel.publish(exchangeName, "", Buffer.from(message));

    console.log("Message published to RabbitMQ: ", userData);

    // Close connection
    await channel.close();
    await connection.close();
  } catch (error) {
    console.error("Error publishing message to RabbitMQ:", error);
  }
}
