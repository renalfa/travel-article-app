import { FC, useCallback, useRef } from "react";
import ArticleItem from "./ArticleItem";
import { Article, MetaProps } from "../../types/articles.type";

interface Props {
  data: {
    data: Article[];
    meta: MetaProps;
  };
  label: string;
  subLabel: string;
  onLoadMore?: () => void;
  loading?: boolean;
  hasMore?: boolean;
}

const ArticleSection: FC<Props> = ({
  data,
  label,
  subLabel,
  onLoadMore,
  loading,
  hasMore,
}) => {
  const observer = useRef<IntersectionObserver | null>(null);

  const lastArticleRef = useCallback(
    (node: HTMLDivElement) => {
      if (!onLoadMore) return;
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          onLoadMore();
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, hasMore, onLoadMore]
  );

  return (
    <div className="flex flex-col p-4 overflow-y-hidden border md:p-8 h-fit lg:h-full rounded-xl bg-primary/5">
      <h2 className="text-lg md:text-2xl font-outfit-bold">{label}</h2>
      <p className="mb-8 text-sm md:text-sm font-outfit-regular text-black/50">
        {subLabel}
      </p>
      <ul className="flex flex-col h-full gap-4 overflow-y-scroll">
        {data?.data.map((item, i) => (
          <div
            ref={i === data?.data.length - 1 ? lastArticleRef : null}
            key={i}
          >
            <ArticleItem item={item} />
          </div>
        ))}
        {loading && (
          <p className="text-sm text-center text-gray-500 font-outfit-regular">
            Loading...
          </p>
        )}
        {!hasMore && !loading && (
          <p className="my-auto text-sm text-center text-gray-500 font-outfit-regular">
            No more articles
          </p>
        )}
      </ul>
    </div>
  );
};

export default ArticleSection;
