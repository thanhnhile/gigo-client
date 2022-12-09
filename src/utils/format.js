export const formatPrice = (price) => {
  const formatter = new Intl.NumberFormat('vi');
  return formatter.format(price);
};
