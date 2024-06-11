interface IProfessionalAccount {
  isProfessional: boolean;
  category: string;
  hasWeNetTick: boolean;
}

export interface IUser {
  _id?: string;
  username: string;
  firstName: string;
  lastName: string;
  password: string;
  email: string;
  dateOfBirth?: Date;
  gender?: "male" | "female";
  isRestricted?: boolean;
  bio?: string;
  profilePicUrl?: string;
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
  iat? : Number;
  exp? : Number;
  location? : string
}
