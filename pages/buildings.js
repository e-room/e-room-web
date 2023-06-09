import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import styled from "@emotion/styled";

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
          fill={popupVisible ? "fill-primary-1" : "fill-black"}
          onClick={() => setPopupVisible(true)}
        />
      }
    >
      <Popup
        visible={popupVisible}
        title={
          <div className="flex items-center">
            <Icon icon={"filter-stroke"} size={"md"} />
            <div className="ml-[8px]">정렬</div>
          </div>
        }
        titleAlign={"left"}
        buttonType={"default"}
        cancelText="취소"
        submitText="필터 적용하기"
        onCancelClick={onHideClick}
        onConfirmClick={onConfirmClick}
      >
        <Contents>
          <div className="text-body-bold-2 text-black">정렬 순서</div>
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
        <div className="pb-[150px]">
          {parseData.length > 0 ? (
            <BuildingList data={parseData} sort={filterValue.value} />
          ) : (
            <NoData />
          )}
        </div>
        <div className="fixed bottom-[64px] w-full max-w-[720px] flex justify-center">
          <Link href={"/"}>
            <a>
              <Button type={"secondary"} size={"md"} icon={"map-marked"}>
                지도로 돌아가기
              </Button>
            </a>
          </Link>
        </div>
      </Container>
    </AppLayout>
  );
}

export const Container = styled.div`
  height: calc(100vh - 100px);
`;

const Contents = styled.div`
  display: grid;
  grid-template-columns: 3fr 4fr;
  align-items: center;
  padding: 0 6px;
`;
