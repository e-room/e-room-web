import axiosRequest from "utils/axiosRequest";

export const getIsValid = () => {
  const url = `${process.env.NEXT_PUBLIC_API_HOST}/token/valid`;
  return axiosRequest({
    method: "GET",
    url,
  });
};

export const logout = () => {
  const url = `${process.env.NEXT_PUBLIC_API_HOST}/logout`;
  return axiosRequest({
    method: "GET",
    url,
    headers: { withCredentials: true },
  });
};
