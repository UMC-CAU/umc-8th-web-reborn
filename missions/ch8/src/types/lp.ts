import { CommonResponse, CursorBasedResponse } from "./common";

export type Tag = {
  id: number;
  name: string;
};

export type Likes = {
  id: number;
  userId: number;
  lpId: number;
};

export type Lp = {
  id: number;
  title: string;
  content: string;
  thumbnail: string;
  published: boolean;
  authorId: number;
  createdAt: Date;
  updatedAt: Date;
  tags: Tag[];
  likes: Likes[];
};

export type ResponseLpListDto = CursorBasedResponse<Lp[]>;

export type RequestLpDetailDto = {
  lpId: number;
};

export type ResponseLpDetailDto = CommonResponse<Lp>;

export type ResponsetLikeLpDto = CommonResponse<{
  id: number;
  userId: number;
  lpId: number;
}>;

export type CreateLpDto = {
  title: string;
  artist: string;
  tags?: string[];
  thumbnail?: File | null;
};
