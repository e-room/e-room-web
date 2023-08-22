import axiosRequest from "utils/axiosRequest";
import { queryString } from "utils/queryString";

const host = process.env.NEXT_PUBLIC_API_HOST + "/member";

export const cancelFavoriteByBuildingId = (buildingId) => {
  const url = `${host}/favorite/${buildingId}`;
  return axiosRequest({
    method: "DELETE",
    url,
  });
};

export const addFavoriteByBuildingId = (buildingId) => {
  const url = `${host}/favorite/${buildingId}`;
  return axiosRequest({
    method: "POST",
    url,
  });
};

export const getProfile = () => {
  const url = `${host}/profile`;
  return axiosRequest({
    method: "GET",
    url,
    headers: { withCredentials: true },
  });
};

export const getFavorites = (params) => {
  const url = `${host}/favorite${queryString(params)}`;
  return axiosRequest({
    method: "GET",
    url,
  });
};

export const getFavoriteData = () => {
  const url = `${host}/favorite`;
  return axiosRequest({
    method: "GET",
    url,
  });
};

export const deleteMember = () => {
  const url = `${host}/exit`;
  return axiosRequest({
    method: "DELETE",
    url,
    headers: { withCredentials: true },
  });
};
