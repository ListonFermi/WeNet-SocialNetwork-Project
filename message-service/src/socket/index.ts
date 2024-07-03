import cookie from "cookie";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
import { Server, Socket } from "socket.io";
import userCollection from "../models/userCollection";
import { ChatEventEnum } from "../constants";

function initializeSocketIO(io: any) {
  return io.on("connection", async function (socket: any) {
    try {
      const cookies = cookie.parse(socket.handshake.headers?.cookie || "");

      let token = cookies?.token;

      if (!token) token = socket.handshake.auth?.token;

      if (!token) throw new Error("Un-authorized handshake. Token is missing");

      const JWT_SECRET = process.env.JWT_SECRET;
      if (!JWT_SECRET) throw new Error("JWT Secret not found");
      const decodedToken: any = jwt.verify(token, JWT_SECRET); // decode the token

      console.log({decodedToken})
      const user = await userCollection.findById(decodedToken?.userData?._id);
      if (!user) throw new Error("User not found");

      socket.user = user;

      socket.emit(ChatEventEnum.CONNECTED_EVENT);
      console.log("User connected 🗼. userId: ", user._id.toString());

      socket.on(ChatEventEnum.DISCONNECT_EVENT, () => {
        console.log("user has disconnected 🚫. userId: " + socket.user?._id);
        if (socket.user?._id) {
          socket.leave(socket.user._id);
        }
      });

      socket.join(user._id.toString());
    } catch (error: any) {
      socket.emit(
        ChatEventEnum.SOCKET_ERROR_EVENT,
        error?.message || "Something went wrong while connecting to the socket."
      );
    }
  });
}

const emitSocketEvent = (
  req: any,
  roomId: string,
  event: string,
  payload: any
): void => {
  const io: Server = req.app.get("io");
  io.in(roomId).emit(event, payload);
};
export { initializeSocketIO, emitSocketEvent };
