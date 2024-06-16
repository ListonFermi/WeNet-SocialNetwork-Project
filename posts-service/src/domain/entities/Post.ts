export interface WeNetAds {
  isPromoted: boolean;
  expiresOn: Date;
}

export interface Post {
  id: string;
  userId: string;
  caption: string;
  imageUrl: string;
  likedBy? : string[];
  comments?: string[];
  isDeleted: boolean;
  weNetAds: WeNetAds;
  reportsId: string[];
  createdAt: Date;
  updatedAt: Date;
}
