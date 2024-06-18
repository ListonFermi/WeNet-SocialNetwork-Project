import { Channel } from "amqplib";

interface IMessageHandler {
  handle: (
    operation: string,
    data: any,
    correlationId: string,
    replyTo: string,
    channel: Channel
  ) => Promise<void>;
}

export const MessageHandler: IMessageHandler = {
  handle: async function (operation, data, correlationId, replyTo, channel) {
    try {
      let response;

      switch (operation) {
        case "createUser":
          // Example operation to create a user
          response = await createUser(data);
          break;
        case "updateUser":
          // Example operation to update a user
          response = await updateUser(data);
          break;
        case "deleteUser":
          // Example operation to delete a user
          response = await deleteUser(data);
          break;
        default:
          throw new Error(`Unknown operation: ${operation}`);
      }

      // Send response back to the replyTo queue
      const responseBuffer = Buffer.from(JSON.stringify(response));
      channel.sendToQueue(replyTo, responseBuffer, { correlationId });
    } catch (error: any) {
      console.error("Error handling message:", error);

      // Send error response back to the replyTo queue
      const errorBuffer = Buffer.from(JSON.stringify({ error: error.message }));
      channel.sendToQueue(replyTo, errorBuffer, { correlationId });
    }
  },
};

// Example operations
async function createUser(data: any) {
  // Perform the user creation logic
  console.log('reached here', data)
  return { success: true, message: "User created", data };
}

async function updateUser(data: any) {
  // Perform the user update logic
  return { success: true, message: "User updated", data };
}

async function deleteUser(data: any) {
  // Perform the user deletion logic
  return { success: true, message: "User deleted", data };
}
