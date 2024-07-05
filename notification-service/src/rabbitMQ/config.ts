export const MQActions = {
  addUser: "createUser",
  editUser: "updateUser",
  addNotification : "createNotification",
  addPost: "createPost",
  editPost: "updatePost",
  addComment: "createComment",
  editComment: "updateComment"
};

export const MQExchangeName = "wenet_exchange";

export const MQRoutingKey = [
  "wenet-user-service",
  "wenet-notification-service",
  "wenet-posts-service"
];

export const MQQueueName = ["user-queue", "notification-queue","posts-queue"];

export const SERVICES = {
  notification: ["notification-service"],

  allServices: [
    "user-service",
    "posts-service",
    "message-service",
    "notification-service",
  ],

  allOtherServices: [
    "posts-service",
    "message-service",
    "notification-service",
  ],
};