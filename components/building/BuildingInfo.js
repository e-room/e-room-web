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

export default function BuildingInfo({ building }) {
  const DetailFields = [
    { title: "교통", score: 78 },
    { title: "건물/단지", score: 56 },
    { title: "내부", score: 100 },
    { title: "주변/환경", score: 20 },
    { title: "생활/입지", score: 88 },
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
        message={"도로명 주소를 클립보드에 복사했어요"}
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
      <InfoField>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div>
            <Title>{building.name}</Title>
            {/* &gt; = ">" */}
            <AddressField onClick={() => onCopyAddress(formValue.address)}>
              {formValue.address} &gt;
            </AddressField>
          </div>
          <BuildingBadge width={48} height={64} />
        </div>
      </InfoField>
      <Button style={{ margin: "18px 0" }} size={"lg"}>
        <ButtonField>
          <div className="btn-group">
            <div className="btn-logo">
              <Icon icon={"logo-white"} size={"lg"} />
            </div>
            <div className="btn-title">직거래 가능한 호실이 있어요</div>
          </div>
          <div className="btn-sub">문의하기</div>
        </ButtonField>
      </Button>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <DetailScoreField>
          {DetailFields.map((value) => {
            return (
              <div className="field" key={value.title}>
                <div className="title">{value.title}</div>
                <ScoreField>
                  <div className="score">4.5</div>
                  <Icon icon={"star-filled"} size={"sm"} />
                  <Icon icon={"star-filled"} size={"sm"} />
                  <Icon icon={"star-filled"} size={"sm"} />
                  <Icon icon={"star-filled"} size={"sm"} />
                  <Icon icon={"star-half"} size={"sm"} />
                </ScoreField>
              </div>
            );
          })}
        </DetailScoreField>
        <TotalBox>
          <TotalTitle>총 만족도</TotalTitle>
          <TotalScore>4.5</TotalScore>
        </TotalBox>
      </div>
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

const InfoField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Title = styled.div`
  ${Title1}
  color: var(--black);
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

const AddressField = styled.div`
  ${Caption1Bold}
  color: var(--primary-1);

  margin-top: 8px;
`;

const ButtonField = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;

  .btn-group {
    display: flex;
    align-items: center;
  }

  .btn-logo {
    display: flex;
    margin-right: 8px;
  }

  .btn-title {
    ${Body3Bold}

    color: var(--white);
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
