import AppLayout from "../components/layout/AppLayout";
import Button from "../components/Button/Button";
import styled from "@emotion/styled";
import ReviewForm1 from "../components/ReviewForm1";
import ReviewForm2 from "../components/ReviewForm2";
import ReviewForm3 from "../components/ReviewForm3";
import ReviewForm4 from "../components/ReviewForm4";
import { GlobalContext } from "./_app";
import { useContext } from "react";

export default function ReviewFormPage() {
  const { reviewStep, setReviewStep } = useContext(GlobalContext);
  return (
    <AppLayout>
      {reviewStep === 0 && <ReviewForm1 />}
      {reviewStep === 1 && <ReviewForm2 />}
      {reviewStep === 2 && <ReviewForm3 />}
      {reviewStep === 3 && <ReviewForm4 />}
      <BottomArea>
        <Button
          label={"다음으로"}
          size="md"
          width={"100%"}
          onClick={() => setReviewStep(reviewStep + 1)}
        />
      </BottomArea>
    </AppLayout>
  );
}

const BottomArea = styled.div`
  margin: 0px 20px;
`;
