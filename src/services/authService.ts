import axios from "axios";
import { API_URL } from "../lib/constant";

export const login = async (identifier: string, password: string) => {
  try {
    const body = new URLSearchParams();
    body.append("identifier", identifier);
    body.append("password", password);

    const response = await axios.post(`${API_URL}/api/auth/local`, body, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Login failed");
  }
};

export const register = async (
  username: string,
  email: string,
  password: string
) => {
  try {
    const body = new URLSearchParams();
    body.append("username", username);
    body.append("email", email);
    body.append("password", password);

    const response = await axios.post(
      `${API_URL}/api/auth/local/register`,
      body,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Registration failed");
  }
};
