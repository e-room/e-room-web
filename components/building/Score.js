import parseFloat from "utils/parseFloat";

import Score from "components/common/atoms/Score";

export default ({ building }) => {
  const { buildingSummaries } = building;
  const {
    RESIDENCESATISFACTION,
    TRAFFIC,
    BUILDINGCOMPLEX,
    INTERNAL,
    SURROUNDING,
    LIVINGLOCATION,
  } = buildingSummaries;

  const totalScore = RESIDENCESATISFACTION;
  const DetailFields = [
    { title: "교통", score: TRAFFIC ?? 0 },
    { title: "건물/단지", score: BUILDINGCOMPLEX ?? 0 },
    { title: "내부", score: INTERNAL ?? 0 },
    { title: "주변/환경", score: SURROUNDING ?? 0 },
    { title: "생활/입지", score: LIVINGLOCATION ?? 0 },
  ];

  return (
    <div className="flex flex-col py-[12px] px-[20px] bg-white">
      <div className="flex justify-between">
        <div className="flex flex-col gap-[12px]">
          {DetailFields.map((value) => {
            return (
              <div
                className="flex items-center justify-between"
                key={value.title}
              >
                <div className="min-w-[84px] text-body-bold-3 text-black">
                  {value.title}
                </div>
                <div className="flex items-center mr-[36px]">
                  <div className="text-caption-bold-2 text-primary-1 mr-[6px]">
                    {parseFloat(value.score, 1)}
                  </div>
                  <Score
                    size="sm"
                    readOnly={true}
                    value={parseFloat(value.score, 1)}
                    allowFraction={true}
                  />
                </div>
              </div>
            );
          })}
        </div>
        <div className="flex flex-col justify-center items-center w-full border-l border-gray-4">
          <div className="text-body-bold-3 text-black">총 만족도</div>
          <div className="text-display-2 text-primary-1">
            {parseFloat(totalScore, 1)}
          </div>
        </div>
      </div>
    </div>
  );
};
