import { Middleware } from "@reduxjs/toolkit";
import { setSocket, disconnectSocket } from "./socketSlice";
import { io, Socket } from "socket.io-client";
import cookies from "js-cookie";
import { ChatEventEnum } from "./constants";

let socket: Socket | null = null;

export const socketMiddleware: Middleware =
  ({ dispatch }) =>
  (next) =>
  (action: any) => {
    if (action.type === setSocket.type) {
      // Handle setSocket action
      const token = cookies.get("token");
      if (!token) {
        console.log("Token is missing");
        return next(action); // Pass action along if token is missing
      }

      const PUBLIC_SOCKET_URI = process.env.NEXT_PUBLIC_SOCKET_URI;
      if (!PUBLIC_SOCKET_URI) {
        console.log("Socket URI missing in env");
        return next(action); // Pass action along if socket URI is missing
      }

      // Initialize socket with authentication
      socket = io(PUBLIC_SOCKET_URI, {
        withCredentials: true,
        auth: { token },
      });

      // Event listeners for socket lifecycle events
      socket.on("connect", () => {
        console.log("Connected to socket");
      });

      socket.on(ChatEventEnum.CONNECTED_EVENT, () => {
        console.log("Connected event received");
      });

      socket.on(ChatEventEnum.DISCONNECT_EVENT, () => {
        console.log("Disconnected from socket");
      });

      socket.on(ChatEventEnum.SOCKET_ERROR_EVENT, (error) => {
        console.error("Socket error:", error);
      });

      // Dispatch action with initialized socket
      return next(setSocket(socket));
    } else if (action.type === disconnectSocket.type) {
      // Handle disconnectSocket action
      if (socket) {
        socket.disconnect();
        socket = null;
      }
    }

    return next(action); // Continue middleware chain
  };
