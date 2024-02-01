type dateType = {
  getDate: () => unknown;
  getMonth: () => number;
  getFullYear: () => unknown;
};

const formatDate = (date: dateType) =>
  `${String(date.getDate()).padStart(2, '0')}/${String(
    date.getMonth() + 1,
  ).padStart(2, '0')}/${date.getFullYear()}`;

export { formatDate };
