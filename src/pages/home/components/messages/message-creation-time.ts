import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);
dayjs.extend(utc);
dayjs.extend(timezone);

export const setMessageCreationTime = (messageCreationTime: string) => {
  const createdAt = dayjs.utc(messageCreationTime);
  const georgianTime = createdAt.tz('Asia/Tbilisi');
  const displayTime = georgianTime.format('YYYY-MM-DD HH:mm');
  const now = dayjs().tz('Asia/Tbilisi');
  const isRecent = now.diff(georgianTime, 'hours') < 24;
  const displayFormatedTime = isRecent ? georgianTime.fromNow() : displayTime;

  return displayFormatedTime;
};
