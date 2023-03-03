import { useEffect, useMemo, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import axios from "axios";
import { useRouter } from "next/router";
import styled from "@emotion/styled";

import { Caption1Bold } from "styles/typography";
import Congraturation from "components/common/lottie/Congraturation";

import {
  reviewFormState,
  reviewImageListState,
  reviewSuccessToastState,
} from "states/reviewAtom";

import AppLayout from "components/common/AppLayout";
import BottomSheet from "components/common/atoms/BottomSheet";
import Button from "components/common/atoms/Button";
import imgCompress from "utils/imgCompress";
import calculateByReviewScore from "utils/calculateByReviewScore";
import valueCheck from "utils/valueCheck";
import Toast from "components/common/atoms/Toast";

export default function ReviewLayout({ children }) {
  const router = useRouter();
  const { index = "1" } = router.query;
  const [loading, setLoading] = useState(false);

  const reviewImageList = useRecoilValue(reviewImageListState);
  const setReviewSuccess = useSetRecoilState(reviewSuccessToastState);
  const [successBuildingId, setSuccessBuildingId] = useState(null);

  const [nextDisabled, setNextDisabled] = useState({
    1: true,
    2: true,
    3: true,
    4: true,
  });

  const [popupVisible, setPopupVisible] = useState(false);
  const formValue = useRecoilValue(reviewFormState);

  // TODO: validation 로직 수정 필요!!!
  useEffect(() => {
    if (index === "1") {
      let address = false;
      let reviewBaseDto = false;
      let reviewResidencePeriodDto = false;
      if (
        formValue.address["siDo"] &&
        // formValue.address["siGunGu"] &&
        formValue.address["eupMyeon"] &&
        formValue.address["roadName"] &&
        formValue.address["buildingNumber"]
      )
        address = true;

      if (
        formValue.reviewBaseDto["deposit"] &&
        formValue.reviewBaseDto["monthlyRent"] &&
        formValue.reviewBaseDto["managementFee"] &&
        formValue.reviewBaseDto["netLeasableArea"]
      )
        reviewBaseDto = true;

      if (
        formValue.reviewResidencePeriodDto["residenceStartYear"] &&
        formValue.reviewResidencePeriodDto["residenceDuration"]
      )
        reviewResidencePeriodDto = true;

      if (address && reviewBaseDto && reviewResidencePeriodDto) {
        setNextDisabled({ ...nextDisabled, [index]: false });
      } else {
        setNextDisabled({ ...nextDisabled, [index]: true });
      }
    } else if (index === "2") {
      let reviewScoreDto = false;
      if (
        formValue.reviewScoreDto["traffic"] &&
        formValue.reviewScoreDto["buildingComplex"] &&
        formValue.reviewScoreDto["surrounding"] &&
        formValue.reviewScoreDto["internal"] &&
        formValue.reviewScoreDto["livingLocation"]
      )
        reviewScoreDto = true;

      if (reviewScoreDto) {
        setNextDisabled({ ...nextDisabled, [index]: false });
      } else {
        setNextDisabled({ ...nextDisabled, [index]: true });
      }
    } else if (index === "3") {
      let keyword = false;
      let description = false;
      if (
        formValue.advantageKeywordList.length > 0 &&
        formValue.disadvantageKeywordList.length > 0
      )
        keyword = true;
      if (
        formValue.advantageDescription &&
        formValue.disadvantageDescription &&
        formValue.advantageDescription?.length >= 50 &&
        formValue.disadvantageDescription?.length >= 50
      )
        description = true;

      if (keyword && description) {
        setNextDisabled({ ...nextDisabled, [index]: false });
      } else {
        setNextDisabled({ ...nextDisabled, [index]: true });
      }
    }
  }, [formValue]);

  const goHome = () => {
    router.push(`/building/${successBuildingId}?returnType=/`);
  };

  const goNext = () => {
    router.push(`/review/write?index=${Number(index) + 1}`);
  };

  const onSubmit = async () => {
    setLoading(true);
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
          if (res.data.isFirstReview) {
            setSuccessBuildingId(res.data.buildingId);
            setPopupVisible(true);
          } else {
            setReviewSuccess(true);
            router.push(`/building/${res.data.buildingId}?returnType=/`);
          }
        })
        .catch((err) => {
          setErrorToastVisible(true);
        });
      setLoading(false);
    } catch (e) {}
  };

  const [errorToastVisible, setErrorToastVisible] = useState(false);
  const errorToast = useMemo(() => {
    return (
      <Toast
        icon={"exclamation-circle"}
        iconColor={"danger-1"}
        text={"하나의 건물에는 하나의 리뷰만 작성할 수 있어요."}
        visible={errorToastVisible}
      />
    );
  }, [errorToastVisible]);
  useEffect(() => {
    if (errorToastVisible) {
      setTimeout(() => {
        setErrorToastVisible(false);
      }, 3000);
    }
  }, [errorToastVisible]);

  return (
    <>
      {errorToast}
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
        <Congraturation />
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
            disabled={loading}
            useSubmit={true}
          />
        </BottomArea>
      ) : (
        <BottomArea>
          <Button
            label={"다음으로"}
            size="lg"
            width={"100%"}
            disabled={nextDisabled[index]}
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
