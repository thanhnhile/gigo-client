const PER_DAY = 60 * 60 * 24;
const PER_HOUR = 60 * 60;
const PER_MINUTE = 60;
const PER_WEEK = 7 * PER_DAY;

export function formatDate(dateTime) {
  return dateTime.slice(0, 10).split('-').reverse().join('/');
}
export function getTimestamp(date) {
  return Math.ceil(new Date(date) / 1000);
}
export function getDiffFromNow(date) {
  const now = getTimestamp(new Date());
  let diff = now - getTimestamp(date);
  if (diff > PER_WEEK) {
    return formatDate(date);
  } else if (diff >= PER_DAY) {
    return Math.floor(diff / PER_DAY) + ' ngày trước';
  } else if (diff >= PER_HOUR) {
    return Math.floor(diff / PER_HOUR) + ' giờ trước';
  } else if (diff >= PER_MINUTE) {
    return Math.floor(diff / PER_MINUTE) + ' phút trước';
  } else return diff + ' giấy trước';
}
