import { useEffect, useState } from "react";
import accessValid from "utils/accessValid";

import ReviewLayout from "components/review/ReviewLayout";
import ReviewForm1 from "components/review/ReviewForm1";
import Loading from "components/common/Loading";
import Error from "components/common/Error";

export default function reviewWrite() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const getData = async () => {
    const valid = await accessValid({ redirect_uri: `/review/write` });
    if (valid) {
      setLoading(false);
    } else {
      setError(true);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  if (loading) return <Loading />;
  if (error) return <Error />;

  // TODO: reviewform1, 2,,, 로직 개선
  return (
    <ReviewLayout>
      <ReviewForm1 />
    </ReviewLayout>
  );
}
