interface IProfessionalAccount {
  isProfessional: boolean;
  category: string;
  hasWeNetTick: boolean;
}

export interface IUser {
  _id: string;
  username: string;
  firstName: string;
  lastName: string;
  password: string;
  email: string;
  dateOfBirth?: Date;
  gender?: "male" | "female";
  isRestricted?: boolean;
  bio?: string;
  profilePicUrl: string;
  coverPicUrl?: string;
  followers?: string[];
  following?: string[];
  postsCount?: number;
  likesReceivedCount?: number;
  isPrivate?: boolean;
  professionalAccount?: IProfessionalAccount;
  blockedByUsers?: string[];
  blockedUsers?: string[];
  createdAt?: Date;
  updatedAt?: Date;
  JWT?: string;
  iat?: Number;
  exp?: Number;
  location?: string;
}

export interface IPost {
  _id: string;
  userId: string;
  username: string;
  firstName: string;
  lastName: string;
  profilePicUrl: string;
  caption: string;
  imageUrl: string;
  time: Date;
  likedBy: string[];
  comments: string[];
  updatedAt: string;
  isLiked: boolean;
  isBookmarked: boolean;
}

export interface IComment {
  _id: string;
  userId: string;
  username: string;
  profilePicUrl: string;
  comment: string;
  likedBy?: string[];
  updatedAt: string;
  isLiked?: boolean;
}
