import postsCollection, { IPost } from "../models/postsCollection";

export = {
  addPost: async function (postData: IPost) {
    try {
      return await postsCollection.create(postData);
    } catch (error: any) {
      throw new Error(error.message);
    }
  },
};

// _id: '6687b0bb0ee90e896f9c04c4',
//     userId: '66878c2e5e44a3926be07ef9',
//     imageUrl: 'https://wenet-listonfermi.s3.ap-south-1.amazonaws.com/posts/1720168634882_croppedImage.png',
//     isDeleted: true