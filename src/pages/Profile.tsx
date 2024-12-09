import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import LoadingBar from "../components/ui/loading-bar";
import ArticleSection from "../components/dashboard/ArticleSection";
import ProfileSection from "../components/profile/ProfileSection";
import { AppDispatch, RootState } from "../features/store";
import { fetchArticlesAsync } from "../features/articles/articleSlice";

const Profile = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.auth);
  const { articles, loading, error } = useSelector(
    (state: RootState) => state.articles
  );

  const filteredArticles = articles?.data?.filter((article) =>
    article.comments.some(
      (comment) => comment?.user?.documentId === user?.user?.documentId
    )
  );

  useEffect(() => {
    dispatch(fetchArticlesAsync({ page: 1, pageSize: 25 }));
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error("Gagal mengambil data artikel !");
    }
  }, [error]);

  return (
    <div className="relative grid w-full grid-cols-1 gap-4 p-4 md:gap-8 md:p-8 lg:grid-cols-2 h-dvh">
      <LoadingBar loading={loading} />
      <div className="flex flex-col gap-4 md:gap-8 lg:order-last">
        <ProfileSection />
      </div>
      <ArticleSection
        data={{
          data: filteredArticles,
          meta: articles?.meta,
        }}
        label="Artikel yang Anda Komentari"
        subLabel={`Menampilkan ${
          filteredArticles?.length || 0
        } artikel yang Anda Komentari`}
      />
    </div>
  );
};

export default Profile;
