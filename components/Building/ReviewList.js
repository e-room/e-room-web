import styled from "@emotion/styled";
import {
  Body1Bold,
  Body3,
  Caption1,
  Caption1Bold,
  Caption2Bold,
} from "styles/typography";
import Avatar from "components/common/atoms/Avatar";
import Avatar24 from "assets/avatar/24.png";
import Icon from "components/common/atoms/Icon";
import Chip from "components/common/atoms/Chip";
import { useState } from "react";
import Popup from "components/common/atoms/Popup";

export default function ReviewList() {
  const [popupVisible, setPopupVisible] = useState(false);
  const onCancelClick = () => setPopupVisible(false);

  const onFavoriteChange = (id) => {
    console.log("click");
  };

  return (
    <Container>
      {popupVisible && (
        <Popup
          title={"정말로 이 리뷰를 삭제하시겠어요?"}
          visible={popupVisible}
          buttonType={"warning"}
          cancelText={"취소"}
          submitText={"삭제"}
          onCancelClick={onCancelClick}
        >
          <PopupSubTitle>
            삭제하면 되돌릴 수 없습니다.
            <br />
            신중하게 결정해주세요.
          </PopupSubTitle>
        </Popup>
      )}
      <Title>실제 거주 후기</Title>
      <ReviewField>
        {Reviews.map((value) => {
          const notAccess = value.id > 1;

          return (
            <ReviewItem key={value.id} blur={notAccess}>
              <Top>
                <div className="nickname">
                  <Avatar img={Avatar24.src} />
                  {value.nickName}
                </div>
                <DeleteButton
                  onClick={() => !notAccess && setPopupVisible(true)}
                >
                  삭제
                </DeleteButton>
              </Top>
              <ScoreField>
                <div className="score">4.5</div>
                <Icon icon={"star-filled"} size={"sm"} />
                <Icon icon={"star-filled"} size={"sm"} />
                <Icon icon={"star-filled"} size={"sm"} />
                <Icon icon={"star-filled"} size={"sm"} />
                <Icon icon={"star-filled"} size={"sm"} />
              </ScoreField>
              <Info>
                <div>
                  <div className="title">거주기간</div>
                  <div className="content">~2022년</div>
                </div>
                <div>
                  <div className="title">거주층</div>
                  <div className="content">저층</div>
                </div>
                <div>
                  <div className="title">집 크기</div>
                  <div className="content">13평 (42.9m²)</div>
                </div>
                <div>
                  <div className="title">보증금</div>
                  <div className="content">500만원</div>
                </div>
                <div>
                  <div className="title">월세</div>
                  <div className="content">45만원</div>
                </div>
                <div>
                  <div className="title">관리비</div>
                  <div className="content">10만원</div>
                </div>
              </Info>
              <Good>
                <div className="title">👍🏻 장점</div>
                <div className="badge">
                  <Chip label={"🚘 주차"} />
                  <Chip label={"🏠 건물관리"} />
                  <Chip label={"♨️ 단열"} />
                </div>
                <div className="description">
                  이런 것들이 장점인 것 같구요.. 저는 나름 만족하면서 살고
                  있답니다!
                </div>
              </Good>
              <Bad>
                <div className="title">👎🏻 단점</div>
                <div className="badge">
                  <Chip label={"🛗 엘레베이터"} />
                  <Chip label={"📣 동네소음"} />
                  <Chip label={"⛰ 언덕"} />
                </div>
                <div className="description">
                  이런 것들이 단점인 것 같구요.. 솔직히 관리비가 덜들긴하는데
                  그냥 그만큼 관리도 안돼서 너무 별로에요.
                </div>
              </Bad>
              <Bottom favorite={value.myFavorite}>
                <div
                  style={{ display: "flex" }}
                  onClick={() => onFavoriteChange(value.id)}
                >
                  <Icon icon={"thumb-stroke"} size={"sm"} />
                  <div className="text">추천 8개</div>
                </div>
              </Bottom>
            </ReviewItem>
          );
        })}
      </ReviewField>
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
const ReviewField = styled.div``;

const ReviewItem = styled.div`
  background: var(--white);
  filter: ${(p) => (p.blur ? `blur(8px)` : "none")};
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 12px;
`;
const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  .nickname {
    display: flex;
    align-items: center;
    gap: 6px;
  }
`;
const DeleteButton = styled.div`
  ${Caption1Bold}

  color: var(--danger1);
`;
const ScoreField = styled.div`
  ${Caption2Bold}

  color: var(--primary-1);

  display: flex;
  align-items: center;

  margin: 20px 0;

  .score {
    margin-right: 6px;
  }

  svg {
    fill: var(--primary-1);
  }
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

const Good = styled.div`
  margin-top: 20px;
  .title {
    ${Caption2Bold}
    color: var(--black);
  }
  .badge {
    display: flex;
    gap: 3px;
    margin: 12px 0;
  }
  .description {
    ${Body3}

    color: var(--black);
  }
`;

const Bad = styled.div`
  margin-top: 20px;
  .title {
    ${Caption2Bold}
    color: var(--black);
  }
  .badge {
    display: flex;
    gap: 3px;
    margin: 12px 0;
  }
  .description {
    ${Body3}

    color: var(--black);
  }
`;

const Bottom = styled.div`
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

const Reviews = [
  {
    id: 1,
    profilePictureUrl: "www.amazon.com",
    nickName: "날씬한 코끼리",
    residencePeriod: "BEFORE_EIGHTEEN",
    floorHeight: "LOW",
    netLeasableArea: 13, //평수
    deposit: 1000,
    monthlyRent: 50,
    manageMentFee: 10,
    score: "SATISFIED", // (1~5),
    advantage: ["PARKING", "PUBLIC_TRANSPORTATION", "PARK_WALK", "SECURITY"],
    advantageDescription: "장점에 대한 요약",
    disadvantage: ["PARKING", "PUBLIC_TRANSPORTATION", "PARK_WALK", "SECURITY"],
    disadvantageDescription: "단점에 대한 요약",
    reviewLikeCnt: 6,
    myFavorite: true,
  },
  {
    id: 2,
    profilePictureUrl: "www.amazon.com",
    nickName: "까칠한 판다",
    residencePeriod: "BEFORE_EIGHTEEN",
    floorHeight: "LOW",
    netLeasableArea: 13, //평수
    deposit: 1000,
    monthlyRent: 50,
    manageMentFee: 10,
    score: "SATISFIED", // (1~5),
    advantage: ["PARKING", "PUBLIC_TRANSPORTATION", "PARK_WALK", "SECURITY"],
    advantageDescription: "장점에 대한 요약",
    disadvantage: ["PARKING", "PUBLIC_TRANSPORTATION", "PARK_WALK", "SECURITY"],
    disadvantageDescription: "단점에 대한 요약",
    reviewLikeCnt: 6,
    myFavorite: false,
  },
  {
    id: 3,
    profilePictureUrl: "www.amazon.com",
    nickName: "까칠한 판다",
    residencePeriod: "BEFORE_EIGHTEEN",
    floorHeight: "LOW",
    netLeasableArea: 13, //평수
    deposit: 1000,
    monthlyRent: 50,
    manageMentFee: 10,
    score: "SATISFIED", // (1~5),
    advantage: ["PARKING", "PUBLIC_TRANSPORTATION", "PARK_WALK", "SECURITY"],
    advantageDescription: "장점에 대한 요약",
    disadvantage: ["PARKING", "PUBLIC_TRANSPORTATION", "PARK_WALK", "SECURITY"],
    disadvantageDescription: "단점에 대한 요약",
    reviewLikeCnt: 6,
    myFavorite: false,
  },
];
