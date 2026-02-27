// YYYY.DD.MM (HH:MM)
export const formatDateString = (
  date: Date | string,
  options?: {
    time?: boolean;
    relative?: boolean;
  },
): string => {
  const newDate = new Date(date);
  const now = new Date();

  const y = newDate.getFullYear();
  const m = String(newDate.getMonth() + 1).padStart(2, "0");
  const d = String(newDate.getDate()).padStart(2, "0");

  const h = String(newDate.getHours()).padStart(2, "0");
  const min = String(newDate.getMinutes()).padStart(2, "0");

  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);

  let result = `${y}-${m}-${d}`;

  if (options?.relative) {
    if (isSameFullDate(newDate, now)) {
      result = "Сегодня";
    } else if (isSameFullDate(newDate, yesterday)) {
      result = "Вчера";
    }
  }

  if (options?.time) {
    if (isSameFullDate(newDate, now)) {
      return options?.relative ? `${result} ${h}:${min}` : `${h}:${min}`;
    }

    return `${result} (${h}:${min})`;
  }

  return result;
};

export const parseDateString = (date: string) => {
  const [y, m, d] = date.split("-").map(Number);
  return new Date(y as number, (m as number) - 1, d);
};

export const isSameFullDate = (date1: Date, date2: Date): boolean => {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
};
