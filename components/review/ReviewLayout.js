import { useEffect, useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import styled from "@emotion/styled";

import { Caption1Bold } from "styles/typography";
import IllustFemale from "assets/illust/illust-female_evaluation.svg";

import { pageTitleState } from "states";
import { reviewFormState } from "states/reviewAtom";

import AppLayout from "components/common/AppLayout";
import BottomSheet from "components/common/atoms/BottomSheet";
import Button from "components/common/atoms/Button";

export default function ReviewLayout({ children }) {
  const router = useRouter();
  const { index = 1 } = router.query;

  const [popupVisible, setPopupVisible] = useState(false);
  const setPageTitleState = useSetRecoilState(pageTitleState);
  const [formValue, setFormValue] = useRecoilState(reviewFormState);

  const onHideClick = () => {
    setPopupVisible(false);
  };
  const onSubmit = async () => {
    try {
      // TODO: totalScore 계산해서 넣기

      // const traffic = formValue.reviewScoreDto.traffic;
      // const buildingComplex = formValue.reviewScoreDto.buildingComplex;
      // const surrounding = formValue.reviewScoreDto.surrounding;
      // const internal = formValue.reviewScoreDto.internal;
      // const livingLocation = formValue.reviewScoreDto.livingLocation;

      // const totalScore =
      //   (traffic + buildingComplex + surrounding + internal + livingLocation) / 5;

      // setFormValue({
      //   ...formValue,
      //   reviewScoreDto: {
      //     ...formValue.reviewScoreDto,
      //     residenceSatisfaction: totalScore,
      //   },
      // });

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
    setPopupVisible(true);
  };
  useEffect(() => {
    setPageTitleState("리뷰 쓰기");
  }, []);

  return (
    <>
      <AppLayout>
        <Container>
          <StepBar>
            <CurrentStep width={(index / 5) * 100} />
            <RemainingStep width={100 - (index / 5) * 100} />
          </StepBar>
          <div>{children}</div>
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

      {index === "4" ? (
        <BottomArea>
          <Button label={"리뷰 등록하기"} size="lg" width={"100%"} onClick={onSubmit} />
        </BottomArea>
      ) : (
        <BottomArea>
          <Link href={`/review/write/${Number(index) + 1}`}>
            <Button label={"다음으로"} size="lg" width={"100%"} />
          </Link>
        </BottomArea>
      )}
    </>
  );
}

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
