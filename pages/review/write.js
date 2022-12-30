import AppLayout from "components/common/AppLayout";
import Button from "components/common/atoms/Button";
import styled from "@emotion/styled";
import ReviewForm1 from "components/review/ReviewForm1";
import ReviewForm2 from "components/review/ReviewForm2";
import ReviewForm3 from "components/review/ReviewForm3";
import ReviewForm4 from "components/review/ReviewForm4";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { useEffect, useMemo, useState } from "react";
import BottomSheet from "components/common/atoms/BottomSheet";
import { loginState } from "states/authAtom";
import { keyframes } from "@emotion/react";
import { pageTitleState } from "states";
import Router from "next/router";
import Login from "../login";
import { reviewFormState, reviewStepState } from "states/reviewAtom";
import IllustFemale from "assets/illust/illust-female_evaluation.svg";
import { Caption1Bold } from "styles/typography";

export default function reviewWrite() {
  const { status: isLogin } = useRecoilValue(loginState);
  const setPageTitleState = useSetRecoilState(pageTitleState);
  const [formValue, setFormValue] = useRecoilState(reviewFormState);
  // const router = useRouter();

  const [reviewStep, setReviewStep] = useRecoilState(reviewStepState);
  const [popupVisible, setPopupVisible] = useState(false);
  const onHideClick = () => {
    setPopupVisible(false);
  };

  const onNextButtonClick = () => {
    if (reviewStep === 4) {
      setPopupVisible(true);
    } else if (reviewStep === 2) {
      const traffic = formValue.reviewScoreDto.traffic;
      const buildingComplex = formValue.reviewScoreDto.buildingComplex;
      const surrounding = formValue.reviewScoreDto.surrounding;
      const internal = formValue.reviewScoreDto.internal;
      const livingLocation = formValue.reviewScoreDto.livingLocation;

      const totalScore =
        (traffic + buildingComplex + surrounding + internal + livingLocation) /
        5;

      setFormValue({
        ...formValue,
        reviewScoreDto: {
          ...formValue.reviewScoreDto,
          residenceSatisfaction: totalScore,
        },
      });
      setReviewStep(reviewStep + 1);
    } else {
      setReviewStep(reviewStep + 1);
    }
  };

  const Form = useMemo(() => {
    switch (reviewStep) {
      case 1:
        return <ReviewForm1 />;
      case 2:
        return <ReviewForm2 />;
      case 3:
        return <ReviewForm3 />;
      case 4:
        return <ReviewForm4 />;
      default:
        return;
    }
  }, [reviewStep]);

  const onSubmit = () => {
    console.log("리뷰 등록", formValue);
  };

  useEffect(() => {
    setPageTitleState("리뷰 쓰기");
    setReviewStep(1);
  }, []);

  if (!isLogin) {
    // Router.push(`/login`);
    // return <Login />;
    // return router.push("/login"); // TODO: 이거 왜 라우트 안되지?
  }

  return (
    <>
      <AppLayout>
        <Container>
          <StepBar>
            <CurrentStep width={(reviewStep / 5) * 100} />
            <RemainingStep width={100 - (reviewStep / 5) * 100} />
          </StepBar>
          <FadeInUpBox>{Form}</FadeInUpBox>
        </Container>
      </AppLayout>
      {/* AppLayout 바깥으로 뺀 이유는 z-index를 주기 위해 부모-자식 관계를 벗어나야 함 */}
      {popupVisible ? (
        <BottomSheet
          title={"이제 모든 리뷰를 볼 수 있어요!"}
          onHideClick={onHideClick}
          onSubmit={onSubmit}
          buttonType={"confirm"}
        >
          <IllustFemale />
          <Description>
            첫 리뷰를 잘 등록했어요.
            <br />
            이제 다른 사람들의 리뷰를 모두 볼 수 있어요!
          </Description>
        </BottomSheet>
      ) : (
        <BottomArea>
          <Button
            label={"다음으로"}
            size="lg"
            width={"100%"}
            onClick={onNextButtonClick}
          />
        </BottomArea>
      )}
    </>
  );
}

const fadeInUp = keyframes`
from {
  opacity: 0;
  transform: translate3d(0, 100%, 0);
}
to {
  opacity: 1;
  transform: translateZ(0);
}
`;

const FadeInUpBox = styled.div`
  bottom: 0;
  animation: ${fadeInUp} 1s;
`;

const Container = styled.div`
  height: calc(100vh - 112px);
  overflow: scroll;
`;
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

const Description = styled.div`
  ${Caption1Bold}
  color: var(--black);
  text-align: center;
`;
