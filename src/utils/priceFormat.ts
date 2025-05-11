interface Price {
  main: number;
  fractional: number;
}

export const formatPrice = (price: Price): string => {
  return `${price.main}.${price.fractional.toString().padStart(2, "0")}`;
};

export const calculateItemTotal = (price: Price, quantity: number): string => {
  const total = (price.main + price.fractional / 100) * quantity;
  return total.toFixed(2);
};
