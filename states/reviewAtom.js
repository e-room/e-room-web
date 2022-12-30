import { atom } from "recoil";

export const reviewFormState = atom({
  key: "reviewFormState",
  default: {
    address: {
      siDo: "",
      siGunGu: "",
      eupMyeon: "",
      roadName: "",
      buildingNumber: "",
    },
    buildingOptionalDto: {
      buildingName: null,
      hasElevator: null, // x
    },
    roomBaseDto: {
      lineNumber: null,
      roomNumber: null,
    },
    reviewBaseDto: {
      deposit: null, // 보증금
      monthlyRent: null, // 월세
      managementFee: null, // 관리비
      netLeasableArea: null, // 면적
      isAnonymous: true, // TODO: 익명성 여부 판단인데, 일단은 전부 true
    },
    reviewScoreDto: {
      traffic: null, // 교통
      buildingComplex: null, // 건물/단지
      surrounding: null, // 주변/환경
      internal: null, // 내부
      livingLocation: null, // 생활/입지
      residenceSatisfaction: null, // 총 만족도 TODO: 임시로 계산해서 넣어주기(백엔드에서 뺄때까지)
    },
    reviewResidencePeriodDto: {
      residenceStartYear: null, // 거주시작
      residenceDuration: null, // 거주기간
    },
    advantageKeywordList: [],
    advantageDescription: null,
    disadvantageDescription: null,
    disadvantageKeywordList: [],
    reviewImageList: [],
  },
});

export const reviewStepState = atom({
  key: "reviewStepState",
  default: 1,
});

export const reviewListState = atom({
  key: "reviewListState",
  default: {
    content: [
      {
        baseReviewResponse: {
          reviewId: 8010,
          score: 4.856173009955057,
          residencePeriod: 3,
          residenceDuration: 3,
          netLeasableArea: 57.321,
          deposit: 130,
          monthlyRent: 57,
          managementFee: 7,
          advantage: [
            "PARKING",
            "SECURITY",
            "VENTILATION",
            "DAY_LIGHTING",
            "INSECT",
            "FLOOR_NOISE",
            "ELEVATOR",
            "TOWN_NOISE",
            "HILL",
            "STORE",
          ],
          advantageDescription: "good20",
          disadvantage: [
            "PARKING",
            "PUBLIC_TRANSPORTATION",
            "SECURITY",
            "SECURITY_OFFICE",
            "BUILDING_MANAGEMENT",
            "SEPARATE_TRASH",
            "MOISTURE_PROOF",
            "DAY_LIGHTING",
            "INSECT",
            "FLOOR_NOISE",
            "ELEVATOR",
            "STORE",
            "SCHOOL_ACADEMY",
          ],
          disadvantageDescription: "bad84",
          reviewLikeCnt: 0,
        },
        baseRoomResponse: {
          roomId: 7282,
          roomNumber: 100,
          lineNumber: 100,
        },
        authorDto: {
          email: "e-room+6@e-room.app",
          name: "Test+6",
          picture: null,
        },
      },
      {
        baseReviewResponse: {
          reviewId: 8390,
          score: 4.313188397760163,
          residencePeriod: 17,
          residenceDuration: 17,
          netLeasableArea: 2.511,
          deposit: 394,
          monthlyRent: 51,
          managementFee: 5,
          advantage: [
            "PARKING",
            "PUBLIC_TRANSPORTATION",
            "PARK_WALK",
            "MOISTURE_PROOF",
            "DAY_LIGHTING",
            "INSECT",
            "FLOOR_NOISE",
            "ELEVATOR",
            "HILL",
            "MART_CONVENIENCE_STORE",
            "SCHOOL_ACADEMY",
          ],
          advantageDescription: "good73",
          disadvantage: [
            "PARK_WALK",
            "BUILDING_MANAGEMENT",
            "SEPARATE_TRASH",
            "MOISTURE_PROOF",
            "TOWN_NOISE",
            "HILL",
            "STORE",
            "SCHOOL_ACADEMY",
          ],
          disadvantageDescription: "bad31",
          reviewLikeCnt: 5,
        },
        baseRoomResponse: {
          roomId: 7282,
          roomNumber: 100,
          lineNumber: 100,
        },
        authorDto: {
          email: null,
          name: "렉 걸린 아이돌",
          picture: null,
        },
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
      pageSize: 2,
      paged: true,
      unpaged: false,
    },
    sort: {
      empty: false,
      unsorted: false,
      sorted: true,
    },
    first: true,
    last: false,
    number: 0,
    size: 2,
    numberOfElements: 2,
    empty: false,
  },
});
