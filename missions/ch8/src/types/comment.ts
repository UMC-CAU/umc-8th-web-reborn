import { User } from "./user";

export interface Comment {
  id: number;
  content: string;
  authorId: number;
  lpId: number;
  createdAt: Date;
  updatedAt: Date;
  author?: User;
}

export interface ResponseCommentListDto {
  data: Comment[];
  nextCursor: number | null;
  hasNext: boolean;
}
