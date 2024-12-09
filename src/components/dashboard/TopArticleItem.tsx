import { FC } from "react";

interface Props {
  data: {
    label: string;
    count: number;
  }[];
  label: string;
  subLabel: string;
}

const TopArticleItem: FC<Props> = ({ data, label, subLabel }) => {
  const newData = data.sort((a, b) => b.count - a.count).slice(0, 5);

  return (
    <div className="flex flex-col p-4 border md:p-8 h-fit lg:h-full rounded-xl bg-primary/5">
      <h2 className="text-lg md:text-2xl font-outfit-bold">{label}</h2>
      <p className="mb-8 text-xs md:text-sm font-outfit-regular text-black/50">
        {subLabel}
      </p>
      <ul className="flex flex-col gap-4">
        {newData.map((item, i) => (
          <li
            key={i}
            className="flex items-center justify-between text-sm md:text-lg font-outfit-regular"
          >
            <p>
              <span className="font-outfit-bold">
                {data.indexOf(item) + 1}.
              </span>
              <span
                className={`ml-2 ${item.label ? "" : "italic text-black/50"}`}
              >
                {item.label || "belum ada judul"}
              </span>
            </p>
            <p>
              <span>{item.count}</span>
              <span className="ml-2 text-[10px] font-outfit-light text-black/50">
                komentar
              </span>
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TopArticleItem;
