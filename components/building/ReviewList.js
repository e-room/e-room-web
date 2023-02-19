import { useState } from "react";
import { useSetRecoilState } from "recoil";

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

export default function ReviewList({ data, buildingId }) {
  const [Reviews, setReviews] = useState(data);

  const [showConfirmDelete, setShowConfirmDelete] = useState(false);

  const setShowDetail = useSetRecoilState(imageViewState);

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

  return (
    <Container>
      <Title>실제 거주 후기</Title>
      <div>
        {showConfirmDelete && (
          <DeletePopup
            Reviews={Reviews}
            setReviews={setReviews}
            reviewId={defaultValue.reviewBaseDto.reviewId}
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
          return (
            <Item key={value.reviewBaseDto.reviewId}>
              <AuthorInfo
                value={value}
                onScorePopup={onScorePopup}
                onDeletePopup={onDeletePopup}
              />
              <ReviewInfo value={value} />
              {value.reviewImageListDto.reviewImageList && (
                <ImageField
                  images={value.reviewImageListDto.reviewImageList}
                  onDetailView={onDetailView}
                />
              )}
              <LikeField value={value} />
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
