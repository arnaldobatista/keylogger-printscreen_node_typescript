type dateType = { getHours: () => unknown; getMinutes: () => unknown; }

const formatTime = (date: dateType) =>
  `${String(date.getHours()).padStart(2, '0')}:${String(
    date.getMinutes(),
  ).padStart(2, '0')}`;

export { formatTime };
