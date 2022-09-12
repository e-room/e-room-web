import { atom } from "recoil";

export const pageNameState = atom({
  key: "pageNameState",
  default: "",
});

export const isLoginState = atom({
  key: "isLoginState",
  default: false,
});

export const reviewStepState = atom({
  key: "reviewStepState",
  default: 0,
});

export const reviewFormState = atom({
  key: "reviewFormState",
  default: {
    address: null, // 주소
    lineNumber: null, // 상세주소 (동)
    roomNumber: null, // 상세주소 (호)
    residenceType: null, //
    residencePeriod: null,
    floorHeight: null,
    deposit: null,
    monthlyRent: null,
    managementFee: null,
    netLeasableArea: null,
    managementFeeDescription: null,
    trafficScore: null,
    buildingComplexScore: null,
    surroundingScore: null,
    internalScore: null,
    livingLocationScore: null,
    advantageKeywordList: null,
    disadvantageKeywordList: null,
    residenceSatisfaction: null,
  },
});
