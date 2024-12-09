import { axiosInstance } from "./instance";

export const getArticles = async (
  page: number = 1,
  pageSize: number = 25,
  filters: { title?: string; categoryName?: string } = {}
) => {
  try {
    const params: Record<string, any> = {
      "pagination[page]": page,
      "pagination[pageSize]": pageSize,
      "populate[comments][populate][user]": "*",
      "populate[category]": "*",
      "populate[user]": "*",
    };

    if (filters.title) {
      params["filters[title][$eqi]"] = filters.title;
    }

    if (filters.categoryName) {
      params["filters[category][name][$eqi]"] = filters.categoryName;
    }

    const response = await axiosInstance.get("api/articles", {
      params,
    });

    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch articles");
  }
};

export const postArticle = async (data: {
  data: {
    title: string;
    description: string;
    cover_image_url: string;
    category: number;
  };
}) => {
  try {
    const response = await axiosInstance.post("api/articles", data);

    return response.data;
  } catch (error) {
    throw new Error("Failed to post article");
  }
};

export const updateArticle = async (
  documentId: string,
  data: {
    data: {
      title: string;
      description: string;
      cover_image_url: string;
      category: number;
    };
  }
) => {
  try {
    const response = await axiosInstance.put(
      `api/articles/${documentId}`,
      data
    );
    return response.data;
  } catch (error) {
    throw new Error("Failed to update article");
  }
};

export const deleteArticle = async (documentId: string) => {
  try {
    const response = await axiosInstance.delete(`api/articles/${documentId}`);
    return response.data;
  } catch (error) {
    throw new Error("Failed to delete article");
  }
};
