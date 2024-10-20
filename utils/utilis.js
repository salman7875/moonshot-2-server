export const formateDate = (dateStr) => {
  const date = new Date(dateStr).toISOString();
  return date;
};
