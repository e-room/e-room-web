import Router from "next/router";
import { getIsValid } from "services/auth.service";

// TODO: redirect_uri 받는거 로직 수정필요. (빼야함)
const accessValid = async ({ redirect_uri }) => {
  try {
    const response = await getIsValid();
    if (!response.data || !response.data.isValid) {
      const pathname = Router.router.state.pathname;
      // Router.push(`/login?redirect_uri=${redirect_uri ?? pathname}`);
      return false;
    } else {
      return true;
    }
  } catch (e) {
    return false;
  }
};

export default accessValid;
