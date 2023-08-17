import Logo from "assets/pic.png";
import Score from "components/common/atoms/Score";
import parseFloat from "utils/parseFloat";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getMarkingDetailDataByBuildingId } from "services/building.service";

export default ({ id }) => {
  const router = useRouter();
  const goBuildingDetailView = () => {
    router.push(`/building/${id}`);
  };
  const [building, setBuilding] = useState({
    name: "",
    avgScore: 0,
    reviewCnt: 0,
  });
  const getBuilding = async () => {
    return await getMarkingDetailDataByBuildingId(id).then((response) => {
      const value = response.data;
      const name =
        value.name === ""
          ? `${value.address.roadName} ${value.address.buildingNumber}`
          : value.name;

      setBuilding({
        name,
        avgScore: value.avgScore,
        reviewCnt: value.reviewCnt,
      });
    });
  };

  useEffect(() => {
    getBuilding();
  }, [id]);

  return (
    <div
      className="flex gap-[12px] cursor-pointer bg-white max-w-[320px] max-h-[88px] box-border rounded-[12px] p-[8px] mt-[8px]"
      style={{ width: "calc(100vw - 40px)" }}
      onClick={goBuildingDetailView}
    >
      <img src={Logo.src} width={72} height={72} className="rounded-[8px]" />
      <div className="flex flex-col justify-center gap-[4px]">
        <div className="text-body-bold-2 text-black min-h-[24px]">
          {building.name}
        </div>
        <div className="flex items-center max-h-[16px]">
          <div className="text-caption-2 mr-[8px] text-black/50">
            리뷰 {building.reviewCnt}개
          </div>
          <div className="text-caption-bold-2 text-primary-1">
            {parseFloat(building.avgScore, 1)}
          </div>
          <div className="mt-[3px]">
            <Score
              size="sm"
              readOnly={true}
              value={building.avgScore}
              allowFraction={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
