import dayjs from "dayjs";
import { Timestamp } from "firebase/firestore";

export const setFormattedDateTime = (date: Timestamp) => {
  if (date.toDate().toLocaleDateString() === dayjs().toDate().toLocaleDateString()) {
    return dayjs(date.toDate()).format("HH:mm");
  }
  return dayjs(date.toDate()).format("MMM D");
};
