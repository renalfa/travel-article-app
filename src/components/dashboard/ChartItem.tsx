import { FC } from "react";
import Chart from "../ui/chart";

interface Props {
  data: {
    label: string;
    count: number;
  }[];
  label: string;
  subLabel: string;
}
const ChartItem: FC<Props> = ({ data, label, subLabel }) => {
  return (
    <div className="p-4 border md:p-8 rounded-xl bg-primary/5 h-fit">
      <h2 className="text-lg md:text-2xl font-outfit-bold">{label}</h2>
      <p className="mb-8 text-xs md:text-sm font-outfit-regular text-black/50">
        {subLabel}
      </p>
      <Chart data={data} labelChart="Jumlah Komentar" />
    </div>
  );
};

export default ChartItem;
