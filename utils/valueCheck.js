export default (data) => {
  if (typeof data === "object") {
    for (const [key, value] of Object.entries(data)) {
      if (!value) return false;
      else return true;
    }
  }
  if (Array.isArray(data)) {
  }
};
