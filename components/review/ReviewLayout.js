import { useState } from "react";
import { useRecoilValue } from "recoil";
import axios from "axios";
import { useRouter } from "next/router";
import styled from "@emotion/styled";

import { Caption1Bold } from "styles/typography";
import IllustFemale from "assets/illust/illust-female_evaluation.svg";

import { reviewFormState, reviewImageListState } from "states/reviewAtom";

import AppLayout from "components/common/AppLayout";
import BottomSheet from "components/common/atoms/BottomSheet";
import Button from "components/common/atoms/Button";
import imgCompress from "utils/imgCompress";
import calculateByReviewScore from "utils/calculateByReviewScore";
import valueCheck from "utils/valueCheck";

export default function ReviewLayout({ children }) {
  const router = useRouter();

  const reviewImageList = useRecoilValue(reviewImageListState);
  const { index = 1 } = router.query;

  const [popupVisible, setPopupVisible] = useState(false);
  const formValue = useRecoilValue(reviewFormState);

  const goHome = () => {
    router.push(`/`);
  };

  const goNext = () => {
    router.push(`/review/write?index=${Number(index) + 1}`);
  };

  const onSubmit = async () => {
    try {
      const totalScore = calculateByReviewScore(formValue);
      const formatFormValue = {
        ...formValue,
        reviewScoreDto: {
          ...formValue.reviewScoreDto,
          residenceSatisfaction: totalScore,
        },
      };

      const formData = new FormData();
      formData.append(
        "request",
        new Blob([JSON.stringify(formatFormValue)], {
          type: "application/json",
        })
      );
      for (let i = 0; i < reviewImageList.length; i++) {
        const compress = await imgCompress(reviewImageList[i].data);
        console.log("compress", compress);
        console.log("data", reviewImageList[i].data);
        formData.append("reviewImageList", compress, compress.name);
      }

      await axios({
        method: "post",
        url: `/apis/building/room/review`,
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
        .then((res) => {
          console.log("리뷰쓰기 성공", res);
          setPopupVisible(true);
        })
        .catch((err) => {
          console.log("리뷰쓰기 실패!", err);
        });
    } catch (e) {
      console.log("리뷰쓰기 실패", e.response.data);
    }
  };

  return (
    <>
      <AppLayout pageTitle={"리뷰 쓰기"} enabledNavbar={false}>
        <StepBar>
          <CurrentStep width={(index / 5) * 100} />
          <RemainingStep width={100 - (index / 5) * 100} />
        </StepBar>
        <div>{children}</div>
      </AppLayout>
      {/* AppLayout 바깥으로 뺀 이유는 z-index를 주기 위해 부모-자식 관계를 벗어나야 함 */}
      <BottomSheet
        title={"이제 모든 리뷰를 볼 수 있어요!"}
        onSubmit={goHome}
        buttonType={"confirm"}
        visible={popupVisible}
        submitLabel={"확인"}
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
          <Button
            label={"리뷰 등록하기"}
            size="lg"
            width={"100%"}
            onClick={onSubmit}
            useSubmit={true}
          />
        </BottomArea>
      ) : (
        <BottomArea>
          <Button
            label={"다음으로"}
            size="lg"
            width={"100%"}
            onClick={goNext}
          />
        </BottomArea>
      )}
    </>
  );
}

const StepBar = styled.div`
  display: flex;
  position: fixed;
  top: 44px;
  left: 0;
  z-index: 11;
  width: 100%;
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
  bottom: 8px;

  button {
    margin: 0px 20px;
  }
`;

const Description = styled.div`
  ${Caption1Bold}
  color: var(--black);
  text-align: center;
`;
