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

export interface User {
  id: number;
  name: string;
  email: string;
  bio: string | null;
  avatar: string | null;
  createdAt: Date;
  updatedAt: Date;
}
