export const formatReleaseDate = (releaseDate) => {
  const dateObject = new Date(releaseDate);
  const format = { year: "numeric", month: "short", day: "numeric" };
  const formattedReleaseDate = dateObject
    .toLocaleString("en-US", format)
    .toUpperCase();
  return formattedReleaseDate;
};

export const formatPrice = (price) => {
  const convertedPrice = price.toLocaleString("vi-VN", {
    style: "currency",
    currency: "VND",
  });
  return convertedPrice;
};
