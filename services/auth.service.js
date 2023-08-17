import axiosRequest from "utils/axiosRequest";

export const getIsValid = () => {
  const url = `/apis/token/valid`;
  return axiosRequest({
    method: "GET",
    url,
  });
};

export const logout = () => {
  const url = `/apis/logout`;
  return axiosRequest({
    method: "GET",
    url,
    headers: { withCredentials: true },
  });
};
