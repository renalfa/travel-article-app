import { Article } from "../types/articles.type";

export const calculateComments = (data: Article[]) => {
  return data.map((article) => {
    return {
      label: article.title,
      count: article.comments.length,
    };
  });
};
