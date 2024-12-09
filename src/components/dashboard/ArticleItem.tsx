import { FC, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import Badge from "../ui/badge";
import Loader from "../ui/loader";
import { RiChat3Line, RiSendPlaneFill } from "react-icons/ri";
import { formatDateTime } from "../../lib/formater";
import { postComment } from "../../services/commentService";
import { AppDispatch } from "../../features/store";
import { fetchArticlesAsync } from "../../features/articles/articleSlice";
import { Article } from "../../types/articles.type";

interface Props {
  item: Article;
}

const ArticleItem: FC<Props> = ({ item }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [showComment, setShowComment] = useState<boolean>(false);
  const [comment, setComment] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const addComment = async () => {
    const payload = {
      data: {
        article: item?.id,
        content: comment,
      },
    };

    setIsLoading(true);

    try {
      await postComment(payload);

      dispatch(fetchArticlesAsync({ page: 1, pageSize: 100 }));
    } catch (error) {
      toast.error("Gagal menambahkan komentar !");
    } finally {
      setComment("");
      setIsLoading(false);
    }
  };

  return (
    <li className="relative flex flex-col gap-3 p-3 text-lg border md:gap-4 font-outfit-regular rounded-xl bg-primary/5">
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-2">
          <img
            src={`https://ui-avatars.com/api/?name=${item?.user?.username}&background=random`}
            alt={item?.user?.username}
            className="rounded-full size-5 md:size-7"
          />
          <p className="text-xs md:text-sm">{item?.user?.username}</p>
        </div>
        {item?.category && <Badge>{item?.category?.name}</Badge>}
      </div>
      <div className="w-full h-56 overflow-hidden md:h-96">
        <img
          src={item.cover_image_url || "https://via.placeholder.com/400"}
          alt={item.title}
          className="object-cover object-center w-full h-full rounded-lg"
        />
      </div>
      <div
        onClick={() => setShowComment(!showComment)}
        className="flex items-center w-full"
      >
        <RiChat3Line size={20} className="cursor-pointer" />
        <p className="ml-2 text-sm md:text-base">
          {item?.comments?.length > 0 ? item?.comments?.length : ""}
        </p>
      </div>
      <p className="text-sm">
        <span className="font-outfit-semibold">{item?.title}</span>
        <span className="font-outfit-regular text-primary">
          {" "}
          by {item?.user?.username}{" "}
        </span>
      </p>
      <span className="-mt-3 text-xs tracking-wide font-outfit-light">
        {item?.description}
      </span>
      {showComment && (
        <div className="flex flex-col gap-2">
          {item?.comments &&
            item?.comments.map((comment) => (
              <div
                key={comment?.id}
                className="flex items-start gap-2 ml-2 text-xs md:items-center"
              >
                <img
                  src={`https://ui-avatars.com/api/?name=${comment?.user?.username}&background=random`}
                  alt={comment?.user?.username}
                  className="mt-1 rounded-full size-5 md:mt-0"
                />
                <div className="flex flex-col md:gap-2 md:flex-row">
                  <p className=" font-outfit-semibold text-primary">
                    {comment?.user?.username}
                  </p>
                  <p className="font-outfit-light">{comment?.content}</p>
                </div>
              </div>
            ))}

          {isLoading && (
            <div className="flex items-center w-full ml-8">
              <Loader />
              <span className="text-[10px] ml-2">Mengirim ...</span>
            </div>
          )}

          <div className="flex items-center gap-2 ml-8">
            <input
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              type="text"
              placeholder="Tambah komentar ..."
              className="w-full px-3 py-1.5 text-xs border-none rounded outline-none bg-primary/10"
            />
            <button
              disabled={isLoading || !comment}
              onClick={addComment}
              className="flex-none rounded-full size-7 bg-primary flex-center disabled:brightness-75"
            >
              <RiSendPlaneFill
                size={16}
                className="cursor-pointer text-primary-foreground"
              />
            </button>
          </div>
        </div>
      )}
      <span className="text-[10px] text-black/50">
        {formatDateTime(item?.createdAt)}
      </span>
    </li>
  );
};

export default ArticleItem;
