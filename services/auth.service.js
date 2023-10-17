import axiosRequest from "utils/axiosRequest";

export const getIsValid = () => {
  const url = `/api/token/valid`;
  return axiosRequest({
    method: "GET",
    url,
    headers: { withCredentials: true },
  });
};

export const logout = () => {
  const url = `/api/logout`;
  return axiosRequest({
    method: "GET",
    url,
    headers: { withCredentials: true },
  });
};
