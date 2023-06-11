import { useEffect, useMemo, useState } from "react";

import TrafficBadge from "assets/illust-badge/illust-badge-traffic.svg";
import BuildingComplexBadge from "assets/illust-badge/illust-badge-building.svg";
import InternalBadge from "assets/illust-badge/illust-badge-inside.svg";
import SurroundingBadge from "assets/illust-badge/illust-badge-environment.svg";
import LivingLocationBadge from "assets/illust-badge/illust-badge-life.svg";
import amplitude from "amplitude-js";

import Toast from "components/common/atoms/Toast";

export default ({ building }) => {
  const { buildingSummaries } = building;
  const { TRAFFIC, BUILDINGCOMPLEX, INTERNAL, SURROUNDING, LIVINGLOCATION } =
    buildingSummaries;

  const badge = useMemo(() => {
    const badges = [
      <TrafficBadge width={48} height={64} />,
      <BuildingComplexBadge width={48} height={64} />,
      <InternalBadge width={48} height={64} />,
      <SurroundingBadge width={48} height={64} />,
      <LivingLocationBadge width={48} height={64} />,
    ];
    const score = [
      TRAFFIC,
      BUILDINGCOMPLEX,
      INTERNAL,
      SURROUNDING,
      LIVINGLOCATION,
    ];

    const max = Math.max(...score);
    const index = score.indexOf(max);

    return badges[index];
  }, []);

  const formValue = {
    address: `${building.address.siDo} ${building.address.siGunGu} ${building.address.roadName} ${building.address.buildingNumber}`,
  };

  const [toastVisible, setToastVisible] = useState(false);
  const onCopyAddress = (copyText) => {
    const event = "copy address";
    amplitude.getInstance().logEvent(event);
    navigator.clipboard.writeText(copyText).then(() => {
      setToastVisible(true);
    });
  };

  const toast = useMemo(() => {
    return (
      <Toast
        icon={"check-circle"}
        iconColor={"success"}
        text={"주소를 클립보드에 복사했어요."}
        visible={toastVisible}
      />
    );
  }, [toastVisible]);

  useEffect(() => {
    if (toastVisible) {
      setTimeout(() => {
        setToastVisible(false);
      }, 1000);
    }
  }, [toastVisible]);

  return (
    <div className="flex flex-col py-[12px] px-[20px] bg-white">
      {toast}
      <div className="flex justify-between">
        <div className="flex flex-col gap-[8px]">
          <div className="text-title-1 text-black truncate">
            {building.name === ""
              ? `${building.address.roadName} ${building.address.buildingNumber}`
              : building.name}
          </div>
          {/* &gt; = ">" */}
          <div
            onClick={() => onCopyAddress(formValue.address)}
            className="cursor-pointer text-caption-bold-1 text-primary-1"
          >
            {formValue.address} &gt;
          </div>
        </div>
        {badge}
      </div>
    </div>
  );
};
