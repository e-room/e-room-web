import { useEffect, useState } from "react";
import accessValid from "utils/accessValid";

import ReviewLayout from "components/review/ReviewLayout";
import Step1 from "components/review/Step1";
import Step2 from "components/review/Step2";
import Step3 from "components/review/Step3";
import Step4 from "components/review/Step4";
import Loading from "components/common/lottie/Loading";
import Error from "components/common/Error";
import { useResetRecoilState } from "recoil";
import { reviewFormState, reviewImageListState } from "states/reviewAtom";
import { useRouter } from "next/router";
import NeedLogin from "components/common/NeedLogin";

export default function reviewWrite() {
  const router = useRouter();
  const { index } = router.query;

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [need, setNeed] = useState(false);
  const resetFormValue = useResetRecoilState(reviewFormState);
  const resetImageValues = useResetRecoilState(reviewImageListState);

  const getData = async () => {
    try {
      const valid = await accessValid({ redirect_uri: `/review/write` });
      if (!valid) {
        return setNeed(true);
      }
      if (valid) {
        setLoading(false);
      }
    } catch (e) {
      setError(true);
    }
  };
  useEffect(() => {
    getData();
    return () => {
      resetFormValue();
      resetImageValues();
    };
  }, []);

  const Form = () => {
    switch (index) {
      case "1":
        return <Step1 />;
      case "2":
        return <Step2 />;
      case "3":
        return <Step3 />;
      case "4":
        return <Step4 />;
      default:
        return <Step1 />;
    }
  };

  if (need)
    return <NeedLogin visible={need} setVisible={setNeed} useBack={true} />;

  if (loading) return <Loading />;
  if (error) return <Error />;

  return <ReviewLayout>{Form()}</ReviewLayout>;
}
