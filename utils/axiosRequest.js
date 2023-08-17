import axios from "axios";

export default async function axiosRequest({
  method,
  url,
  data,
  token,
  headers = {},
}) {
  const header = { ...headers };
  if (token) header["authorization"] = `Bearer ${token}`;

  switch (method) {
    case "GET":
      return axiosGet(url, header);
    case "POST":
      return axiosPost(url, data, header);
    case "PATCH":
      return axiosPatch(url, data, header);
    case "PUT":
      return axiosPut(url, data, header);
    case "DELETE":
      return axiosDelete(url, data, header);
    default:
      throw new Error("Unidentified method.");
  }
}

const axiosGet = (url, headers) => {
  return axios.get(url, { headers });
};
const axiosPost = (url, data, headers) => {
  return axios.post(url, data, {
    headers,
  });
};
const axiosPatch = (url, data, headers) => {
  return axios.patch(url, data, {
    headers,
  });
};
const axiosPut = (url, data, headers) => {
  return axios.put(url, data, {
    headers,
  });
};
const axiosDelete = (url, data, headers) => {
  return axios.delete(url, {
    headers,
    data,
  });
};
