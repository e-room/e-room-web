import { atom, selector } from "recoil";

export const buildingListState = atom({
  key: "buildingListState",
  default: [
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
  ],
});

export const buildingListSelector = selector({
  key: "buildingListSelector",
  get: ({ get }) => {
    const data = get(buildingListState);
    return data;
  },
});