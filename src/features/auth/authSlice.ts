import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { login, register } from "../../services/authService";
import { User } from "../../types/user.type";

interface AuthState {
  user: {
    jwt: string;
    user: User;
  } | null;
  loading: boolean;
  error: string | null;
}

const storedUser = localStorage.getItem("credential");

const initialState: AuthState = {
  user:
    storedUser && storedUser !== "undefined" ? JSON.parse(storedUser) : null,
  loading: false,
  error: null,
};

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (
    credentials: { identifier: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await login(
        credentials.identifier,
        credentials.password
      );

      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Login failed");
    }
  }
);

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (
    userData: { username: string; email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await register(
        userData.username,
        userData.email,
        userData.password
      );

      return response;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Registration failed"
      );
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      localStorage.removeItem("credential");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        localStorage.setItem("credential", JSON.stringify(action.payload));
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        localStorage.setItem("credential", JSON.stringify(action.payload));
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
