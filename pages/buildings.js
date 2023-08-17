import { useEffect, useState } from "react";
import Link from "next/link";

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
import { BOUNDS_POSITIONS } from "constants/localStorageType";
import { getBuildings } from "services/building.service";

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
    const buildingIds = localStorage.getItem(BOUNDS_POSITIONS);
    setParseData([]);
    await getBuildings({
      buildingIds: buildingIds,
      size: 10,
      sort: `${filterValue.value},id,DESC`,
    })
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
    const buildingIds = localStorage.getItem(BOUNDS_POSITIONS);
    await getBuildings({
      buildingIds: buildingIds,
      size: 10,
      sort: `${filterValue.value},id,DESC`,
    })
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

  const onVisibleFilterPopup = () => {
    setPopupVisible(true);
  };

  if (loading) return <Loading />;
  if (error) return <Error />;

  return (
    <AppLayout
      pageTitle={"이 지역 자취방"}
      additionalFunction={
        <div onClick={onVisibleFilterPopup}>
          <Icon
            icon={popupVisible ? "filter-fill" : "filter-stroke"}
            size={"md"}
            fill={popupVisible ? "fill-primary-1" : "fill-black"}
          />
        </div>
      }
    >
      {popupVisible && (
        <Popup
          visible={popupVisible}
          title={
            <div className="flex items-center">
              <Icon icon={"filter-stroke"} size={"md"} fill="fill-gray-2" />
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
          <div className="grid grid-cols-2 items-center px-[6px]">
            <div className="text-body-bold-2 text-black">정렬 순서</div>
            <Select
              size={"md"}
              value={filterValue}
              onChange={onFilterChange}
              options={filterOptions}
              label={"label"}
            />
          </div>
        </Popup>
      )}

      <div className="h-[calc(100vh-100px)]">
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
      </div>
    </AppLayout>
  );
}
