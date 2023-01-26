import ReviewLayout from "components/review/ReviewLayout";
import ReviewForm1 from "components/review/ReviewForm1";
import { getCookie } from "cookies-next";

import { useEffect } from "react";
import Router from "next/router";

export default function reviewWrite() {
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
