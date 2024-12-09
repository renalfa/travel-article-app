import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Article, MetaProps } from "../../types/articles.type";
import { getArticles } from "../../services/articleService";

interface ArticleState {
  articles: {
    data: Article[];
    meta: MetaProps;
  };
  loading: boolean;
  error: string | null;
}

const initialState: ArticleState = {
  articles: {
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

export const fetchArticlesAsync = createAsyncThunk(
  "articles/fetchArticles",
  async (
    {
      page = 1,
      pageSize = 25,
      filters = {},
    }: {
      page?: number;
      pageSize?: number;
      filters?: { title?: string; categoryName?: string };
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await getArticles(page, pageSize, filters);

      return response;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch articles"
      );
    }
  }
);

const articleSlice = createSlice({
  name: "articles",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticlesAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchArticlesAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.articles = action.payload;
      })
      .addCase(fetchArticlesAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default articleSlice.reducer;
