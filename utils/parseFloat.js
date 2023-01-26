export default (value, length) => {
  return typeof value === "number"
    ? Number.parseFloat(value).toFixed(length)
    : Number.parseFloat(0).toFixed(length);
};
