import { useRouter } from "next/router";
import ReviewForm1 from "components/review/ReviewForm1";
import ReviewForm2 from "components/review/ReviewForm2";
import ReviewForm3 from "components/review/ReviewForm3";
import ReviewForm4 from "components/review/ReviewForm4";
import ReviewLayout from "components/review/ReviewLayout";

export default () => {
  const router = useRouter();
  const { index } = router.query;

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
        return null;
    }
  };

  return <ReviewLayout>{Form()}</ReviewLayout>;
};
