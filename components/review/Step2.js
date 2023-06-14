import { useRecoilState } from "recoil";
import { reviewFormState } from "states/reviewAtom";

import Score from "components/common/atoms/Score";

export default function ReviewForm2() {
  const [formValue, setFormValue] = useRecoilState(reviewFormState);
  const { traffic, buildingComplex, surrounding, internal, livingLocation } =
    formValue.reviewScoreDto;

  const onClick = (rate, name) =>
    setFormValue({
      ...formValue,
      reviewScoreDto: {
        ...formValue.reviewScoreDto,
        [name]: rate,
      },
    });
  const forms = [
    {
      key: "traffic",
      label: "교통점수",
      description: "버스, 지하철 등 교통수단 이용이 편리한가요?",
      value: traffic,
    },
    {
      key: "buildingComplex",
      label: "건물 및 단지 점수",
      description: "주차나 보안, 부대시설 등에 만족하시나요?",
      value: buildingComplex,
    },
    {
      key: "internal",
      label: "내부 점수",
      description: "채광, 환기, 수납, 방음 등에 만족하시나요?",
      value: internal,
    },
    {
      key: "surrounding",
      label: "주변 및 환경 점수",
      description: "치안, 공원 및 자연환경 등에 만족하시나요?",
      value: surrounding,
    },
    {
      key: "livingLocation",
      label: "생활 및 입지 점수",
      description: "학군, 식당, 카페, 마트 등 인프라가 잘 갖추어져 있나요?",
      value: livingLocation,
    },
  ];

  return (
    <div className="animate-page-up flex flex-col p-[20px] text-center pb-[100px] bg-white">
      {forms.map((item) => {
        return (
          <div className="flex flex-col mb-[40px]" key={item.key}>
            <div className="text-body-bold-2 mb-[4px]">{item.label}</div>
            <div className="text-body-3">{item.description}</div>
            <div className="flex justify-center">
              <Score
                size="xl"
                onClick={(e) => onClick(e, item.key)}
                value={item.value}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
