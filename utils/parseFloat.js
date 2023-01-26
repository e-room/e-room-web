export default (value, length) => {
  return typeof value === "number"
    ? Number.parseFloat(value).toFixed(length)
    : 0;
};
