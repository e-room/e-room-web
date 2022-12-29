import styled from "@emotion/styled";
import {
  Body1Bold,
  Body3,
  Body3Bold,
  Caption1,
  Caption1Bold,
  Caption2,
  Caption2Bold,
} from "styles/typography";
import Avatar from "components/common/atoms/Avatar";
import Avatar24 from "assets/avatar/24.png";
import Icon from "components/common/atoms/Icon";
import Chip from "components/common/atoms/Chip";
import { useState } from "react";
import Popup from "components/common/atoms/Popup";
import { reviewListState } from "states/reviewAtom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { KEYWORD_STATES } from "codes/codeType";
import Score from "components/common/atoms/Score";

import { dummyImages } from "./ImageView";
import { imageViewState } from "states/buidlingAtom";

export default function ReviewList() {
  const Reviews = useRecoilValue(reviewListState);
  const setShowDetail = useSetRecoilState(imageViewState);
  const [isLike, setIsLike] = useState(false);

  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const onDetailView = () => setShowDetail(true);

  const [showTotalScore, setShowTotalScore] = useState(false);

  const Infos = (value) => {
    return [
      {
        title: "거주시작",
        content: "2022년~",
      },
      {
        title: "거주기간",
        content: "20개월",
      },
      {
        title: "집 크기",
        content: "13평 (42.9m²)",
      },
      {
        title: "보증금",
        content: `${value.baseReviewResponse.deposit}만원`,
      },
      {
        title: "월세",
        content: `${value.baseReviewResponse.monthlyRent}만원`,
      },
      {
        title: "관리비",
        content: `${value.baseReviewResponse.managementFee}만원`,
      },
    ];
  };

  const advantages = (value) => {
    return [
      {
        title: "👍🏻 장점",
        chips: value.baseReviewResponse.advantage,
        content: value.baseReviewResponse.advantageDescription,
      },
      {
        title: "👎🏻 단점",
        chips: value.baseReviewResponse.disadvantage,
        content: value.baseReviewResponse.disadvantageDescription,
      },
    ];
  };
  const DetailFields = [
    { title: "교통", score: 78 },
    { title: "건물/단지", score: 56 },
    { title: "내부", score: 100 },
    { title: "주변/환경", score: 20 },
    { title: "생활/입지", score: 88 },
  ];

  return (
    <Container>
      {showConfirmDelete && (
        <Popup
          title={"정말로 이 리뷰를 삭제하시겠어요?"}
          visible={showConfirmDelete}
          buttonType={"warning"}
          cancelText={"취소"}
          submitText={"삭제"}
          onCancelClick={() => setShowConfirmDelete(false)}
        >
          <PopupSubTitle>
            삭제하면 되돌릴 수 없습니다.
            <br />
            신중하게 결정해주세요.
          </PopupSubTitle>
        </Popup>
      )}
      {showTotalScore && (
        <Popup
          title={"까칠한 판다리나님의 세부 점수"}
          visible={showTotalScore}
          buttonType={"confirm"}
          confirmText={"닫기"}
          onConfirmClick={() => setShowTotalScore(false)}
        >
          <DetailScoreField>
            {DetailFields.map((value) => {
              return (
                <div className="field" key={value.title}>
                  <div className="title">{value.title}</div>
                  <ScoreField>
                    <div className="score">4.5</div>
                    <Icon icon={"star-filled"} size={"sm"} />
                    <Icon icon={"star-filled"} size={"sm"} />
                    <Icon icon={"star-filled"} size={"sm"} />
                    <Icon icon={"star-filled"} size={"sm"} />
                    <Icon icon={"star-half"} size={"sm"} />
                  </ScoreField>
                </div>
              );
            })}
          </DetailScoreField>
        </Popup>
      )}
      <Title>실제 거주 후기</Title>
      <div>
        {Reviews.content.map((value) => {
          const notAccess = value.id > 1;

          return (
            <Item key={value.baseReviewResponse.reviewId} blur={notAccess}>
              <Head>
                <Avatar img={Avatar24.src} style={{ marginRight: 6 }} />
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                  }}
                >
                  <ScoreArea>
                    <Score size="sm" readOnly={true} value={4} />
                    <div className="score">4.5</div>
                  </ScoreArea>
                  <UserInfo>
                    {value.authorDto.name} | 22.11.27. |{" "}
                    <span onClick={() => setShowTotalScore(true)}>세부점수 보기</span>
                  </UserInfo>
                </div>
                <div>
                  <DeleteButton onClick={() => !notAccess && setShowConfirmDelete(true)}>
                    삭제
                  </DeleteButton>
                </div>
              </Head>
              <Info>
                {Infos(value).map((v) => {
                  return (
                    <div key={v.title}>
                      <div className="title">{v.title}</div>
                      <div className="content">{v.content}</div>
                    </div>
                  );
                })}
              </Info>
              {advantages(value).map((v) => {
                return (
                  <AdvantageField key={v.title}>
                    <div className="title">{v.title}</div>
                    <div className="badge">
                      {v.chips.map((v) => {
                        return (
                          <Chip label={KEYWORD_STATES[v]} key={v} type={"tertiary"} />
                        );
                      })}
                    </div>
                    <div className="description">{v.content}</div>
                  </AdvantageField>
                );
              })}
              <ImgField>
                {dummyImages.map((value) => {
                  return (
                    <ImgCard src={value.src} key={value.src} onClick={onDetailView} />
                  );
                })}
              </ImgField>
              <LikeField favorite={isLike}>
                <div style={{ display: "flex" }} onClick={() => setIsLike(!isLike)}>
                  <Icon icon={"thumb-stroke"} size={"sm"} />
                  <div className="text">
                    추천{" "}
                    {isLike
                      ? value.baseReviewResponse.reviewLikeCnt + 1
                      : value.baseReviewResponse.reviewLikeCnt}
                    개
                  </div>
                </div>
              </LikeField>
            </Item>
          );
        })}
      </div>
    </Container>
  );
}

const Container = styled.div`
  padding: 12px 20px;
  background: #fafafa;
`;

const PopupSubTitle = styled.div`
  ${Caption1Bold}
  text-align: center;
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
  filter: ${(p) => (p.blur ? `blur(8px)` : "none")};
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 12px;
`;

const Head = styled.div`
  display: flex;
  align-items: center;
`;

const ScoreArea = styled.div`
  ${Caption2Bold}

  color: var(--primary-1);
  display: flex;
  align-items: flex-start;

  .score {
    margin-left: 6px;
  }

  svg {
    fill: var(--primary-1);
  }
`;

const UserInfo = styled.div`
  ${Caption2}
  color: var(--gray-1);

  span {
    border-bottom: 1px solid var(--gray-1);
  }
`;

const DeleteButton = styled.div`
  ${Caption1Bold}

  color: var(--danger1);
  width: 25px;
`;

const Info = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(33%, auto));

  row-gap: 20px;

  .title {
    ${Caption2Bold}
    color: var(--gray-2);
    margin-bottom: 4px;
  }
  .content {
    ${Body3}
    color: var(--black);
  }
`;

const AdvantageField = styled.div`
  margin-top: 20px;
  .title {
    ${Caption2Bold}
    color: var(--black);
  }
  .badge {
    display: flex;
    flex-wrap: wrap;
    gap: 3px;
    margin: 12px 0;
  }
  .description {
    ${Body3}

    color: var(--black);
  }
`;
const ImgField = styled.div`
  overflow-x: scroll;
  white-space: nowrap;

  scrollbar-width: none;
  -ms-overflow-style: none;

  ::-webkit-scrollbar {
    display: none;
  }
`;

const ImgCard = styled.img`
  width: 117px;
  height: 117px;
  border-radius: 8px;
  margin-right: 8px;
`;

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
const DetailScoreField = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  gap: 8px;

  .field {
    display: flex;
    align-items: center;

    .title {
      min-width: 84px;
      ${Body3Bold}
      color: var(--black);
    }
  }
`;
const ScoreField = styled.div`
  display: flex;
  align-items: center;

  .score {
    ${Caption2Bold}
    color: var(--primary-1);

    margin-right: 6px;
  }
  svg {
    fill: var(--primary-1);
  }
`;
