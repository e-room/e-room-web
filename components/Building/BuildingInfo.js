import styled from "@emotion/styled";
import Button from "components/common/atoms/Button";
import Icon from "components/common/atoms/Icon";
import BarFilled from "assets/icon/bar-filled.svg";
import BarUnFilled from "assets/icon/bar-unfilled.svg";
import Toggle from "components/common/atoms/Toggle";
import {
  Body3,
  Body3Bold,
  Caption1,
  Caption1Bold,
  Caption2Bold,
  Title1,
} from "styles/typography";
import { useState } from "react";

export default function BuildingInfo() {
  const DetailFields = [
    { title: "교통", score: 78 },
    { title: "건물/단지", score: 56 },
    { title: "내부", score: 100 },
    { title: "주변/환경", score: 20 },
    { title: "생활/입지", score: 88 },
  ];

  const Rooms = [
    { label: "전체", value: "all" },
    { label: "102호", value: "102" },
    { label: "106호", value: "106" },
    { label: "201호", value: "201" },
    { label: "307호", value: "307" },
    { label: "402호", value: "402" },
    { label: "505호", value: "505" },
  ];

  const formValue = {
    address: "경기 수원시 영통구 덕영대로 112-3",
  };

  const [toastVisible, setToastVisible] = useState(false);
  const onCopyAddress = (copyText) => {
    navigator.clipboard.writeText(copyText).then(() => {
      setToastVisible(true);
    });
  };

  return (
    <Container>
      <InfoField>
        <Title>뉴아트빌</Title>
        <ScoreField>
          <div className="score">4.5</div>
          <Icon icon={"star-filled"} size={"sm"} />
          <Icon icon={"star-filled"} size={"sm"} />
          <Icon icon={"star-filled"} size={"sm"} />
          <Icon icon={"star-filled"} size={"sm"} />
          <Icon icon={"star-filled"} size={"sm"} />
        </ScoreField>
        {/* &gt; = ">" */}
        <AddressField onClick={() => onCopyAddress(formValue.address)}>
          {formValue.address} &gt;
        </AddressField>
      </InfoField>
      <Button style={{ margin: "18px 0" }}>
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
      <DetailScoreField>
        {DetailFields.map((value) => {
          return (
            <div className="field" key={value.title}>
              <div className="title">{value.title}</div>
              <div className="score">{value.score}점</div>
              <div className="bar">
                {/* TODO: svg width 작을수록 얇아지는거? 왜이럼.. */}
                {/* <div className="fill">
                  <BarFilled width={`${value.score}%`} height={"4"} />
                </div>
                <div className="un-fill">
                  <BarUnFilled width={"100%"} height={"4"} />
                </div> */}
              </div>
            </div>
          );
        })}
      </DetailScoreField>
      <RoomField>
        {Rooms.map((value) => {
          return <Toggle className="toggle" label={value.label} key={value.value} />;
        })}
      </RoomField>
    </Container>
  );
}

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
  ${Caption2Bold}
  color: var(--black);

  display: flex;
  align-items: center;

  .score {
    margin-right: 6px;
  }
  svg {
    fill: var(--black);
  }
`;

const AddressField = styled.div`
  ${Caption1Bold}
  color: var(--primary-1);
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
      min-width: 70px;
      ${Body3Bold}
      color: var(--black);
    }
    .score {
      min-width: 40px;
      ${Body3}
      color: var(--black);
    }
    .bar {
      display: flex;

      .fill {
        z-index: 2;
        position: absolute;
        display: flex;
      }
      .un-fill {
        z-index: 1;
        position: relative;
        display: flex;
      }
    }
  }
`;

const RoomField = styled.div`
  display: flex;
  margin: 12px 0;
  gap: 4px;
  overflow-x: auto;

  scrollbar-width: none;
  -ms-overflow-style: none;

  ::-webkit-scrollbar {
    display: none;
  }

  .toggle {
    white-space: nowrap;
  }
`;
