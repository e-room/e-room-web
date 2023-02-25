import { useEffect, useMemo, useState } from "react";
import styled from "@emotion/styled";

import TrafficBadge from "assets/illust-badge/illust-badge-traffic.svg";
import BuildingComplexBadge from "assets/illust-badge/illust-badge-building.svg";
import InternalBadge from "assets/illust-badge/illust-badge-inside.svg";
import SurroundingBadge from "assets/illust-badge/illust-badge-environment.svg";
import LivingLocationBadge from "assets/illust-badge/illust-badge-life.svg";
import {
  Body3Bold,
  Caption1Bold,
  Caption2Bold,
  Title1,
  Display2,
} from "styles/typography";
import parseFloat from "utils/parseFloat";

import Button from "components/common/atoms/Button";
import Toast from "components/common/atoms/Toast";
import Score from "components/common/atoms/Score";

export default function BuildingInfo({ building }) {
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

      <FlexBox style={{ marginBottom: 18 }}>
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

      {/* TODO: 직거래 기능 풀리면 주석 해제 */}
      {/* <ButtonField size={"lg"}>
        <div className="btn-group">
          <Icon icon={"logo-white"} size={"lg"} />
          <div className="btn-title">직거래 가능한 호실이 있어요</div>
        </div>
        <div className="btn-sub">문의하기</div>
      </ButtonField> */}

      <FlexBox>
        <DetailScoreField>
          {DetailFields.map((value) => {
            return (
              <div className="field" key={value.title}>
                <div className="title">{value.title}</div>
                <ScoreField>
                  <div className="score">{parseFloat(value.score, 1)}</div>
                  <Score
                    size="sm"
                    readOnly={true}
                    value={parseFloat(value.score, 1)}
                    allowFraction={true}
                  />
                </ScoreField>
              </div>
            );
          })}
        </DetailScoreField>
        <TotalBox>
          <TotalTitle>총 만족도</TotalTitle>
          <TotalScore>{parseFloat(totalScore, 1)}</TotalScore>
        </TotalBox>
      </FlexBox>
    </Container>
  );
}

const TotalBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;

  border-left: 1px solid #e9e9e9;
`;

const TotalTitle = styled.div`
  ${Body3Bold}
  color: var(--black);
`;
const TotalScore = styled.div`
  ${Display2}
  color: var(--primary-1);
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 12px 20px;
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

const ScoreField = styled.div`
  display: flex;
  align-items: center;
  margin-right: 36px;

  .score {
    ${Caption2Bold}
    color: var(--primary-1);

    margin-right: 6px;
  }
  svg {
    fill: var(--primary-1);
  }
`;

const ButtonField = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  color: var(--white);
  margin: 18px 0;

  .btn-group {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .btn-title {
    ${Body3Bold}
  }

  .btn-sub {
    ${Caption2Bold}
  }
`;

const DetailScoreField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;

  .field {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .title {
      min-width: 84px;
      ${Body3Bold}
      color: var(--black);
    }
  }
`;
