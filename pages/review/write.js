import ReviewLayout from "components/review/ReviewLayout";
import ReviewForm1 from "components/review/ReviewForm1";

import { useEffect } from "react";
import accessValid from "utils/accessValid";

export default function reviewWrite() {
  useEffect(() => {
    accessValid({ redirect_uri: `review/write` });
  }, []);

  // TODO: reviewform1, 2,,, 로직 개선
  return (
    <ReviewLayout>
      <ReviewForm1 />
    </ReviewLayout>
  );
}
