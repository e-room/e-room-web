import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import styled from "@emotion/styled";

import Banner1 from "assets/banner/banner1.png";

import AppLayout from "components/common/AppLayout";
import Button from "components/common/atoms/Button";
import BuildingList from "components/building/BuildingList";
import Icon from "components/common/atoms/Icon";
import Popup from "components/common/atoms/Popup";
import CheckBox from "components/common/atoms/CheckBox";
import { Body2Bold } from "styles/typography";

export default function buildings() {
  const [parseData, setParseData] = useState([]);

  useEffect(() => {
    const buildingMarking = localStorage.getItem("buildingMarking");

    axios
      .get(`/apis/building?buildingIds=${buildingMarking}&size=10&sort=DESC`, {
        headers: {
          mocking: 239,
        },
      })
      .then((res) => {
        setParseData(res.data.content);
      });
  }, []);

  const [popupVisible, setPopupVisible] = useState(false);
  const onHideClick = () => {
    setPopupVisible(false);
  };

  const [filterChecked, setFilterChecked] = useState(true);

  return (
    <AppLayout
      pageTitle={"이 지역 자취방"}
      additionalFunction={
        <Icon
          icon={popupVisible ? "filter-fill" : "filter-stroke"}
          size={"md"}
          fill={popupVisible ? "var(--primary-1)" : "var(--black)"}
          onClick={() => setPopupVisible(true)}
        />
      }
    >
      <Popup
        visible={popupVisible}
        title={
          <FilterPopupTitle>
            <Icon icon={"filter-stroke"} />
            <div className="title">필터</div>
          </FilterPopupTitle>
        }
        titleAlign={"left"}
        buttonType={"default"}
        cancelText="취소"
        submitText="필터 적용하기"
        onCancelClick={onHideClick}
      >
        <Contents>
          <SubText>직거래 가능한 방만 보기</SubText>
          <CheckBox
            onChange={() => setFilterChecked(!filterChecked)}
            checked={filterChecked}
          />
        </Contents>
      </Popup>
      <Container>
        <div style={{ paddingBottom: 150 }}>
          <Banner>
            <img src={Banner1.src} width={"100%"} height={"100%"} />
          </Banner>
          {parseData.length > 0 ? (
            <BuildingList data={parseData} />
          ) : (
            <div>no data</div>
          )}
        </div>
        <ButtonGroup>
          <Link href={"/review/write"}>
            <a>
              <Button type={"primary"} size={"md"} icon={"plus"}>
                리뷰 쓰기
              </Button>
            </a>
          </Link>
        </ButtonGroup>
      </Container>
    </AppLayout>
  );
}

const Container = styled.div`
  height: calc(100vh - 112px);
  background-color: #fafafa !important;
  overflow: scroll;
`;

const ButtonGroup = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  position: fixed;
  bottom: 64px;
`;
const Banner = styled.div`
  width: 100%;
  height: 84px;
  background-color: var(--primary-5);
`;

const FilterPopupTitle = styled.div`
  display: flex;
  align-items: center;
  .title {
    margin-left: 8px;
  }
`;
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
