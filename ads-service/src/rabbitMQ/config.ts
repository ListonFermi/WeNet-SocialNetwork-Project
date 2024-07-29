export const MQExchangeName = "wenet_exchange";

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

export const adsServiceConsumers = [
  { queueName: "user-ads", routingKey: "wenet-user-ads-key" },
  { queueName: "post-ads", routingKey: "wenet-post-ads-key" },
];

export const adsServiceProducers = ["wenet-ads-post-key"]; //routing keys 