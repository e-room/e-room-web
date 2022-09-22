import AppLayout from "../components/common/AppLayout";
import Button from "../components/common/atoms/Button";
import styled from "@emotion/styled";
import ReviewForm1 from "../components/review/ReviewForm1";
import ReviewForm2 from "../components/review/ReviewForm2";
import ReviewForm3 from "../components/review/ReviewForm3";
import ReviewForm4 from "../components/review/ReviewForm4";
import LoginPage from "./LoginPage";
import { useRecoilState, useRecoilValue } from "recoil";
import { isLoginState } from "../states";
import { reviewStepState } from "../states/reviewFormAtom";
import { useState } from "react";
import BottomPopup from "../components/common/atoms/BottomPopup";

export default function ReviewFormPage() {
  const isLogin = useRecoilValue(isLoginState);
  const [reviewStep, setReviewStep] = useRecoilState(reviewStepState);
  const [popupVisible, setPopupVisible] = useState(false);
  const onHideClick = () => {
    setPopupVisible(false);
  };

  if (!isLogin) {
    return <LoginPage />;
  }

  const onNextButtonClick = () => {
    if (reviewStep === 4) {
      setPopupVisible(true);
    } else {
      setReviewStep(reviewStep + 1);
    }
  };

  return (
    <>
      <AppLayout appBarObject={{ headerText: "리뷰 쓰기" }}>
        <Container>
          <StepBar>
            <CurrentStep width={(reviewStep / 5) * 100} />
            <RemainingStep width={100 - (reviewStep / 5) * 100} />
          </StepBar>

          {reviewStep === 1 && <ReviewForm1 />}
          {reviewStep === 2 && <ReviewForm2 />}
          {reviewStep === 3 && <ReviewForm3 />}
          {reviewStep === 4 && <ReviewForm4 />}
        </Container>
      </AppLayout>
      {/* AppLayout 바깥으로 뺀 이유는 z-index를 주기 위해 부모-자식 관계를 벗어나야 함 */}
      {popupVisible ? (
        <BottomPopup
          title={"회원님이 생각하는 이 자취방의 총 만족도는?"}
          subTitle={"3.5점"}
          onHideClick={onHideClick}
        />
      ) : (
        <BottomArea>
          <Button
            label={"다음으로"}
            size="md"
            width={"100%"}
            onClick={onNextButtonClick}
          />
        </BottomArea>
      )}
    </>
  );
}

const Container = styled.div``;
const StepBar = styled.div`
  display: flex;
`;
const CurrentStep = styled.div`
  height: 4px;
  background: var(--primary-1);
  width: ${({ width }) => `${width}%`};
`;
const RemainingStep = styled.div`
  height: 4px;
  background: var(--primary-5);
  width: ${({ width }) => `${width}%`};
`;
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
