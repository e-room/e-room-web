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
  get: ({ get }) => {
    const data = get(buildingMarkingState);
    return data;
  },
});

export const buildingMarkingState = atom({
  key: "buildingMarkingState",
  default: {
    buildingList: [
      {
        coordinateDto: {
          longitude: 127.069710816696,
          latitude: 37.2568828036311,
        },
        buildingId: 4126,
        directDeal: true,
      },
      {
        coordinateDto: {
          longitude: 127.044466322355,
          latitude: 37.2407110462924,
        },
        buildingId: 4128,
        directDeal: true,
      },
      {
        coordinateDto: {
          longitude: 127.04689640925,
          latitude: 37.2405717983718,
        },
        buildingId: 4130,
        directDeal: true,
      },
      {
        coordinateDto: {
          longitude: 127.048661356688,
          latitude: 37.24100322776,
        },
        buildingId: 4132,
        directDeal: true,
      },
      {
        coordinateDto: {
          longitude: 127.049411756331,
          latitude: 37.2408811857691,
        },
        buildingId: 4134,
        directDeal: true,
      },
      {
        coordinateDto: {
          longitude: 127.049013575288,
          latitude: 37.2685352773205,
        },
        buildingId: 4136,
        directDeal: true,
      },
      {
        coordinateDto: {
          longitude: 127.042575513713,
          latitude: 37.3099436290312,
        },
        buildingId: 4138,
      },
      {
        coordinateDto: {
          longitude: 127.042313281071,
          latitude: 37.310010399679,
        },
        buildingId: 4140,
      },
      {
        coordinateDto: {
          longitude: 127.039583763581,
          latitude: 37.2857107380762,
        },
        buildingId: 4142,
      },
      {
        coordinateDto: {
          longitude: 127.042135858987,
          latitude: 37.2878040511228,
        },
        buildingId: 4144,
      },
      {
        coordinateDto: {
          longitude: 127.044725833775,
          latitude: 37.2915419587587,
        },
        buildingId: 4146,
      },
      {
        coordinateDto: {
          longitude: 127.042984044326,
          latitude: 37.2922227074768,
        },
        buildingId: 4148,
      },
      {
        coordinateDto: {
          longitude: 127.041847575792,
          latitude: 37.293229934287,
        },
        buildingId: 4150,
      },
      {
        coordinateDto: {
          longitude: 127.045777148698,
          latitude: 37.2906263725742,
        },
        buildingId: 4152,
      },
      {
        coordinateDto: {
          longitude: 127.046154428217,
          latitude: 37.2908855448012,
        },
        buildingId: 4154,
      },
      {
        coordinateDto: {
          longitude: 127.046482329803,
          latitude: 37.2911698741733,
        },
        buildingId: 4156,
      },
      {
        coordinateDto: {
          longitude: 127.046115823821,
          latitude: 37.2943386968363,
        },
        buildingId: 4158,
      },
      {
        coordinateDto: {
          longitude: 127.048535327032,
          latitude: 37.2929529247892,
        },
        buildingId: 4162,
      },
      {
        coordinateDto: {
          longitude: 127.043442570823,
          latitude: 37.2943309681395,
        },
        buildingId: 4164,
      },
      {
        coordinateDto: {
          longitude: 127.049032107136,
          latitude: 37.2934570307983,
        },
        buildingId: 4166,
      },
      {
        coordinateDto: {
          longitude: 127.049384794933,
          latitude: 37.2938413568957,
        },
        buildingId: 4168,
      },
      {
        coordinateDto: {
          longitude: 127.049840383858,
          latitude: 37.2942884409416,
        },
        buildingId: 4170,
      },
      {
        coordinateDto: {
          longitude: 127.051421621674,
          latitude: 37.2963487071449,
        },
        buildingId: 4172,
      },
      {
        coordinateDto: {
          longitude: 127.046954360227,
          latitude: 37.2963500230486,
        },
        buildingId: 4174,
      },
      {
        coordinateDto: {
          longitude: 127.052266836388,
          latitude: 37.3056555025688,
        },
        buildingId: 4176,
      },
      {
        coordinateDto: {
          longitude: 127.056270536008,
          latitude: 37.3116264490882,
        },
        buildingId: 4178,
      },
      {
        coordinateDto: {
          longitude: 127.0564458119,
          latitude: 37.3115917658799,
        },
        buildingId: 4180,
      },
      {
        coordinateDto: {
          longitude: 127.056719968567,
          latitude: 37.3116399302612,
        },
        buildingId: 4182,
      },
      {
        coordinateDto: {
          longitude: 127.056033636741,
          latitude: 37.3120758174237,
        },
        buildingId: 4184,
      },
      {
        coordinateDto: {
          longitude: 127.041104172495,
          latitude: 37.2858371762435,
        },
        buildingId: 4186,
      },
      {
        coordinateDto: {
          longitude: 127.042122597805,
          latitude: 37.2868747246869,
        },
        buildingId: 4188,
      },
      {
        coordinateDto: {
          longitude: 127.044522855286,
          latitude: 37.2865993898339,
        },
        buildingId: 4192,
      },
      {
        coordinateDto: {
          longitude: 127.047903699368,
          latitude: 37.297296091974,
        },
        buildingId: 4194,
      },
      {
        coordinateDto: {
          longitude: 127.081191231128,
          latitude: 37.2953404384074,
        },
        buildingId: 4196,
      },
      {
        coordinateDto: {
          longitude: 127.033116715137,
          latitude: 37.2980136931725,
        },
        buildingId: 4198,
      },
      {
        coordinateDto: {
          longitude: 127.052800473694,
          latitude: 37.2782074915904,
        },
        buildingId: 4200,
      },
      {
        coordinateDto: {
          longitude: 127.053777782971,
          latitude: 37.2801723995453,
        },
        buildingId: 4202,
      },
      {
        coordinateDto: {
          longitude: 127.050942452819,
          latitude: 37.2806995003542,
        },
        buildingId: 4204,
      },
      {
        coordinateDto: {
          longitude: 127.054882908107,
          latitude: 37.2832308308589,
        },
        buildingId: 4206,
      },
      {
        coordinateDto: {
          longitude: 127.057264260057,
          latitude: 37.2853045252193,
        },
        buildingId: 4208,
      },
      {
        coordinateDto: {
          longitude: 127.059446949629,
          latitude: 37.2858286646645,
        },
        buildingId: 4210,
      },
      {
        coordinateDto: {
          longitude: 127.057781422092,
          latitude: 37.2870876096225,
        },
        buildingId: 4212,
      },
      {
        coordinateDto: {
          longitude: 127.060702664758,
          latitude: 37.2881245943755,
        },
        buildingId: 4214,
      },
      {
        coordinateDto: {
          longitude: 127.061237557645,
          latitude: 37.2887016141017,
        },
        buildingId: 4216,
      },
      {
        coordinateDto: {
          longitude: 127.064003249231,
          latitude: 37.2907652401614,
        },
        buildingId: 4218,
      },
      {
        coordinateDto: {
          longitude: 127.065594213103,
          latitude: 37.2915877375916,
        },
        buildingId: 4220,
      },
      {
        coordinateDto: {
          longitude: 127.065822658128,
          latitude: 37.2916701458349,
        },
        buildingId: 4222,
      },
      {
        coordinateDto: {
          longitude: 127.066060242928,
          latitude: 37.2917575042431,
        },
        buildingId: 4224,
      },
      {
        coordinateDto: {
          longitude: 127.066396060175,
          latitude: 37.2918481409498,
        },
        buildingId: 4226,
      },
      {
        coordinateDto: {
          longitude: 127.066574801738,
          latitude: 37.2919642744195,
        },
        buildingId: 4228,
      },
      {
        coordinateDto: {
          longitude: 127.066868347442,
          latitude: 37.2920758376262,
        },
        buildingId: 4230,
      },
      {
        coordinateDto: {
          longitude: 127.065534247206,
          latitude: 37.2946143560169,
        },
        buildingId: 4232,
      },
      {
        coordinateDto: {
          longitude: 127.067490870613,
          latitude: 37.2923178634417,
        },
        buildingId: 4234,
      },
      {
        coordinateDto: {
          longitude: 127.067740416354,
          latitude: 37.2925337897192,
        },
        buildingId: 4236,
      },
      {
        coordinateDto: {
          longitude: 127.067997809933,
          latitude: 37.2926962794231,
        },
        buildingId: 4238,
      },
      {
        coordinateDto: {
          longitude: 127.068326958789,
          latitude: 37.2930131650041,
        },
        buildingId: 4240,
      },
      {
        coordinateDto: {
          longitude: 127.068764527183,
          latitude: 37.2943605032373,
        },
        buildingId: 4242,
      },
      {
        coordinateDto: {
          longitude: 127.051320166474,
          latitude: 37.2778252006224,
        },
        buildingId: 4244,
      },
      {
        coordinateDto: {
          longitude: 127.051289431113,
          latitude: 37.2775622904751,
        },
        buildingId: 4246,
      },
      {
        coordinateDto: {
          longitude: 127.051061088913,
          latitude: 37.2778793750527,
        },
        buildingId: 4248,
      },
      {
        coordinateDto: {
          longitude: 127.051013980667,
          latitude: 37.277580700609,
        },
        buildingId: 4250,
      },
      {
        coordinateDto: {
          longitude: 127.050836515601,
          latitude: 37.2775998790001,
        },
        buildingId: 4252,
      },
      {
        coordinateDto: {
          longitude: 127.050873027023,
          latitude: 37.2779029731638,
        },
        buildingId: 4254,
      },
      {
        coordinateDto: {
          longitude: 127.05066041173,
          latitude: 37.2776313106865,
        },
        buildingId: 4256,
      },
      {
        coordinateDto: {
          longitude: 127.050490634572,
          latitude: 37.2776814810444,
        },
        buildingId: 4258,
      },
      {
        coordinateDto: {
          longitude: 127.050540647303,
          latitude: 37.277942490982,
        },
        buildingId: 4260,
      },
      {
        coordinateDto: {
          longitude: 127.050367919804,
          latitude: 37.2779658114307,
        },
        buildingId: 4262,
      },
      {
        coordinateDto: {
          longitude: 127.049598659054,
          latitude: 37.2772245803103,
        },
        buildingId: 4264,
      },
      {
        coordinateDto: {
          longitude: 127.049770565615,
          latitude: 37.2771553983871,
        },
        buildingId: 4266,
      },
      {
        coordinateDto: {
          longitude: 127.049923055406,
          latitude: 37.2770520749843,
        },
        buildingId: 4268,
      },
      {
        coordinateDto: {
          longitude: 127.050063024855,
          latitude: 37.2769425395023,
        },
        buildingId: 4270,
      },
      {
        coordinateDto: {
          longitude: 127.050189351336,
          latitude: 37.2768341809899,
        },
        buildingId: 4272,
      },
      {
        coordinateDto: {
          longitude: 127.050315110444,
          latitude: 37.2767209569652,
        },
        buildingId: 4274,
      },
      {
        coordinateDto: {
          longitude: 127.050707818979,
          latitude: 37.2766968217339,
        },
        buildingId: 4276,
      },
      {
        coordinateDto: {
          longitude: 127.050440150504,
          latitude: 37.2765445701962,
        },
        buildingId: 4278,
      },
      {
        coordinateDto: {
          longitude: 127.050555994152,
          latitude: 37.276442973553,
        },
        buildingId: 4280,
      },
      {
        coordinateDto: {
          longitude: 127.050683079314,
          latitude: 37.2762912741476,
        },
        buildingId: 4282,
      },
      {
        coordinateDto: {
          longitude: 127.05079055491,
          latitude: 37.2761546303886,
        },
        buildingId: 4284,
      },
      {
        coordinateDto: {
          longitude: 127.051064018303,
          latitude: 37.276206773078,
        },
        buildingId: 4286,
      },
      {
        coordinateDto: {
          longitude: 127.050817637208,
          latitude: 37.2765218827492,
        },
        buildingId: 4288,
      },
      {
        coordinateDto: {
          longitude: 127.051095021829,
          latitude: 37.2763679557924,
        },
        buildingId: 4290,
      },
      {
        coordinateDto: {
          longitude: 127.051127606549,
          latitude: 37.2765328320761,
        },
        buildingId: 4292,
      },
      {
        coordinateDto: {
          longitude: 127.050846507091,
          latitude: 37.2766965820382,
        },
        buildingId: 4294,
      },
      {
        coordinateDto: {
          longitude: 127.05115850131,
          latitude: 37.2766995111567,
        },
        buildingId: 4296,
      },
      {
        coordinateDto: {
          longitude: 127.050877628569,
          latitude: 37.2768658741067,
        },
        buildingId: 4298,
      },
      {
        coordinateDto: {
          longitude: 127.051180978632,
          latitude: 37.276923860431,
        },
        buildingId: 4300,
      },
      {
        coordinateDto: {
          longitude: 127.050908960648,
          latitude: 37.2770128202773,
        },
        buildingId: 4302,
      },
      {
        coordinateDto: {
          longitude: 127.051214240006,
          latitude: 37.2770882858626,
        },
        buildingId: 4304,
      },
      {
        coordinateDto: {
          longitude: 127.051208697951,
          latitude: 37.2772295713426,
        },
        buildingId: 4306,
      },
      {
        coordinateDto: {
          longitude: 127.051270145512,
          latitude: 37.2773896595616,
        },
        buildingId: 4308,
      },
      {
        coordinateDto: {
          longitude: 127.050934336,
          latitude: 37.2771882418651,
        },
        buildingId: 4310,
      },
      {
        coordinateDto: {
          longitude: 127.050979598515,
          latitude: 37.2774260068498,
        },
        buildingId: 4312,
      },
      {
        coordinateDto: {
          longitude: 127.050780679935,
          latitude: 37.2772322786326,
        },
        buildingId: 4314,
      },
      {
        coordinateDto: {
          longitude: 127.050757427006,
          latitude: 37.2770266712601,
        },
        buildingId: 4316,
      },
      {
        coordinateDto: {
          longitude: 127.050725431383,
          latitude: 37.2768986471763,
        },
        buildingId: 4318,
      },
      {
        coordinateDto: {
          longitude: 127.050798648123,
          latitude: 37.2774596934297,
        },
        buildingId: 4320,
      },
    ],
    buildingCount: 96,
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
