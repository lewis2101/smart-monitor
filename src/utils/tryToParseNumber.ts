export const tryToParseNumber = (value: string | number) => {
  try {
    const parsedValue = Number(value);
    if (Number.isNaN(parsedValue)) {
      return value;
    }
    return parsedValue;
  } catch (e) {
    return value;
  }
};
