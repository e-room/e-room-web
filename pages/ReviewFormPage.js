import AppLayout from "../components/layout/AppLayout";
import Button from "../components/Button/Button";
import styled from "@emotion/styled";
import ReviewForm1 from "../components/ReviewForm1";
import ReviewForm2 from "../components/ReviewForm2";
import ReviewForm3 from "../components/ReviewForm3";
import ReviewForm4 from "../components/ReviewForm4";
import LoginPage from "./LoginPage";
import { useRecoilState, useRecoilValue } from "recoil";
import { isLoginState, reviewStepState } from "../states";

export default function ReviewFormPage() {
  const isLogin = useRecoilValue(isLoginState);
  const [reviewStep, setReviewStep] = useRecoilState(reviewStepState);

  if (!isLogin) {
    return <LoginPage />;
  }

  return (
    <AppLayout appBarObject={{ headerText: "리뷰 쓰기" }}>
      <Container>
        {reviewStep === 0 && <ReviewForm1 />}
        {reviewStep === 1 && <ReviewForm2 />}
        {reviewStep === 2 && <ReviewForm3 />}
        {reviewStep === 3 && <ReviewForm4 />}
      </Container>
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

const Container = styled.div``;
const BottomArea = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  position: fixed;
  bottom: 64px;

  button {
    margin: 0px 20px;
  }
`;
