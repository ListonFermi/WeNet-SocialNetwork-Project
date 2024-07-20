import { Types } from "mongoose";
import { IUser } from "../models/User";
import profileRepository from "../repositories/profileRepository";
import { SERVICES } from "../rabbitMq/config";

export = {
  getUserData: async (_id: string | Types.ObjectId): Promise<IUser> => {
    try {
      return await profileRepository.getUserData(_id);
    } catch (error: any) {
      throw new Error(error.message);
    }
  },
  editUserData: async (
    _id: string | Types.ObjectId,
    userData: IUser
  ): Promise<IUser> => {
    try {
      return profileRepository.editUserData(_id, userData);
    } catch (error: any) {
      throw new Error(error.message);
    }
  },
  generateJWT: async (userData: IUser): Promise<string> => {
    try {
      return await profileRepository.generateJWT(userData);
    } catch (error: any) {
      throw new Error(error.message);
    }
  },
  uploadImage: async (
    imageFile: unknown,
    imageType: string
  ): Promise<string> => {
    try {
      return await profileRepository.uploadImage(imageFile, imageType);
    } catch (error: any) {
      throw new Error(error.message);
    }
  },
  getProfileData: async (username: string): Promise<IUser> => {
    try {
      return profileRepository.getProfileData(username);
    } catch (error: any) {
      throw new Error(error.message);
    }
  },
  toggleFollow: async (
    currentUserId: string,
    userToFollow: string
  ): Promise<boolean> => {
    try {
      const isFollowing = await profileRepository.toggleFollow(
        currentUserId,
        userToFollow
      );

      if (isFollowing) {
        try {
          SERVICES.notification.forEach(async () => {
            await profileRepository.sendNotificationToMQ(
              userToFollow,
              currentUserId,
              "follow",
              "Started following you",
              "users",
              currentUserId
            );
          });
        } catch (error: any) {
          console.log(error.message);
        }
      }

      return isFollowing;
    } catch (error: any) {
      throw new Error(error.message);
    }
  },
  isFollowing: async (
    currentUserId: string,
    userToFollow: string
  ): Promise<boolean> => {
    try {
      return await profileRepository.isFollowing(currentUserId, userToFollow);
    } catch (error: any) {
      throw new Error(error.message);
    }
  },
  searchUsers: async (keyword: string): Promise<IUser[]> => {
    try {
      return await profileRepository.searchUsers(keyword);
    } catch (error: any) {
      throw new Error(error.message);
    }
  },
  toggleBlock: async (currUser: string, userId: string): Promise<boolean> => {
    try {
      const isBlocked = await profileRepository.toggleBlock(currUser, userId);

      if (isBlocked) {
        const isFollowing = await profileRepository.isFollowing(
          currUser,
          userId
        );
        if (isFollowing) await profileRepository.toggleFollow(currUser, userId);
      }

      return isBlocked;
    } catch (error: any) {
      throw new Error(error.message);
    }
  },
  isBlocked: async (
    currentUserId: string,
    otherUser: string
  ): Promise<boolean> => {
    try {
      return await profileRepository.isBlocked(currentUserId, otherUser);
    } catch (error: any) {
      throw new Error(error.message);
    }
  },
  getBlockedUsers: async (
    pageNo: number,
    rowsPerPage: number,
    userId: string
  ) => {
    try {
      const skip = rowsPerPage * (pageNo - 1);
      const limit = rowsPerPage;

      let blockedUsers = await profileRepository.getBlockedUsers(userId);
      if (!blockedUsers) throw Error("Blocked users not found");

      const documentCount = blockedUsers.length;
      blockedUsers = blockedUsers.slice(skip, skip + limit);

      const responseFormat = blockedUsers.map((user: any, i) => {
        const { _id, username, profilePicUrl } = user;

        const sNo = skip + (i + 1);

        return { sNo, _id, username, profilePicUrl };
      });

      return [responseFormat, documentCount];
    } catch (error: any) {
      throw new Error(error.message);
    }
  },
  getFollowingUsers: async (currentUserId: string): Promise<any> => {
    try {
      const following = await profileRepository.getFollowingUsers(
        currentUserId
      );
      if(following?.length==0) return []

      const responseFormat = following?.map((user) => {
        return user._id.toString();
      });

      return responseFormat;
    } catch (error: any) {
      throw new Error(error.message);
    }
  },
};
