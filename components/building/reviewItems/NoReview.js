import { Caption1Bold, SubTitle1 } from "styles/typography";
import styled from "@emotion/styled";
import Button from "components/common/atoms/Button";

export default ({ goReviewWrite }) => {
  return (
    <NoReview.container>
      <NoReview.title>아직 리뷰가 없어요</NoReview.title>
      <NoReview.subTitle>
        이 집에 살았던 경험이 있다면 리뷰를 써주세요!
        <br />
        회원님의 소중한 리뷰가 모두에게 큰 도움이 됩니다.
      </NoReview.subTitle>
      <Button
        type={"primary"}
        size={"md"}
        icon={"plus"}
        onClick={goReviewWrite}
      >
        이 자취방 리뷰 쓰기
      </Button>
    </NoReview.container>
  );
};

const NoReview = {
  container: styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    margin-top: 40px;
  `,
  title: styled.div`
    ${SubTitle1}
    color: var(--black);
    margin-bottom: 12px;
  `,
  subTitle: styled.div`
    ${Caption1Bold}
    color: var(--gray-3);
    margin-bottom: 20px;
  `,
};
