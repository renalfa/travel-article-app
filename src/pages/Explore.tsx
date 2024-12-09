import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import ArticleSection from "../components/dashboard/ArticleSection";
import Badge from "../components/ui/badge";
import LoadingBar from "../components/ui/loading-bar";
import { AppDispatch, RootState } from "../features/store";
import { fetchArticlesAsync } from "../features/articles/articleSlice";
import { fetchCategoriesAsync } from "../features/categories/categorySlice";

const Explore = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { articles, loading, error } = useSelector(
    (state: RootState) => state.articles
  );
  const { categories } = useSelector((state: RootState) => state.categories);
  const [filter, setFilter] = useState<string | null>(null);
  const [pageSize, setPageSize] = useState<number>(5);

  const hasMore = articles.data.length === articles.meta.pagination.pageSize;

  const handleCategoryClick = (category: string) => {
    if (filter === category) {
      setFilter(null);
    } else {
      setFilter(category);
    }

    setPageSize(5);
  };

  const loadMoreArticles = useCallback(() => {
    if (!loading && hasMore) {
      setPageSize((prevPage) => prevPage + 5);
    }
  }, [loading, hasMore]);

  useEffect(() => {
    const params: any = { page: 1, pageSize };
    if (filter) {
      params.filters = { categoryName: filter };
    }

    dispatch(fetchArticlesAsync(params));
    dispatch(fetchCategoriesAsync());
  }, [dispatch, filter, pageSize]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.scrollHeight - 100
      ) {
        loadMoreArticles();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loadMoreArticles]);

  useEffect(() => {
    if (error) {
      toast.error("Gagal mengambil data artikel !");
    }
  }, [error]);

  return (
    <div className="relative flex flex-col w-full gap-4 p-4 md:gap-8 lg:flex-row md:p-8 h-dvh">
      <LoadingBar loading={loading} />
      <div className="w-full max-w-sm p-4 border rounded-xl bg-primary/5 md:p-8 h-fit">
        <h2 className="text-lg md:text-2xl font-outfit-bold">Filter</h2>
        <p className="mb-4 text-sm md:text-sm font-outfit-regular text-black/50">
          filter berdasarkan kategori
        </p>
        <ul className="grid grid-cols-2 gap-4 md:grid-cols-3">
          {categories?.data.map((item, i) => (
            <li
              onClick={() => handleCategoryClick(item.name)}
              key={i}
              className="text-sm cursor-pointer md:text-lg font-outfit-regular"
            >
              <Badge
                className={`w-full py-1.5 md:py-3 text-center ${
                  filter === item.name
                    ? "!bg-primary !text-primary-foreground"
                    : ""
                }`}
              >
                {item.name}
              </Badge>
            </li>
          ))}
        </ul>
      </div>

      <div className="w-full">
        <ArticleSection
          data={articles}
          label="Artikel Terbaru"
          subLabel="Menampilkan artikel terbaru"
          onLoadMore={loadMoreArticles}
          loading={loading}
          hasMore={hasMore}
        />
      </div>
    </div>
  );
};

export default Explore;
