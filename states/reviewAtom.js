import { atom } from "recoil";

export const reviewFormState = atom({
  key: "reviewFormState",
  default: {
    address: {
      siDo: null,
      siGunGu: null,
      eupMyeon: null,
      roadName: null,
      buildingNumber: null,
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
      traffic: null,
      buildingComplex: null,
      surrounding: null,
      internal: null,
      livingLocation: null,
      residenceSatisfaction: null,
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
