export const getOrderErrorMessage = (message: string, columnName: string) => {
  return message.replace("column", columnName);
};
