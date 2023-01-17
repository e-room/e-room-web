import ReviewLayout from "components/review/ReviewLayout";
import ReviewForm1 from "components/review/ReviewForm1";

import Login from "../login";

export default function reviewWrite() {
  // useEffect(() => {
  //   if (!isLogin) {
  //     // TODO: 계정 인증 후 없으면 리다이렉트
  //     Router.push(`/login`);
  //   }
  // }, [isLogin]);

  // TODO: reviewform1, 2,,, 로직 개선

  return (
    <ReviewLayout>
      <ReviewForm1 />
    </ReviewLayout>
  );
}
