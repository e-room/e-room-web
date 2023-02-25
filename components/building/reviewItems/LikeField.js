import styled from "@emotion/styled";
import axios from "axios";
import Icon from "components/common/atoms/Icon";
import { useState } from "react";
import { Caption1 } from "styles/typography";
import accessValid from "utils/accessValid";

export default ({ value, buildingId }) => {
  const [isLike, setIsLike] = useState(value.isLiked);
  const [addLikeCnt, setAddLikeCnt] = useState(
    value.reviewBaseDto.reviewLikeCnt
  );
  const reviewId = value.reviewBaseDto.reviewId;
  const onLike = async () => {
    const valid = await accessValid({
      redirect_uri: `/building/${buildingId}`,
    });
    if (valid) {
      await axios
        .put(`/apis/building/room/review/like/${reviewId}`)
        .then((response) => {
          if (response.data.reviewLikeStatus === "LIKED") {
            setIsLike(true);
            setAddLikeCnt(addLikeCnt + 1);
          } else {
            setIsLike(false);
            setAddLikeCnt(addLikeCnt - 1);
          }
        })
        .catch((error) => {
          console.log("onLike failed", error);
        });
    }
  };

  return (
    <LikeField favorite={isLike}>
      <div
        style={{ display: "flex" }}
        onClick={() => onLike()}
        className="cursor-pointer"
      >
        <Icon icon={"thumb-stroke"} size={"sm"} />
        <div className="text">추천 {addLikeCnt}개</div>
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
