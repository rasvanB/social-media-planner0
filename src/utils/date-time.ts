import { format } from "date-fns";

export const differenceInDays = (date1: Date, date2: Date): number => {
  const oneDayMilliseconds = 1000 * 60 * 60 * 24;
  const date1Milliseconds = date1.getTime();
  const date2Milliseconds = date2.getTime();

  const differenceMilliseconds = date1Milliseconds - date2Milliseconds;
  const differenceDays = Math.floor(
    differenceMilliseconds / oneDayMilliseconds
  );

  return differenceDays;
};

export const rtf = new Intl.RelativeTimeFormat("en", {
  numeric: "auto",
  style: "long",
});

export const getLocalString = (date: Date) =>
  format(date, "yyyy-MM-dd'T'HH:mm");
