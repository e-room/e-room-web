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
import axios from "axios";

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
      // 총 만족도 TODO: 임시로 계산해서 넣어주기(백엔드에서 뺄때까지)
      const traffic = formValue.reviewScoreDto.traffic;
      const buildingComplex = formValue.reviewScoreDto.buildingComplex;
      const surrounding = formValue.reviewScoreDto.surrounding;
      const internal = formValue.reviewScoreDto.internal;
      const livingLocation = formValue.reviewScoreDto.livingLocation;

      const totalScore =
        (traffic + buildingComplex + surrounding + internal + livingLocation) / 5;

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

  const onSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append("request", JSON.stringify(formValue));
      formValue.reviewImageList.forEach((file) => {
        formData.append("reviewImages", file.data);
      });

      await axios
        .post(
          `${process.env.NEXT_PUBLIC_API_HOST}/building/room/review`,
          formData,
          config
        )
        .then((response) => {
          console.log("리뷰쓰기 성공", response);
        });
    } catch (e) {
      console.log("리뷰쓰기 실패", e);
    }
  };

  useEffect(() => {
    setPageTitleState("리뷰 쓰기");
    setReviewStep(1);
  }, []);

  // useEffect(() => {
  //   if (!isLogin) {
  //     // TODO: 계정 인증 후 없으면 리다이렉트
  //     Router.push(`/login`);
  //   }
  // }, [isLogin]);

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
      <BottomSheet
        title={"이제 모든 리뷰를 볼 수 있어요!"}
        onHideClick={onHideClick}
        onSubmit={onSubmit}
        buttonType={"confirm"}
        visible={popupVisible}
      >
        <IllustFemale />
        <Description>
          첫 리뷰를 잘 등록했어요.
          <br />
          이제 다른 사람들의 리뷰를 모두 볼 수 있어요!
        </Description>
      </BottomSheet>

      {popupVisible ? null : (
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
  transform: translateY(40px);
}
to {
  opacity: 1;
  transform: translateY(0);
}
`;

const FadeInUpBox = styled.div`
  /* animation: ${fadeInUp} 0.56s ease-in-out; */
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
