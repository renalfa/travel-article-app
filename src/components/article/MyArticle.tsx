import { FC } from "react";
import { useSelector } from "react-redux";
import ArticleItem from "../dashboard/ArticleItem";
import { RootState } from "../../features/store";
import { Article, MetaProps } from "../../types/articles.type";
import { MdOutlineDelete, MdOutlineEdit } from "react-icons/md";

interface Props {
  articles: {
    data: Article[];
    meta: MetaProps;
  };
  handleEditBtn: (article: Article) => void;
  handleDeleteArticle: (documentId: string) => void;
}

const MyArticle: FC<Props> = ({
  articles,
  handleEditBtn,
  handleDeleteArticle,
}) => {
  const { user } = useSelector((state: RootState) => state.auth);
  const myArticles = articles?.data?.filter(
    (article) => article?.user?.documentId === user?.user?.documentId
  );

  return (
    <div className="flex flex-col w-full mx-auto">
      <h2 className="text-lg text-center md:text-2xl font-outfit-bold">
        Artikel Saya
      </h2>

      {myArticles?.length === 0 && (
        <p className="mt-8 text-center text-black/50">Belum ada artikel</p>
      )}

      <div className="grid grid-cols-1 gap-4 mt-8 lg:grid-cols-2">
        {myArticles?.map((article) => (
          <div key={article.documentId}>
            <ArticleItem item={article} />
            <div className="flex items-center justify-end gap-4 mt-4">
              <MdOutlineEdit
                onClick={() => handleEditBtn(article)}
                size={20}
                className="cursor-pointer text-primary"
              />
              <MdOutlineDelete
                onClick={() => handleDeleteArticle(article.documentId)}
                size={20}
                className="text-red-700 cursor-pointer"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyArticle;
