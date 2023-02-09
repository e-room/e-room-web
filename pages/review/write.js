import ReviewLayout from "components/review/ReviewLayout";
import ReviewForm1 from "components/review/ReviewForm1";
import { getCookie } from "cookies-next";

import { useEffect } from "react";
import Router from "next/router";
import axios from "axios";

export default function reviewWrite() {
  useEffect(() => {
    const accessResponse = axios.get(`/apis/token/valid`);
    if (!accessResponse.data || !accessResponse.data.isValid) {
      console.log("로그인을 해주세요.");
    }
  }, []);

  // useEffect(() => {
  //   if (!getCookie("accessToken")) {
  //     // TODO: 계정 인증 후 없으면 리다이렉트
  //     Router.push(`/login`);
  //   }
  // }, [getCookie("accessToken")]);

  // TODO: reviewform1, 2,,, 로직 개선
  return (
    <ReviewLayout>
      <ReviewForm1 />
    </ReviewLayout>
  );
}
