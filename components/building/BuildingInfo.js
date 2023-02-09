import { useEffect, useMemo, useState } from "react";
import styled from "@emotion/styled";
import BuildingBadge from "assets/illust-badge/illust-badge-building.svg";

import Button from "components/common/atoms/Button";
import Icon from "components/common/atoms/Icon";
import {
  Body3Bold,
  Caption1Bold,
  Caption2Bold,
  Title1,
  Display2,
} from "styles/typography";
import Toast from "components/common/atoms/Toast";
import parseFloat from "utils/parseFloat";
import Score from "components/common/atoms/Score";

export default function BuildingInfo({ building }) {
  const { buildingSummaries } = building;
  const totalScore = buildingSummaries.RESIDENCESATISFACTION;
  const DetailFields = [
    { title: "교통", score: buildingSummaries.TRAFFIC ?? 0 },
    { title: "건물/단지", score: buildingSummaries.BUILDINGCOMPLEX ?? 0 },
    { title: "내부", score: buildingSummaries.INTERNAL ?? 0 },
    { title: "주변/환경", score: buildingSummaries.SURROUNDING ?? 0 },
    { title: "생활/입지", score: buildingSummaries.LIVINGLOCATION ?? 0 },
  ];

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
          <Title>{building.name}</Title>
          {/* &gt; = ">" */}
          <AddressField onClick={() => onCopyAddress(formValue.address)}>
            {formValue.address} &gt;
          </AddressField>
        </NameField>
        <BuildingBadge width={48} height={64} />
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
