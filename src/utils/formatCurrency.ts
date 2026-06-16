export function formatCurrency(value: number) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
}

export function currencyMask(value: string) {
  const onlyNumbers = value.replace(/\D/g, '');

  const numberValue = Number(onlyNumbers) / 100;

  return formatCurrency(numberValue);
}

export function currencyToNumber(value: string) {
  const onlyNumbers = value.replace(/\D/g, '');

  return Number(onlyNumbers) / 100;
}