import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { MetaProps } from "../../types/articles.type";
import { Category } from "../../types/category.type";
import { getCategories } from "../../services/categoryService";

interface CategoryState {
  categories: {
    data: Category[];
    meta: MetaProps;
  };
  loading: boolean;
  error: string | null;
}

const initialState: CategoryState = {
  categories: {
    data: [],
    meta: {
      pagination: {
        page: 1,
        pageSize: 25,
        pageCount: 1,
        total: 0,
      },
    },
  },
  loading: false,
  error: null,
};

export const fetchCategoriesAsync = createAsyncThunk(
  "categories/fetchCategories",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getCategories();

      return response;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch categories"
      );
    }
  }
);

const categorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategoriesAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategoriesAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(fetchCategoriesAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default categorySlice.reducer;
