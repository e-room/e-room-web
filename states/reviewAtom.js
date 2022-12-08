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
      hasElevator: null,
    },
    roomBaseDto: {
      lineNumber: null,
      roomNumber: null,
    },
    reviewBaseDto: {
      deposit: null,
      monthlyRent: null,
      managementFee: null,
      netLeasableArea: null,
      isAnonymous: null,
    },
    reviewScoreDto: {
      traffic: null, // 교통
      buildingComplex: null, // 건물/단지
      surrounding: null, // 주변/환경
      internal: null, // 내부
      livingLocation: null, // 생활/입지
      residenceSatisfaction: null, // 주거만족도
    },
    reviewResidencePeriodDto: {
      residenceStartYear: null,
      residenceDuration: null,
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
