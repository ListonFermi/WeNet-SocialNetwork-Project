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
export const MQRoutingKey = "wenet-user-service";

// consumer queue name

export const MQQueueName = "user-queue";
