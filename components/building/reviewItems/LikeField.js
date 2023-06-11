import axios from "axios";
import Icon from "components/common/atoms/Icon";
import NeedLogin from "components/common/NeedLogin";
import { useState } from "react";
import accessValid from "utils/accessValid";

export default ({ value, buildingId }) => {
  const [isLike, setIsLike] = useState(value.isLiked);
  const [addLikeCnt, setAddLikeCnt] = useState(
    value.reviewBaseDto.reviewLikeCnt
  );
  const reviewId = value.reviewBaseDto.reviewId;
  const [need, setNeed] = useState(false);
  const onLike = async () => {
    const valid = await accessValid({
      redirect_uri: `/building/${buildingId}`,
    });
    if (!valid) {
      return setNeed(true);
    }
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
        });
    }
  };

  return (
    <div className="flex mt-[24px] justify-end items-center">
      {need && <NeedLogin visible={need} setVisible={setNeed} />}
      <div
        style={{ display: "flex", alignItems: "center" }}
        onClick={() => onLike()}
        className="cursor-pointer"
      >
        <Icon
          icon={"thumb-stroke"}
          size={"sm"}
          fill={isLike ? "fill-primary-1" : "fill-gray-1"}
        />
        <div
          className={`ml-[5px] text-caption-1 ${
            isLike ? "text-primary-1" : "text-gray-1"
          }`}
        >
          추천 {addLikeCnt}개
        </div>
      </div>
    </div>
  );
};
