import dayjs from "dayjs";

export const formatDate = (date: string) => {
  return dayjs(date).format("DD MMMM YYYY");
};

export const formatDateTime = (date: string) => {
  return dayjs(date).format("DD MMMM YYYY / HH:mm");
};
