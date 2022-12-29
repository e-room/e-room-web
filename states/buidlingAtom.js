import axios from "axios";
import { atom, selector } from "recoil";

export const buildingListState = atom({
  key: "buildingListState",
  default: {
    content: [
      {
        buildingId: 4164,
        name: "",
        address: {
          siDo: "경기도",
          siGunGu: "수원시 영통구",
          eupMyeon: "이의동",
          roadName: "광교로",
          buildingNumber: "147",
        },
        reviewCnt: 0,
        scoreAvg: null,
        bestCategory: null,
        directDeal: false,
      },
      {
        buildingId: 4162,
        name: "",
        address: {
          siDo: "경기도",
          siGunGu: "수원시 영통구",
          eupMyeon: "이의동",
          roadName: "광교로",
          buildingNumber: "146",
        },
        reviewCnt: 0,
        scoreAvg: null,
        bestCategory: null,
        directDeal: false,
      },
      {
        buildingId: 4158,
        name: "차세대융합기술연구원",
        address: {
          siDo: "경기도",
          siGunGu: "수원시 영통구",
          eupMyeon: "이의동",
          roadName: "광교로",
          buildingNumber: "145",
        },
        reviewCnt: 0,
        scoreAvg: null,
        bestCategory: null,
        directDeal: false,
      },
      {
        buildingId: 4156,
        name: "",
        address: {
          siDo: "경기도",
          siGunGu: "수원시 영통구",
          eupMyeon: "이의동",
          roadName: "광교로",
          buildingNumber: "120",
        },
        reviewCnt: 0,
        scoreAvg: null,
        bestCategory: null,
        directDeal: false,
      },
      {
        buildingId: 4154,
        name: "",
        address: {
          siDo: "경기도",
          siGunGu: "수원시 영통구",
          eupMyeon: "이의동",
          roadName: "광교로",
          buildingNumber: "116",
        },
        reviewCnt: 0,
        scoreAvg: null,
        bestCategory: null,
        directDeal: false,
      },
      {
        buildingId: 4152,
        name: "광교데시앙루브",
        address: {
          siDo: "경기도",
          siGunGu: "수원시 영통구",
          eupMyeon: "이의동",
          roadName: "광교로",
          buildingNumber: "114",
        },
        reviewCnt: 0,
        scoreAvg: null,
        bestCategory: null,
        directDeal: false,
      },
      {
        buildingId: 4150,
        name: "한국나노기술원",
        address: {
          siDo: "경기도",
          siGunGu: "수원시 영통구",
          eupMyeon: "이의동",
          roadName: "광교로",
          buildingNumber: "109",
        },
        reviewCnt: 0,
        scoreAvg: null,
        bestCategory: null,
        directDeal: false,
      },
      {
        buildingId: 4148,
        name: "경기도중소기업지원센터",
        address: {
          siDo: "경기도",
          siGunGu: "수원시 영통구",
          eupMyeon: "이의동",
          roadName: "광교로",
          buildingNumber: "107",
        },
        reviewCnt: 0,
        scoreAvg: null,
        bestCategory: null,
        directDeal: false,
      },
      {
        buildingId: 4146,
        name: "",
        address: {
          siDo: "경기도",
          siGunGu: "수원시 영통구",
          eupMyeon: "이의동",
          roadName: "광교로",
          buildingNumber: "105",
        },
        reviewCnt: 0,
        scoreAvg: null,
        bestCategory: null,
        directDeal: false,
      },
      {
        buildingId: 4144,
        name: "",
        address: {
          siDo: "경기도",
          siGunGu: "수원시 영통구",
          eupMyeon: "이의동",
          roadName: "광교로",
          buildingNumber: "66",
        },
        reviewCnt: 0,
        scoreAvg: null,
        bestCategory: null,
        directDeal: false,
      },
    ],
    pageable: {
      sort: {
        empty: false,
        unsorted: false,
        sorted: true,
      },
      offset: 0,
      pageNumber: 0,
      pageSize: 10,
      paged: true,
      unpaged: false,
    },
    sort: {
      empty: false,
      unsorted: false,
      sorted: true,
    },
    number: 0,
    first: true,
    last: false,
    size: 10,
    numberOfElements: 10,
    empty: false,
  },
});

export const buildingListSelector = selector({
  key: "buildingListSelector",
  get: ({ get }) => {
    const data = get(buildingListState);
    return data;
  },
});

export const imageViewState = atom({
  key: "imageViewState",
  default: false,
});

export const buildingMarkingSelector = selector({
  key: "buildingMarkingSelector",
  get: async () => {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_HOST}/building/marking`
    );
    console.log("getBuilding 실행");
    return response.data;
  },
});

export const buildingSelector = selector({
  key: "buildingSelector",
  get: ({ get }) => {
    const data = get(buildingState);
    return data;
  },
});

export const buildingState = atom({
  key: "buildingState",
  default: {
    buildingId: 4134,
    name: "영통 플래티넘베이스 비",
    address: {
      siDo: "경기도",
      siGunGu: "수원시 영통구",
      eupMyeon: "망포동",
      roadName: "망포로",
      buildingNumber: "142",
    },
    coordinate: {
      longitude: 127.049411756331,
      latitude: 37.2408811857691,
    },
    isDirectDeal: false,
    rooms: [
      {
        roomId: 7459,
        roomNumber: 100,
      },
      {
        roomId: 7559,
        roomNumber: 101,
      },
      {
        roomId: 7659,
        roomNumber: 102,
      },
      {
        roomId: 7759,
        roomNumber: 103,
      },
      {
        roomId: 7859,
        roomNumber: 104,
      },
      {
        roomId: 7959,
        roomNumber: 105,
      },
      {
        roomId: 8059,
        roomNumber: 106,
      },
      {
        roomId: 8159,
        roomNumber: 107,
      },
    ],
    buildingSummaries: {
      TRAFFIC: 2.833543274061768, // 교통
      BUILDINGCOMPLEX: 2.0065836250675604, // 건물/단지
      INTERNAL: 3.0221639411263053, // 내부
      SURROUNDING: 2.147296777275526, // 주변/환경
      LIVINGLOCATION: 2.276178294901025, // 생활/입지
      RESIDENCESATISFACTION: 3.581565029125066, // 주거 만족도
    },
  },
});
