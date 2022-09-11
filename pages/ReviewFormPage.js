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
import { useState } from "react";
import Popup from "../components/Popup";

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
    if (reviewStep === 3) {
      setPopupVisible(true);
    } else {
      setReviewStep(reviewStep + 1);
    }
  };

  return (
    <>
      <AppLayout appBarObject={{ headerText: "리뷰 쓰기" }}>
        <Container>
          {reviewStep === 0 && <ReviewForm1 />}
          {reviewStep === 1 && <ReviewForm2 />}
          {reviewStep === 2 && <ReviewForm3 />}
          {reviewStep === 3 && <ReviewForm4 />}
        </Container>
      </AppLayout>
      {/* AppLayout 바깥으로 뺀 이유는 z-index를 주기 위해 부모-자식 관계를 벗어나야 함 */}
      {popupVisible ? (
        <Popup
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
            // onClick={() => setReviewStep(reviewStep + 1)}
          />
        </BottomArea>
      )}
    </>
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
