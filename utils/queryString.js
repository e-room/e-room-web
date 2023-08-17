export const queryString = (object) => {
  let params = "?";

  for (const [key, value] of Object.entries(object)) {
    params += `${key}=${value}&`;
  }

  return params.slice(0, -1);
};
