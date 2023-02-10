import axios from "axios";
import Router from "next/router";

// TODO: redirect_uri 받는거 로직 수정필요. (빼야함)
const accessValid = async ({ redirect_uri }) => {
  const response = await axios.get(`/apis/token/valid`);
  if (!response.data || !response.data.isValid) {
    const pathname = Router.router.state.pathname;
    return Router.push(`/login?redirect_uri=${redirect_uri ?? pathname}`);
  } else {
    return true;
  }
};

export default accessValid;
