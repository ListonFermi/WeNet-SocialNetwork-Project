import { Channel } from "amqplib";
import { MQActions } from "./config";
import { IUser } from "../models/userCollection";
import userServices from "../services/userServices";
import notificationServices from "../services/notificationServices";
import { IPost } from "../models/postsCollection";
import { INotification } from "../models/notificationCollection";
import postsService from "../services/postsService";

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
        case `${MQActions.addUser}`: {
          response = await createUser(data);
          break;
        }
        case `${MQActions.editUser}`: {
          response = await updateUser(data);
          break;
        }
        case `${MQActions.addPost}`: {
          response = await createPost(data);
          break;
        }
        case `${MQActions.addNotification}`: {
          response = await addNotification(data);
          break;
        }
        default:
          throw new Error(`Unknown operation: ${operation}`);
      }
      console.log(response);

      // Send response back to the replyTo queue
      // const responseBuffer = Buffer.from(JSON.stringify(response));
      // channel.sendToQueue(replyTo, responseBuffer, { correlationId });
    } catch (error: any) {
      console.error("Error handling message:", error);

      // Send error response back to the replyTo queue
      // const errorBuffer = Buffer.from(JSON.stringify({ error: error.message }));
      // channel.sendToQueue(replyTo, errorBuffer, { correlationId });
    }
  },
};

// Operations
async function createUser(data: IUser) {
  try {
    return await userServices.addUser(data);
  } catch (error: any) {
    throw new Error(error.message);
  }
}

async function updateUser(data: IUser) {
  try {
    return await userServices.updateUser(data);
  } catch (error: any) {
    throw new Error(error.message);
  }
}

async function createPost(data: IPost) {
  try {
    return await postsService.addPost(data)
  } catch (error: any) {
    throw new Error(error.message);
  }
}

async function addNotification(data: INotification) {
  try {
    await notificationServices.addNotification(data);
  } catch (error: any) {
    throw new Error(error.message);
  }
}
