export const formatPrice = (price) => {
  return "$" + new Intl.NumberFormat("es-CL").format(price);
};