import { atom } from "recoil";
import dayjs from "dayjs";
const now = dayjs().get("year");

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
      buildingName: "",
      hasElevator: false, // x
    },
    reviewBaseDto: {
      deposit: null, // 보증금 // number
      monthlyRent: null, // 월세 // number
      managementFee: null, // 관리비 // number
      netLeasableArea: null, // 면적(평) // number
      isAnonymous: true, // TODO: 익명성 여부 판단인데, 일단은 전부 true
    },
    reviewScoreDto: {
      traffic: 0, // 교통
      buildingComplex: 0, // 건물/단지
      surrounding: 0, // 주변/환경
      internal: 0, // 내부
      livingLocation: 0, // 생활/입지
      residenceSatisfaction: 0,
    },
    reviewResidencePeriodDto: {
      residenceStartYear: now, // 거주시작
      residenceDuration: null, // 거주기간 // number
    },
    advantageKeywordList: [],
    advantageDescription: null,
    disadvantageDescription: null,
    disadvantageKeywordList: [],
  },
});

export const reviewImageListState = atom({
  key: "reviewImageListState",
  default: [],
});

export const reviewStepState = atom({
  key: "reviewStepState",
  default: 1,
});

export const reviewSuccessToastState = atom({
  key: "reviewSuccessToastState",
  default: false,
});
