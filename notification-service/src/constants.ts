export const ChatEventEnum = Object.freeze({
  CONNECTED_EVENT: "connected",

  DISCONNECT_EVENT: "disconnect",

  MESSAGE_RECEIVED_EVENT: "messageReceived",
  // ? when there is new one on one chat, new group chat or user gets added in the group
  NEW_CHAT_EVENT: "newChat",
  // ? when there is an error in socket
  SOCKET_ERROR_EVENT: "socketError",
  // ? when participant stops typing
  STOP_TYPING_EVENT: "stopTyping",
  // ? when participant starts typing
  TYPING_EVENT: "typing",
});

// PROD:
// export const RABBITMQ_URL  = "amqp://rabbitmq-service.default.svc.cluster.local:5672"

// DEV:
export const RABBITMQ_URL  = "amqp://rabbitmq:5672"