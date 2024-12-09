import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import LoadingBar from "../components/ui/loading-bar";
import FormAddArticle from "../components/article/FormAddArticle";
import MyArticle from "../components/article/MyArticle";
import { AppDispatch, RootState } from "../features/store";
import { fetchArticlesAsync } from "../features/articles/articleSlice";
import {
  deleteArticle,
  postArticle,
  updateArticle,
} from "../services/articleService";
import { Article as ArticleType } from "../types/articles.type";

export interface DataProps {
  documentId: string;
  title: string;
  description: string;
  cover_image_url: string;
  category: string;
}

const initialData: DataProps = {
  documentId: "",
  title: "",
  description: "",
  cover_image_url: "",
  category: "",
};

const Article = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { articles, loading, error } = useSelector(
    (state: RootState) => state.articles
  );

  const [data, setData] = useState<DataProps>(initialData);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { documentId, title, description, cover_image_url, category } = data;

  const submitHandler = async () => {
    setIsLoading(true);
    const payload = {
      data: {
        title,
        description,
        cover_image_url,
        category: Number(category),
      },
    };

    try {
      if (isEditing) {
        await updateArticle(documentId, payload);
      } else {
        await postArticle(payload);
      }

      dispatch(fetchArticlesAsync({ page: 1, pageSize: 25 }));

      toast.success(
        isEditing
          ? "Berhasil memperbarui artikel !"
          : "Berhasil menambahkan artikel !"
      );
    } catch (error) {
      toast.error(
        isEditing
          ? "Gagal memperbarui artikel !"
          : "Gagal menambahkan artikel !"
      );
    } finally {
      setIsLoading(false);
      setIsEditing(false);
      setData(initialData);
    }
  };

  const handleDeleteArticle = async (documentId: string) => {
    try {
      await deleteArticle(documentId);

      dispatch(fetchArticlesAsync({ page: 1, pageSize: 25 }));

      toast.success("Berhasil menghapus artikel !");
    } catch (error) {
      toast.error("Gagal menghapus artikel !");
    }
  };

  const handleEditBtn = (data: ArticleType) => {
    setIsEditing(true);

    setData({
      documentId: data.documentId,
      title: data.title,
      description: data.description,
      cover_image_url: data.cover_image_url,
      category: String(data.category),
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleCancelBtn = () => {
    setIsEditing(false);

    setData(initialData);
  };

  useEffect(() => {
    dispatch(fetchArticlesAsync({ page: 1, pageSize: 25 }));
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error("Gagal mengambil data artikel !");
    }
  }, [error]);

  return (
    <div className="relative flex flex-col w-full h-full gap-4 p-4 md:gap-8 md:p-8">
      <LoadingBar loading={loading} />
      <FormAddArticle
        isEditing={isEditing}
        data={data}
        setData={setData}
        submitHandler={submitHandler}
        handleCancelBtn={handleCancelBtn}
        isLoading={isLoading}
      />
      <MyArticle
        articles={articles}
        handleEditBtn={handleEditBtn}
        handleDeleteArticle={handleDeleteArticle}
      />
    </div>
  );
};

export default Article;
