export function formateDate(timestamp) {
  // const timestamp = 1682451983826;
  const date = new Date(timestamp);

  const year = date.getFullYear();
  const month = date.getMonth() + 1; // додаємо 1, бо номер місяця починається з 0
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();

  const formattedDate = `${day}.${month}.${year} ${hours}:${minutes}`;

  return formattedDate;
}
