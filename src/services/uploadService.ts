import { axiosInstance } from "./instance";

export const uploadFiles = async (files: File[]): Promise<any> => {
  const formData = new FormData();

  files.forEach((file) => {
    formData.append("files", file);
  });

  try {
    const response = await axiosInstance.post("api/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Upload error:", error);
    throw new Error("Upload failed");
  }
};
