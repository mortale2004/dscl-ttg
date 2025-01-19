import dayjs from "dayjs";
import AdvancedFormat from "dayjs/plugin/advancedFormat";
import relativeTime from "dayjs/plugin/relativeTime";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);
dayjs.extend(AdvancedFormat);
dayjs.extend(relativeTime);

type DateObject = number | null | undefined;

export const getDateObject = (dateObject?: Date) => {
  if (dateObject) return dayjs(dateObject);
  return dayjs();
};

export const formatDate = (
  dateObject?: Date,
  format: string = "DD MMM YYYY",
) => {
  if (dateObject) return dayjs(dateObject).utc().format(format);
  return dayjs().utc().format(format);
};

export const formatDateTime = (
  date?: Date,
  format: string = "DD MMM YYYY LT",
) => {
  if (date) return dayjs(date).utc().format(format);
  return dayjs().utc().format(format);
};

export const formatTime = (date?: Date, format: string = "LT") => {
  if (date) return dayjs(date).utc().format(format);
  return dayjs().utc().format(format);
};

export const timeFromNow = (date?: Date) => {
  const timestamp = Number(dayjs(date).format("X"));
  const newDate = dayjs.unix(timestamp);
  return dayjs(newDate).fromNow();
};

export const addDays = (
  days: number,
  currentDate: number = new Date().getMilliseconds(),
  format: string = "DD MMM YYYY",
) => {
  const date = new Date(currentDate + days * 24 * 60 * 60 * 1000);
  if (date) return dayjs(date).utc().format(format);
  return dayjs().utc().format(format);
};

export const formatMinToTime = (minutes: number) => {
  if (minutes) {
    minutes = Math.abs(minutes);
    if (minutes < 60) {
      return `${minutes} M.`;
    }
    return `${Math.trunc(minutes / 60)} H. ${minutes % 60} M.`;
  } else {
    return null;
  }
};

export const getTodaysTime = (date: number = new Date().getTime()) => {
  const dateObject = new Date(date);
  const newDate = new Date();
  newDate.setHours(dateObject.getUTCHours(), dateObject.getUTCMinutes(), 0, 0);
  return newDate;
};

export const generateCalendar = (year: number, month: number) => {
  month = Number(month);
  year = Number(year);
  const calendar = [];

  // Get the first date of the month
  const firstDayOfMonth = new Date(year, month, 1);
  // Get the last date of the month
  const lastDayOfMonth = new Date(year, month + 1, 0);

  // Find the first Sunday before or on the first day of the month
  const startDate = new Date(firstDayOfMonth);
  while (startDate.getDay() !== 0) {
    startDate.setDate(startDate.getDate() - 1);
  }

  // Find the last Saturday after or on the last day of the month
  const endDate = new Date(lastDayOfMonth);
  while (endDate.getDay() !== 6) {
    endDate.setDate(endDate.getDate() + 1);
  }

  // Loop through each day from startDate to endDate
  let currentDate = new Date(new Date(startDate).setHours(0, 0, 0, 0));
  while (currentDate <= endDate) {
    calendar.push(new Date(currentDate));

    // Move to the next day
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return calendar;
};

export const getIndianDateTime = (date?: any) => {
  const utcDate = (date && new Date(date)) || new Date();
  return new Date(utcDate.getTime() - -330 * 60 * 1000);
};

export const _MS_PER_DAY = 1000 * 60 * 60 * 24;

export const getDifferenceInDays = (date1: Date, date2: Date) => {
  // Discard the time and time-zone information.
  const utc1 = Date.UTC(date1.getFullYear(), date1.getMonth(), date1.getDate());
  const utc2 = Date.UTC(date2.getFullYear(), date2.getMonth(), date2.getDate());

  return Math.floor((utc2 - utc1) / _MS_PER_DAY);
};
