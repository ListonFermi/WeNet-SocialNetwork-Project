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

export const userServiceConsumers = [];

export const userServiceProducers = ["wenet-user-post-key","wenet-user-message-key","wenet-user-notification-key", "wenet-user-ads-key"]; //routing keys 