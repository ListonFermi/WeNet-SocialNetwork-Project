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

export const messageServiceConsumers = [
  { queueName: "user-message", routingKey: "wenet-user-message-key" },
  {
    queueName: "notification-message",
    routingKey: "wenet-notification-message-key",
  },
];

export const messageServiceProducers = []; //routing keys
