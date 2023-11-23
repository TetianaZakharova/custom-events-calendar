export function addZero(num) {
  if (num >= 0 && num <= 9) {
    return "0" + num;
  } else {
    return num;
  }
}
export function getFormattedDate(date) {
  let year = date.getFullYear();
  let month = addZero(date?.getMonth() + 1);
  let day = addZero(date?.getDate());
  let hours = addZero(date.getHours());
  let minutes = addZero(date.getMinutes());
  return `${year}-${month}-${day} ${hours}:${minutes}`;
}
