import axiosRequest from "utils/axiosRequest";
import { queryString } from "utils/queryString";

const host = process.env.NEXT_PUBLIC_API_HOST + "/building";

export const getBuildingById = (buildingId) => {
  const url = `${host}/${buildingId}`;
  return axiosRequest({
    method: "GET",
    url,
  });
};

export const getBuildingImagesById = (buildingId) => {
  const url = `${host}/${buildingId}/images`;
  return axiosRequest({
    method: "GET",
    url,
  });
};

export const getBuildingReviewById = (buildingId, params) => {
  const url = `${host}/${buildingId}/room/review${queryString(params)}`;
  return axiosRequest({
    method: "GET",
    url,
  });
};

export const getBuildings = (params) => {
  const url = `${host}${queryString(params)}`;
  return axiosRequest({
    method: "GET",
    url,
  });
};

export const removeReviewByReviewId = (reviewId) => {
  const url = `${host}/room/review/${reviewId}`;
  return axiosRequest({
    method: "DELETE",
    url,
  });
};

export const modifyLikeByReviewId = (reviewId) => {
  const url = `${host}/room/review/like/${reviewId}`;
  return axiosRequest({
    method: "PUT",
    url,
  });
};

export const getMarkingDetailDataByBuildingId = (buildingId) => {
  const url = `${host}/marking/detail/${buildingId}`;
  return axiosRequest({
    method: "GET",
    url,
  });
};

export const getSearch = (params) => {
  const url = `${host}/search${queryString(params)}`;
  return axiosRequest({
    method: "GET",
    url,
  });
};

export const addReview = (data) => {
  const url = `${host}/room/review`;
  return axiosRequest({
    method: "POST",
    url,
    data,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const getBestReviews = () => {
  const url = `${host}/room/review/bests`;
  return axiosRequest({
    method: "GET",
    url,
  });
};

export const getBuildingMarkerList = () => {
  const url = `${host}/marking`;
  return axiosRequest({
    method: "GET",
    url,
  });
};
