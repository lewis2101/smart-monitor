// YYYY.MM.DD (HH:MM)
export const formatDateString = (
  date: Date,
  options?: {
    time: boolean;
  }
) => {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");

  let result = `${y}-${m}-${d}`;

  if (options?.time) {
    const h = String(date.getHours()).padStart(2, "0");
    const min = String(date.getMinutes()).padStart(2, "0");
    result += ` (${h}:${min})`;
  }

  return result;
};


export const parseDateString = (date: string) => {
  const [y, m, d] = date.split("-").map(Number);
  return new Date(y as number, (m as number) - 1, d);
};
