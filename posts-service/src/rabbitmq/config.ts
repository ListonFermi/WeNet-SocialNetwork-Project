export const MQExchangeName = "wenet_exchange";

export const MQActions = {
  addUser: "createUser",
  editUser: "updateUser",
  addNotification: "createNotification",
  addPost: "createPost",
  editPost: "updatePost",
  addComment: "createComment",
  editComment: "updateComment",
  addWeNetAd: "createWeNetAd",
};

export const postServiceConsumers = [
  { queueName: "user-post", routingKey: "wenet-user-post-key" },
  { queueName: "ads-post", routingKey: "wenet-ads-post-key" },
];

export const postServiceProducers = ["wenet-post-ads-key","wenet-post-notification-key"]; //routing keys 
