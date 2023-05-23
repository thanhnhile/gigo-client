const PER_DAY = 60 * 60 * 24;
export const PER_HOUR = 60 * 60;
const PER_MINUTE = 60;
const PER_WEEK = 7 * PER_DAY;

export function formatDate(dateTime) {
  return dateTime.slice(0, 10).split('-').reverse().join('/');
}
export function getTimestamp(date) {
  return Math.ceil(new Date(date) / 1000);
}
export function compareWithNow(date) {
  const now = getTimestamp(new Date());
  return getTimestamp(date) - now;
}
export function getDistanceFromNowToDate(date) {
  let diff = Math.abs(compareWithNow(date));
  if (diff >= 3 * PER_DAY) {
    return `HSD: ${formatDate(date)}`;
  } else if (diff > PER_DAY) {
    return `Sắp hết hạn: Còn ${Math.floor(diff / PER_DAY)} ngày`;
  } else if (diff >= PER_HOUR) {
    return `Sắp hết hạn: Còn ${Math.floor(diff / PER_HOUR)} giờ`;
  } else if (diff >= PER_MINUTE) {
    return `Sắp hết hạn: Còn ${Math.floor(diff / PER_MINUTE)} phút`;
  }
}

export function getDiffFromNow(date) {
  if (!date) return;
  let diff = Math.abs(compareWithNow(date));
  if (diff > PER_WEEK) {
    return formatDate(date);
  } else if (diff >= PER_DAY) {
    return Math.floor(diff / PER_DAY) + ' ngày trước';
  } else if (diff >= PER_HOUR) {
    return Math.floor(diff / PER_HOUR) + ' giờ trước';
  } else if (diff >= PER_MINUTE) {
    return Math.floor(diff / PER_MINUTE) + ' phút trước';
  } else return diff + ' giây trước';
}
