import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import ChartItem from "../components/dashboard/ChartItem";
import TopArticleItem from "../components/dashboard/TopArticleItem";
import LoadingBar from "../components/ui/loading-bar";
import { AppDispatch, RootState } from "../features/store";
import { fetchArticlesAsync } from "../features/articles/articleSlice";
import { calculateComments } from "../lib/calculate";

const Dashboard = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.auth);
  const { articles, loading, error } = useSelector(
    (state: RootState) => state.articles
  );
  const [articleStats, setArticleStats] = useState<
    {
      label: string;
      count: number;
    }[]
  >([]);

  useEffect(() => {
    if (user !== null) {
      dispatch(fetchArticlesAsync({ page: 1, pageSize: 25 }));
    }
  }, [dispatch, user]);

  useEffect(() => {
    if (articles && user) {
      const stats = calculateComments(articles.data);

      setArticleStats(stats);
    }
  }, [articles, user]);

  useEffect(() => {
    if (error) {
      toast.error("Gagal mengambil data artikel !");
    }
  }, [error]);

  return (
    <div className="relative grid w-full grid-cols-1 gap-4 p-4 md:gap-8 md:p-8 lg:grid-cols-2 h-dvh">
      <LoadingBar loading={loading} />
      <div className="flex flex-col gap-4 md:gap-8 lg:order-last">
        <ChartItem
          data={articleStats}
          label="Statistik Komentar"
          subLabel="Menampilkan data komentar per artikel"
        />
        <TopArticleItem
          data={articleStats}
          label="Top 5 Artikel dengan Komentar Terbanyak"
          subLabel="Menampilkan 5 artikel dengan jumlah komentar terbanyak"
        />
      </div>
    </div>
  );
};

export default Dashboard;
