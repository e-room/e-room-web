import { useEffect, useState } from "react";
import Router from "next/router";

import styled from "@emotion/styled";

import { Body1Bold, Caption1Bold, SubTitle1 } from "styles/typography";
import accessValid from "utils/accessValid";
import logEvent from "amplitude/logEvent";

import DeletePopup from "./reviewItems/DeletePopup";
import DetailScorePopup from "./reviewItems/DetailScorePopup";
import ReviewInfo from "./reviewItems/ReviewInfo";
import LikeField from "./reviewItems/LikeField";
import AuthorInfo from "./reviewItems/AuthorInfo";
import ImageField from "./reviewItems/ImageField";
import axios from "axios";
import Slider from "./Slider";
import Button from "components/common/atoms/Button";

export default function ReviewList(props) {
  const { reviews, buildingId, needToBlur = true, profile } = props;

  const [data, setData] = useState(reviews);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [showImages, setShowImages] = useState({
    visible: false,
    uuid: null,
    data: [],
    authorName: "",
  });

  const onCloseImg = () => {
    setShowImages({ visible: false, uuid: null, data: [], authorName: "" });
  };
  const onDetailView = (id, data, authorName) => {
    setShowImages({
      visible: true,
      uuid: id,
      data: data,
      authorName: authorName,
    });
  };

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

  const [target, setTarget] = useState(null);
  const [state, setState] = useState({
    item: data,
    isLoading: false,
  });
  const lastData = data[data.length - 1];
  let cursorId = lastData.reviewBaseDto.reviewId;

  const fetchItems = async () => {
    if (!cursorId) return;

    const response = await axios.get(
      `/apis/building/${buildingId}/room/review?size=4&sort=id,DESC&cursorIds=${cursorId}`
    );

    const responseContent = response.data.reviewSlicedList.content;
    const nextItem = needToBlur ? null : responseContent;
    const lastItem = responseContent[responseContent.length - 1];

    cursorId = lastItem ? lastItem.reviewBaseDto.reviewId : null;

    if (!nextItem || nextItem?.length < 1) return;

    setState((prev) => ({
      ...prev,
      isLoading: true,
    }));
    setState((prev) => ({
      item: [...prev.item, ...nextItem],
      isLoading: false,
    }));
  };
  useEffect(() => {
    let observer;
    if (target && cursorId) {
      observer = new IntersectionObserver(
        async ([entry], observer) => {
          if (entry.isIntersecting && cursorId) {
            observer.unobserve(entry.target);
            await fetchItems();
            observer.observe(entry.target);
          }
        },
        { threshold: 1 }
      );
      observer.observe(target);
    }
    return () => observer && observer.disconnect();
  }, [target, cursorId]);

  const { item, isLoading } = state;

  return (
    <Container>
      <Title>실제 거주 후기</Title>
      <div>
        {showImages.visible && (
          <Slider
            data={showImages.data}
            onClose={onCloseImg}
            defaultId={showImages.uuid}
            authorName={showImages.authorName}
          />
        )}
        {showConfirmDelete && (
          <DeletePopup
            state={state}
            setState={setState}
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

        {item.map((value, index) => {
          if (needToBlur && index > 1) return;

          return (
            <Item key={value.reviewBaseDto.reviewId}>
              <AuthorInfo
                value={value}
                onScorePopup={onScorePopup}
                onDeletePopup={onDeletePopup}
                profile={profile}
              />
              <ReviewInfo value={value} />
              {value.reviewImageListDto.reviewImageList && (
                <ImageField
                  images={value.reviewImageListDto.reviewImageList}
                  authorName={value.authorDto.name ?? ""}
                  onDetailView={onDetailView}
                />
              )}
              <LikeField value={value} buildingId={buildingId} />
            </Item>
          );
        })}
        {needToBlur && (
          <FirstReviewField>
            <div className="need-login-field">
              <div className="title">로그인이 필요해요</div>
              <div className="sub-title">
                로그인하고 실거주자가 들려주는
                <br />
                자취방 이야기를 들어보세요!
              </div>
              <Button
                label={"로그인하기"}
                size="md"
                width={"100%"}
                type={"primary"}
                onClick={() => {
                  logEvent({ name: "click-login_popup-login" });
                  Router.push(`/login?redirect_uri=${Router.router.asPath}`);
                }}
              />
            </div>
          </FirstReviewField>
        )}
        <div ref={setTarget}>{isLoading && <Loading>Loading...</Loading>}</div>
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

const Loading = styled.div`
  text-align: center;
  border: 1px solid black;
  height: 200px;
  font-size: 2rem;
  background-color: aliceblue;
`;

const FirstReviewField = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  border-radius: 8px;
  padding: 16px;
  margin-bottom: 12px;

  background-image: url("../user_review_card.png");
  background-size: cover;
  height: 679px;

  .need-login-field {
    display: flex;
    flex-direction: column;
    padding: 32px 16px 16px;
    gap: 24px;
    isolation: isolate;

    width: calc(100vw - 40px);
    max-width: 320px;
    box-sizing: border-box;

    border-radius: 24px;

    background: var(--white);
    border: 1px solid var(--primary-6);
    .title {
      ${SubTitle1}

      color: var(--black);
      text-align: center;
    }
    .sub-title {
      ${Caption1Bold}
      text-align: center;
      color: var(--black);
    }
  }
`;
