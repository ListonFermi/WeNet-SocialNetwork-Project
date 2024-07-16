export const MQActions = {
  addUser: "createUser",
  editUser: "updateUser",
  addNotification : "createNotification",
  addPost: "createPost",
  editPost: "updatePost",
  addComment: "createComment",
  editComment: "updateComment",
  addWeNetAd : 'createWeNetAd'
};

export const MQExchangeName = "wenet_exchange";

export const MQRoutingKey = [
  "wenet-user-service",
  "wenet-posts-ads-service",
  "wenet-ads-post-service"
];

export const MQQueueName = ["user-queue", "posts-ads-queue"];

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