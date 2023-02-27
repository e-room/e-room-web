import { useEffect, useMemo, useState } from "react";
import styled from "@emotion/styled";

import TrafficBadge from "assets/illust-badge/illust-badge-traffic.svg";
import BuildingComplexBadge from "assets/illust-badge/illust-badge-building.svg";
import InternalBadge from "assets/illust-badge/illust-badge-inside.svg";
import SurroundingBadge from "assets/illust-badge/illust-badge-environment.svg";
import LivingLocationBadge from "assets/illust-badge/illust-badge-life.svg";
import { Caption1Bold, Title1 } from "styles/typography";

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
    <Container>
      {toast}
      <FlexBox>
        <NameField>
          <Title>
            {building.name === ""
              ? `${building.address.roadName} ${building.address.buildingNumber}`
              : building.name}
          </Title>
          {/* &gt; = ">" */}
          <AddressField
            onClick={() => onCopyAddress(formValue.address)}
            className="cursor-pointer"
          >
            {formValue.address} &gt;
          </AddressField>
        </NameField>
        {badge}
      </FlexBox>
    </Container>
  );
};
const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 12px 20px;
  background-color: var(--white);
`;

const FlexBox = styled.div`
  display: flex;
  justify-content: space-between;
`;

const NameField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Title = styled.div`
  ${Title1}
  color: var(--black);

  word-break: break-word;
  text-overflow: ellipsis;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
`;

const AddressField = styled.div`
  ${Caption1Bold}
  color: var(--primary-1);
`;
