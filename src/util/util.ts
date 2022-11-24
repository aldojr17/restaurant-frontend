export const formatCurrency = (price: number) => {
  let formatter = new Intl.NumberFormat("id-ID");
  return formatter.format(price);
};
