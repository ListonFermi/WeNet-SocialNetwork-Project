export const MQExchangeName = "wenet_exchange";

export const MQActions = {
  addUser: "createUser",
  editUser: "updateUser",
  addNotification: "createNotification",
  addPost: "createPost",
  editPost: "updatePost",
  addComment: "createComment",
  editComment: "updateComment",
};

export const notificationServiceConsumers = [
  { queueName: "user-notification", routingKey: "wenet-user-notification-key" },
  { queueName: "post-notification", routingKey: "wenet-post-notification-key" },
];

export const notificationServiceProducers = ['wenet-notification-message-key']; //routing keys 