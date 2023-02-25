import { useEffect, useState } from "react";
import accessValid from "utils/accessValid";

import ReviewLayout from "components/review/ReviewLayout";
import ReviewForm1 from "components/review/ReviewForm1";
import ReviewForm2 from "components/review/ReviewForm2";
import ReviewForm3 from "components/review/ReviewForm3";
import ReviewForm4 from "components/review/ReviewForm4";
import Loading from "components/common/lottie/Loading";
import Error from "components/common/Error";
import { useResetRecoilState } from "recoil";
import { reviewFormState } from "states/reviewAtom";
import { useRouter } from "next/router";

export default function reviewWrite() {
  const router = useRouter();
  const { index } = router.query;

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const resetFormValue = useResetRecoilState(reviewFormState);

  const getData = async () => {
    const valid = await accessValid({ redirect_uri: `/review/write` });
    if (valid) {
      setLoading(false);
    } else {
      setLoading(false);
      setError(true);
    }
  };
  useEffect(() => {
    getData();
    return () => {
      resetFormValue();
    };
  }, []);

  const Form = () => {
    switch (index) {
      case "1":
        return <ReviewForm1 />;
      case "2":
        return <ReviewForm2 />;
      case "3":
        return <ReviewForm3 />;
      case "4":
        return <ReviewForm4 />;
      default:
        return <ReviewForm1 />;
    }
  };

  if (loading) return <Loading />;
  if (error) return <Error />;

  return <ReviewLayout>{Form()}</ReviewLayout>;
}
