// YYYY.MM.DD
export const formatDateString = (date: Date) => {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
};

export const parseDateString = (date: string) => {
  const [y, m, d] = date.split("-").map(Number);
  return new Date(y as number, (m as number) - 1, d);
};
