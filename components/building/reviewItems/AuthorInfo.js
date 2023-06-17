import dayjs from "dayjs";
import Avatar from "components/common/atoms/Avatar";
import Score from "components/common/atoms/Score";
import parseFloat from "utils/parseFloat";

export default ({ value, onScorePopup, onDeletePopup, profile }) => {
  const showDelete = profile?.id && profile.id === value.authorDto.id;
  const { residenceSatisfaction } = value.reviewScoreDto;
  return (
    <div className="flex items-center">
      <Avatar
        size={"md"}
        img={value.authorDto.picture}
        style={{ marginRight: 6 }}
      />
      <div className="flex flex-col w-full">
        <div className="text-caption-bold-2 text-primary-1 flex items-center">
          <div className="mb-[2px]">
            <Score
              size="sm"
              readOnly={true}
              value={parseFloat(residenceSatisfaction, 1)}
              allowFraction={true}
            />
          </div>
          <div className="ml-[6px]">{parseFloat(residenceSatisfaction, 1)}</div>
        </div>
        <div className="text-caption-2 text-gray-1">
          {value.authorDto.name} |{" "}
          {dayjs(value.reviewBaseDto.createdAt).format("YY.MM.DD.")} |{" "}
          <span
            className="border-b border-gray-1 cursor-pointer"
            onClick={() => onScorePopup(value)}
          >
            세부점수 보기
          </span>
        </div>
      </div>
      <div>
        {showDelete && (
          <div
            className="text-caption-bold-1 text-danger-1 w-[25px] cursor-pointer"
            onClick={() => onDeletePopup(value)}
          >
            삭제
          </div>
        )}
      </div>
    </div>
  );
};
