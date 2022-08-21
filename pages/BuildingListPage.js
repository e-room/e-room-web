import AppLayout from "../components/layout/AppLayout";
import styled from "@emotion/styled";
import Chip from "../components/Chip";
import Score from "../components/Input/Score";

const Banner = styled.div`
  width: 100%;
  height: 84px;
  background-color: var(--primary-5);
`;

// zipcode, addressDetail, preview
// score 4.3 이면 어떻게 ui 표현?
// img 늘릴건지, 뒷배경 빈색으로 넣을건지
// 교통편리만 검정색인 이유?
// 주소 두줄로 들어가니까 안예쁨..
// 교통은 code화 시켜야 함
const data = [
  {
    buildingId: 1,
    name: "프라다빌", // 건물 이름
    address: "대전광역시 유성구 어은동 103-1", // 상세 주소
    reviewCnt: 20, // 리뷰 개수
    scoreAvg: 4.3, // 평균 점수
    bestCategory: {
      description: "교통", //대표 장점
    },
    isDirectDeal: true, // 직거래 여부
  },
  {
    buildingId: 2,
    name: "구찌빌",
    address: "서울특별시 관악구 신림동 관천로 12길 47 동성오피스텔",
    reviewCnt: 22,
    scoreAvg: 3.0,
    bestCategory: {
      description: "건물 및 단지",
    },
    isDirectDeal: false,
  },
  {
    buildingId: 3,
    name: "구찌빌",
    address: "서울특별시 관악구 신림동 관천로 12길 47 동성오피스텔",
    reviewCnt: 22,
    scoreAvg: 3.0,
    bestCategory: {
      description: "건물 및 단지",
    },
    isDirectDeal: false,
  },
  {
    buildingId: 4,
    name: "구찌빌",
    address: "서울특별시 관악구 신림동 관천로 12길 47 동성오피스텔",
    reviewCnt: 22,
    scoreAvg: 3.0,
    bestCategory: {
      description: "건물 및 단지",
    },
    isDirectDeal: false,
  },
  {
    buildingId: 5,
    name: "구찌빌",
    address: "서울특별시 관악구 신림동 관천로 12길 47 동성오피스텔",
    reviewCnt: 22,
    scoreAvg: 3.0,
    bestCategory: {
      description: "건물 및 단지",
    },
    isDirectDeal: false,
  },
  {
    buildingId: 6,
    name: "구찌빌",
    address: "서울특별시 관악구 신림동 관천로 12길 47 동성오피스텔",
    reviewCnt: 22,
    scoreAvg: 3.0,
    bestCategory: {
      description: "건물 및 단지",
    },
    isDirectDeal: false,
  },
  {
    buildingId: 7,
    name: "구찌빌",
    address: "서울특별시 관악구 신림동 관천로 12길 47 동성오피스텔",
    reviewCnt: 22,
    scoreAvg: 3.0,
    bestCategory: {
      description: "건물 및 단지",
    },
    isDirectDeal: false,
  },
  {
    buildingId: 8,
    name: "구찌빌",
    address: "서울특별시 관악구 신림동 관천로 12길 47 동성오피스텔",
    reviewCnt: 22,
    scoreAvg: 3.0,
    bestCategory: {
      description: "건물 및 단지",
    },
    isDirectDeal: false,
  },
  {
    buildingId: 9,
    name: "구찌빌",
    address: "서울특별시 관악구 신림동 관천로 12길 47 동성오피스텔",
    reviewCnt: 22,
    scoreAvg: 3.0,
    bestCategory: {
      description: "건물 및 단지",
    },
    isDirectDeal: false,
  },
];

// TODO: routing 하기
export default function BuildingListPage() {
  return (
    <AppLayout>
      <Banner>배너영역</Banner>
      {data.map((value) => {
        return (
          <BuildingContainer key={value.buildingId}>
            <img src="https://bookthumb-phinf.pstatic.net/cover/137/995/13799585.jpg?update=20180726" />
            <BuildingContent>
              <div className="body-bold-2">{value.name}</div>
              <div className="caption-2" style={{ opacity: 0.5 }}>
                {value.address}
              </div>
              <Chips>
                {value.isDirectDeal && <Chip label={"직거래가능"} />}
                <Chip label={"교통 편리"} />
              </Chips>
              <ReviewArea>
                <div className="caption-2" style={{ opacity: 0.5, marginRight: 8 }}>
                  리뷰 {value.reviewCnt}개
                </div>
                <StarArea className="caption-bold-2">
                  {/* util 화 시키기 */}
                  {Number.parseFloat(value.scoreAvg).toFixed(1)}
                </StarArea>
                <Score size="sm" />
              </ReviewArea>
            </BuildingContent>
          </BuildingContainer>
        );
      })}
    </AppLayout>
  );
}

const BuildingContainer = styled.div`
  height: 140px;
  display: flex;
  border-bottom: 1px solid var(--gray-4);
  img {
    background: var(--gray-1);
    width: 122px;
  }
`;
const BuildingContent = styled.div`
  padding: 12px 20px;
`;

const Chips = styled.div`
  display: flex;
  gap: 4px;
  margin: 9px 0;
`;
const ReviewArea = styled.div`
  display: flex;
`;
const StarArea = styled.div`
  color: var(--primary-1);
`;
