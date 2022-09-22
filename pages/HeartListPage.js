import { useState } from "react";
import AppLayout from "../components/common/AppLayout";
import Button from "../components/common/atoms/Button";
import Icon from "../components/common/atoms/Icon";
import Popup from "../components/common/atoms/Popup";

import styled from "@emotion/styled";
import { Body2Bold } from "../styles/typography";
import CheckBox from "../components/common/atoms/CheckBox";

export default function HeartListPage() {
  const [popupVisible, setPopupVisible] = useState(true);
  const onHideClick = () => {
    setPopupVisible(false);
  };

  return (
    <AppLayout appBarObject={{ headerText: "찜한 자취방" }}>
      찜 목록
      <div onClick={() => setPopupVisible(true)}>버튼!!</div>
      {popupVisible && (
        <Popup
          onHideClick={onHideClick}
          title={
            <>
              <Icon icon={"filter-stroke"} />
              <div style={{ marginLeft: 8 }}>필터</div>
            </>
          }
          titleAlign={"left"}
        >
          <Contents>
            <SubText>직거래 가능한 방만 보기</SubText>
            <CheckBox />
          </Contents>
          <ButtonGroup>
            <Button label={"취소"} size={"sm"} type={"secondary"} width={"100%"} />
            <Button label={"필터 적용하기"} size={"sm"} type={"primary"} width={"100%"} />
          </ButtonGroup>
        </Popup>
      )}
    </AppLayout>
  );
}

const Contents = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 6px;
`;

const SubText = styled.div`
  ${Body2Bold}
  color: var(--black);
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 8px;
`;
