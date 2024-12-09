import { User } from "./user.type";

export interface Comment {
  id: number;
  documentId: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  publisedAt: string;
  locale?: string | null;
  user?: User | null;
}
