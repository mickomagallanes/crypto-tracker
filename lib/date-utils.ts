import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(customParseFormat);

const adjustToTimezome = (timestamp: number) => {
  const date = dayjs.utc(timestamp);

  // adjust to the user's timezone
  const userTimezone = dayjs.tz.guess();
  return date.tz(userTimezone);
};

export const formatComplete = (timestamp: number) => {
  const adjustedDate = adjustToTimezome(timestamp);

  return adjustedDate.format("MM/DD/YYYY, h:mm:ss A [GMT]Z");
};

export const formatDate = (timestamp: number) => {
  const adjustedDate = adjustToTimezome(timestamp);

  return adjustedDate.format("MM/DD/YYYY");
};
