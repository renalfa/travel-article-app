import { FC } from "react";
import { Bar } from "react-chartjs-2";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface Props {
  data: {
    label: string;
    count: number;
  }[];
  labelChart: string;
}
const Chart: FC<Props> = ({ data, labelChart }) => {
  const labels = data.map((item) => item.label);
  const newData = data.map((item) => item.count);

  const chartData = {
    labels,
    datasets: [
      {
        label: labelChart,
        data: newData,
        backgroundColor: "rgba(79, 138, 139, 0.5)",
        borderColor: "rgba(79, 138, 139, 1)",
        borderWidth: 1.5,
      },
    ],
  };

  return <Bar data={chartData} options={{ responsive: true }} />;
};

export default Chart;
