import styled from "@emotion/styled";
import AppLayout from "../components/common/AppLayout";
import Button from "../components/common/atoms/Button";
import Icon from "../components/common/atoms/Icon";

import Link from "next/link";
import PerfectScrollbar from "react-perfect-scrollbar";
import BuildingList from "../components/building/BuildingList";

export default function BuildingListPage() {
  return (
    <AppLayout
      appBarObject={{ rightIcon: "filter-stroke", headerText: "이 지역 자취방" }}
    >
      <Container>
        <PerfectScrollbar>
          <div style={{ paddingBottom: 150 }}>
            <Banner>배너영역</Banner>
            <BuildingList data={data} />
          </div>
          <ButtonGroup>
            <Link href={"/ReviewFormPage"}>
              <a>
                {/* //TODO: icon button기능 추가.. 필요.. */}
                <Button type={"primary"} size={"sm"}>
                  <Icon icon={"plus"} size={"md"} fill={"var(--white)"} />
                  리뷰 쓰기
                </Button>
              </a>
            </Link>
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
