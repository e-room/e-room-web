import styled from "@emotion/styled";
import axios from "axios";
import Icon from "components/common/atoms/Icon";
import { Caption1 } from "styles/typography";

export default ({ value, isLike, setIsLike }) => {
  const reviewId = value.baseReviewDto.reviewId;

  const onLike = async () => {
    await axios
      .put(`/apis/building/room/review/like/${reviewId}`)
      .then((response) => {
        console.log("onLike success", response.data);
      })
      .catch((error) => {
        console.log("onLike failed", error);
      });
  };

  return (
    <LikeField favorite={isLike}>
      <div style={{ display: "flex" }} onClick={() => onLike()}>
        <Icon icon={"thumb-stroke"} size={"sm"} />
        <div className="text">
          추천{" "}
          {isLike
            ? value.baseReviewDto.reviewLikeCnt + 1
            : value.baseReviewDto.reviewLikeCnt}
          개
        </div>
      </div>
    </LikeField>
  );
};

const LikeField = styled.div`
  display: flex;
  margin-top: 24px;
  justify-content: flex-end;
  align-items: center;

  ${Caption1}
  color: ${(p) => (p.favorite ? `var(--primary-1)` : `var(--gray-1)`)};
  svg {
    fill: ${(p) => (p.favorite ? `var(--primary-1)` : `var(--gray-1)`)};
  }

  .text {
    margin-left: 5px;
  }
`;
