import { axiosInstance } from "./instance";

export const getCategories = async () => {
  try {
    const response = await axiosInstance.get("api/categories");
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch categories");
  }
};

export const postCategory = async (data: {
  data: {
    name: string;
  };
}) => {
  try {
    const response = await axiosInstance.post("api/categories", data);
    return response.data;
  } catch (error) {
    throw new Error("Failed to post category");
  }
};

export const updateCategory = async (
  documentId: string,
  data: {
    data: {
      name: string;
    };
  }
) => {
  try {
    const response = await axiosInstance.put(
      `api/categories/${documentId}`,
      data
    );
    return response.data;
  } catch (error) {
    throw new Error("Failed to update category");
  }
};

export const deleteCategory = async (documentId: string) => {
  try {
    const response = await axiosInstance.delete(`api/categories/${documentId}`);
    return response.data;
  } catch (error) {
    throw new Error("Failed to delete category");
  }
};
