import AppLayout from "../components/layout/AppLayout";
import styled from "@emotion/styled";
import Chip from "../components/Chip";
import Button from "../components/Button/Button";
import Score from "../components/Input/Score";

import Link from "next/link";
import PerfectScrollbar from "react-perfect-scrollbar";

// import { useRecoilState } from "recoil";
// import { textState } from "../states";

export default function BuildingListPage() {
  // const [text, setText] = useRecoilState(textState);

  // console.log("pageName", text);
  return (
    <AppLayout
      appBarObject={{ rightIcon: "filter-stroke", headerText: "이 지역 자취방" }}
    >
      <Container>
        <PerfectScrollbar>
          <div style={{ paddingBottom: 150 }}>
            <Banner
            // onClick={() => {
            //   setText("BuildingListPage");
            // }}
            >
              배너영역
            </Banner>
            {data.map((value) => {
              return (
                <Link href={`/ReviewDetail/${value.buildingId}`} key={value.buildingId}>
                  <BuildingContainer>
                    <img src="https://bookthumb-phinf.pstatic.net/cover/137/995/13799585.jpg?update=20180726" />
                    <BuildingContent>
                      <div className="body-bold-2">{value.name}</div>
                      <AddressArea className="caption-2">{value.address}</AddressArea>
                      <Chips>
                        {value.isDirectDeal && <Chip label={"직거래가능"} />}
                        <Chip label={"교통 편리"} />
                      </Chips>
                      <ReviewArea>
                        <div
                          className="caption-2"
                          style={{ opacity: 0.5, marginRight: 8 }}
                        >
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
                </Link>
              );
            })}
          </div>
          <ButtonGroup>
            <Button type={"primary"} label={"리뷰쓰기"} />
          </ButtonGroup>
        </PerfectScrollbar>
      </Container>
    </AppLayout>
  );
}

const Container = styled.div`
  height: calc(100vh - 112px);
  background-color: #fafafa !important;
`;

const BuildingContainer = styled.div`
  height: 140px;
  display: flex;
  border-top: 1px solid var(--gray-4);

  background: var(--white);
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

const AddressArea = styled.div`
  opacity: 0.5;

  width: calc(100vw - 162px);

  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const ButtonGroup = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  position: fixed;
  bottom: 64px;
`;
const Banner = styled.div`
  width: 100%;
  height: 84px;
  background-color: var(--primary-5);
`;

// zipcode, addressDetail, preview
// img 늘릴건지, 뒷배경 빈색으로 넣을건지
// 교통편리만 검정색인 이유?
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
