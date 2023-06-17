import Chip from "components/common/atoms/Chip";
import Score from "components/common/atoms/Score";
import Logo from "assets/img_room_default.svg";
import parseFloat from "utils/parseFloat";
import { SCORE_CHIP } from "codes/codeType";
import { useRouter } from "next/router";
import logEvent from "amplitude/logEvent";

export default (props) => {
  const { item } = props;
  const router = useRouter();
  const goBuildingDetail = (buildingId) => {
    logEvent({
      name: "click-bulidings-builduing_item",
      property: { buildingID: buildingId },
    });
    return router.push(`/building/${buildingId}`);
  };

  return item.map((value) => {
    return (
      <div
        key={value.buildingId}
        className="cursor-pointer"
        onClick={() => goBuildingDetail(value.buildingId)}
      >
        <div className="flex border-t border-gray-4 bg-white">
          <div className="w-[122px] h-[122px]">
            <Logo width={122} height={122} />
          </div>
          <div className="px-[20px] py-[12px]">
            <div className="text-body-bold-2 break-words overflow-ellipsis line-clamp-1">
              {value.name === ""
                ? `${value.address.roadName} ${value.address.buildingNumber}`
                : value.name}
            </div>
            <div className="text-caption-2 text-black/[0.5] overflow-hidden whitespace-nowrap	text-ellipsis">
              {value.address.siDo} {value.address.siGunGu}{" "}
              {value.address.roadName} {value.address.buildingNumber}
            </div>
            <div className="flex gap-[4px] my-[9px]">
              {value.directDeal && <Chip label={"직거래가능"} />}
              {value.bestCategory && (
                <Chip
                  label={SCORE_CHIP[value.bestCategory]}
                  type={"secondary"}
                />
              )}
            </div>
            <div className="flex items-center max-h-[16px]">
              <div className="text-caption-2 text-black/[0.5] mr-[8px]">
                리뷰 {value.reviewCnt}개
              </div>
              <div className="text-caption-bold-2 text-primary-1">
                {parseFloat(value.avgScore, 1)}
              </div>
              <div className="mb-[2px]">
                <Score
                  size="sm"
                  readOnly={true}
                  value={value.avgScore}
                  allowFraction={true}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  });
};
