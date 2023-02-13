import { useState } from "react";
import { useSetRecoilState } from "recoil";
import axios from "axios";

import styled from "@emotion/styled";

import { Body1Bold } from "styles/typography";
import accessValid from "utils/accessValid";
import { imageViewState } from "states/buidlingAtom";

import DeletePopup from "./reviewItems/DeletePopup";
import DetailScorePopup from "./reviewItems/DetailScorePopup";
import ReviewInfo from "./reviewItems/ReviewInfo";
import LikeField from "./reviewItems/LikeField";
import AuthorInfo from "./reviewItems/AuthorInfo";
import ImageField from "./reviewItems/ImageField";
import { dummyImages } from "./ImageView";

export default function ReviewList({ data, buildingId }) {
  console.log("review", data);
  const Reviews = data;

  const [showConfirmDelete, setShowConfirmDelete] = useState(false);

  const setShowDetail = useSetRecoilState(imageViewState);
  const [isLike, setIsLike] = useState(false);

  const onDetailView = () => setShowDetail(true);

  const [defaultValue, setDefaultValue] = useState({});
  const [showTotalScore, setShowTotalScore] = useState(false);

  const onScorePopup = (value) => {
    setDefaultValue(value);
    setShowTotalScore(true);
  };

  const onDeletePopup = async (value) => {
    const valid = await accessValid({
      redirect_uri: `/building/${buildingId}`,
    });
    setDefaultValue(value);
    if (valid) {
      setShowConfirmDelete(true);
    }
  };

  // const getReviewImages = async (reviewId) => {
  //   const response = await axios.get(
  //     `${process.env.NEXT_PUBLIC_API_HOST}/review/${reviewId}/images`,
  //     {
  //       headers: {
  //         mocking: 239,
  //       },
  //     }
  //   );
  // };

  return (
    <Container>
      <Title>실제 거주 후기</Title>
      <div>
        {showConfirmDelete && (
          <DeletePopup
            reviewId={defaultValue.baseReviewDto.reviewId}
            showConfirmDelete={showConfirmDelete}
            setShowConfirmDelete={setShowConfirmDelete}
          />
        )}
        {showTotalScore && (
          <DetailScorePopup
            value={defaultValue}
            showTotalScore={showTotalScore}
            setShowTotalScore={setShowTotalScore}
          />
        )}
        {Reviews.content.map((value) => {
          // const images = getReviewImages(reviewId);
          return (
            <Item key={value.baseReviewDto.reviewId}>
              <AuthorInfo
                value={value}
                onScorePopup={onScorePopup}
                onDeletePopup={onDeletePopup}
              />
              <ReviewInfo value={value} />
              <ImageField images={dummyImages} onDetailView={onDetailView} />
              <LikeField value={value} isLike={isLike} setIsLike={setIsLike} />
            </Item>
          );
        })}
      </div>
    </Container>
  );
}

const Container = styled.div`
  padding: 12px 20px 170px 20px;
  background: #fafafa;
`;

const Title = styled.div`
  ${Body1Bold}

  color: var(--black);
  margin-bottom: 12px;
`;

const Item = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;

  background: var(--white);
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 12px;
`;
