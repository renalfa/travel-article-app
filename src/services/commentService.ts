import { axiosInstance } from "./instance";

export const postComment = async (data: {
  data: {
    content: string;
    article: number;
  };
}) => {
  try {
    const response = await axiosInstance.post("api/comments", data);
    return response.data;
  } catch (error) {
    throw new Error("Failed to post comment");
  }
};

export const deleteComment = async (commentId: string) => {
  try {
    const response = await axiosInstance.delete(`api/comments/${commentId}`);

    return response.data;
  } catch (error) {
    throw new Error("Failed to delete comment");
  }
};
