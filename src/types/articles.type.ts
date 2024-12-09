import { Category } from "./category.type";
import { Comment } from "./comment.type";
import { User } from "./user.type";

export interface Article {
  id: number;
  documentId: string;
  title: string;
  description: string;
  cover_image_url: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  user: User;
  locale?: string | null;
  category?: Category | null;
  comments: Comment[];
  localizations?: any;
}

export interface MetaProps {
  pagination: {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
  };
}
