export interface Category {
  id: number;
  documentId: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale?: string | null;
  description?: string | null;
}
