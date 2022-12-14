export const moneyFormat = (value, currency = 'TRY') => {
  return new Intl.NumberFormat('tr-TR', {
    style: 'currency',
    currency
  }).format(value);
};

export const numberFormat = value => {
  return new Intl.NumberFormat('tr-TR').format(value);
};
