// DD.MM.YYYY (HH:MM)
export const formatDateString = (
  date: Date | string,
  options?: {
    time: boolean;
  },
) => {
  const newDate = new Date(date);
  const y = newDate.getFullYear();
  const m = String(newDate.getMonth() + 1).padStart(2, "0");
  const d = String(newDate.getDate()).padStart(2, "0");

  let result = `${d}-${m}-${y}`;

  if (options?.time) {
    const h = String(newDate.getHours()).padStart(2, "0");
    const min = String(newDate.getMinutes()).padStart(2, "0");
    result += ` (${h}:${min})`;
  }

  return result;
};

export const parseDateString = (date: string) => {
  const [y, m, d] = date.split("-").map(Number);
  return new Date(y as number, (m as number) - 1, d);
};
