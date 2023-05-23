import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import styled from "@emotion/styled";

import Banner1 from "assets/banner/banner1.png";
import { Body2Bold } from "styles/typography";

import AppLayout from "components/common/AppLayout";
import Button from "components/common/atoms/Button";
import BuildingList from "components/building/BuildingList";
import Icon from "components/common/atoms/Icon";
import Popup from "components/common/atoms/Popup";
import Select from "components/common/atoms/Select";
import Loading from "components/common/lottie/Loading";
import Error from "components/common/Error";
import NoData from "components/common/atoms/NoData";
import logEvent from "amplitude/logEvent";

export default function buildings() {
  const [parseData, setParseData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const filterOptions = [
    { value: "reviewCnt", label: "리뷰수 순" },
    { value: "avgScore", label: "별점 높은 순" },
  ];
  const [filterValue, setFilterValue] = useState(filterOptions[0]);
  const onFilterChange = (e) => {
    setFilterValue(e);
  };

  const [popupVisible, setPopupVisible] = useState(false);
  const onHideClick = () => {
    setPopupVisible(false);
  };
  const onConfirmClick = async () => {
    setLoading(true);
    const buildingMarking = localStorage.getItem("buildingMarking");
    setParseData([]);
    await axios
      .get(
        `/apis/building?buildingIds=${buildingMarking}&size=10&sort=${filterValue.value},id,DESC`
      )
      .then((response) => {
        setParseData(response.data.content);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error.message);
        setLoading(false);
        setError(true);
      });
    setPopupVisible(false);
  };

  const getData = async () => {
    const buildingMarking = localStorage.getItem("buildingMarking");
    await axios
      .get(
        `/apis/building?buildingIds=${buildingMarking}&size=10&sort=${filterValue.value},id,DESC`
      )
      .then((response) => {
        setParseData(response.data.content);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error.message);
        setLoading(false);
        setError(true);
      });
  };

  useEffect(() => {
    logEvent({ name: "view-buildings" });
    getData();
  }, []);

  if (loading) return <Loading />;
  if (error) return <Error />;

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
            <Icon icon={"filter-stroke"} size={"md"} />
            <div className="title">정렬</div>
          </FilterPopupTitle>
        }
        titleAlign={"left"}
        buttonType={"default"}
        cancelText="취소"
        submitText="필터 적용하기"
        onCancelClick={onHideClick}
        onConfirmClick={onConfirmClick}
      >
        <Contents>
          <SubText>정렬 순서</SubText>
          <Select
            size={"md"}
            value={filterValue}
            onChange={onFilterChange}
            options={filterOptions}
            label={"label"}
          />
        </Contents>
      </Popup>
      <Container>
        <div style={{ paddingBottom: 150 }}>
          {/* <Banner>
            <img src={Banner1.src} width={"100%"} height={"100%"} />
          </Banner> */}
          {parseData.length > 0 ? (
            <BuildingList data={parseData} sort={filterValue.value} />
          ) : (
            <NoData />
          )}
        </div>
        <ButtonGroup>
          <Link href={"/"}>
            <a>
              <Button type={"secondary"} size={"md"} icon={"map-marked"}>
                지도로 돌아가기
              </Button>
            </a>
          </Link>
        </ButtonGroup>
      </Container>
    </AppLayout>
  );
}

export const Container = styled.div`
  height: calc(100vh - 100px);
`;

const ButtonGroup = styled.div`
  position: fixed;
  bottom: 64px;
  width: 100%;
  max-width: 720px;
  display: flex;
  justify-content: center;
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
  display: grid;
  grid-template-columns: 3fr 4fr;
  align-items: center;
  padding: 0 6px;
`;

const SubText = styled.div`
  ${Body2Bold}
  color: var(--black);
`;
