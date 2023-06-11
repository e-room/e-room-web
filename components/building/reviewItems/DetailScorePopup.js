import Popup from "components/common/atoms/Popup";
import Score from "components/common/atoms/Score";
import parseFloat from "utils/parseFloat";

export default ({ value, showTotalScore, setShowTotalScore }) => {
  const { traffic, buildingComplex, internal, surrounding, livingLocation } =
    value.reviewScoreDto;
  const DetailFields = [
    { title: "교통", score: traffic ?? 0 },
    { title: "건물/단지", score: buildingComplex ?? 0 },
    { title: "내부", score: internal ?? 0 },
    { title: "주변/환경", score: surrounding ?? 0 },
    { title: "생활/입지", score: livingLocation ?? 0 },
  ];

  return (
    <Popup
      title={`${value.authorDto.name}님의 세부 점수`}
      visible={showTotalScore}
      buttonType={"confirm"}
      confirmText={"닫기"}
      onConfirmClick={() => {
        document.body.style.overflow = "unset";
        setShowTotalScore(false);
      }}
    >
      <div className="flex flex-col items-center gap-[8px]">
        {DetailFields.map((val) => {
          return (
            <div className="flex items-center" key={val.title}>
              <div className="min-w-[84px] text-body-bold-3 text-black">
                {val.title}
              </div>
              <div className="flex items-center">
                <div className="text-caption-bold-2 text-primary-1 mr-[6px]">
                  {parseFloat(val.score, 1)}
                </div>
                <Score
                  size="sm"
                  readOnly={true}
                  value={parseFloat(val.score, 1)}
                  allowFraction={true}
                />
              </div>
            </div>
          );
        })}
      </div>
    </Popup>
  );
};
