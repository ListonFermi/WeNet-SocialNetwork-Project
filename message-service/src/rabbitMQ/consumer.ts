import { Channel, ConsumeMessage } from "amqplib";
import { MessageHandler } from "./messageHandler";

const consumeMessages = async (channel: Channel, queue: string) => {
  console.log("Ready to consume messages...");

  const onMessage = async (message: ConsumeMessage | null) => {
    if (message !== null) {
      console.log("Message received:", message.content.toString());
      try {
        const { correlationId, replyTo } = message.properties;
        const operation = message.properties.headers?.function;
        console.log(message.properties);

        if (!operation) {
          console.error("Message is missing required properties.");
          channel.nack(message, false, false);
          return;
        }

        const data = JSON.parse(message.content.toString());

        console.log(`Handling message with operation: ${operation}`);

        try {
          await MessageHandler.handle(
            operation,
            data,
            correlationId,
            replyTo,
            channel
          );
        } catch (error: any) {
          throw new Error(error.message)
        }

        channel.ack(message);
        console.log("Message acknowledged.");
      } catch (error) {
        console.error("Error processing message:", error);
        channel.nack(message, false, false);
      }
    }
  };

  channel.consume(queue, onMessage, { noAck: false });
};

export default consumeMessages;