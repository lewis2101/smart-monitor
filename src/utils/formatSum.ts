export function formatSum(value: number | string): string {
  const number = Number(value);

  if (!Number.isFinite(number)) return "";

  return new Intl.NumberFormat("ru-RU").format(number);
}
