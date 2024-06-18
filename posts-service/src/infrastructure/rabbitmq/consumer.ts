import { Channel, ConsumeMessage } from "amqplib";
import { MessageHandler } from "./messageHandler";

const consumeMessages = async (channel: Channel, queue: string) => {
  console.log("Ready to consume messages...");

  const onMessage = async (message: ConsumeMessage | null) => {
    if (message !== null) {
      try {
        const { correlationId, replyTo } = message.properties;
        const operation = message.properties.headers?.function;

        if (!correlationId || !replyTo || !operation) {
          console.error("Message is missing required properties.");
          channel.nack(message, false, false);
          return;
        }

        const data = JSON.parse(message.content.toString());

        await MessageHandler.handle(operation, data, correlationId, replyTo, channel);

        channel.ack(message);
      } catch (error) {
        console.error("Error processing message:", error);
        channel.nack(message, false, false);
      }
    }
  };

  channel.consume(queue, onMessage, { noAck: false });
};

export default consumeMessages;
