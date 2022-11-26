import { atom, selector } from "recoil";

export const heartListState = atom({
  key: "heartListState",
  default: [
    {
      buildingId: 1,
      name: "찜건물1", // 건물 이름
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
      name: "찜투2",
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
      name: "찜삼3",
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

export const heartListSelector = selector({
  key: "heartListSelector",
  get: ({ get }) => {
    const data = get(heartListState);
    return data;
  },
});
