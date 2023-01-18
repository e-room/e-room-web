import React, { useEffect, useState, useRef, Fragment } from "react";
import { useSetRecoilState } from "recoil";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import styled from "@emotion/styled";

import MarkerPng from "assets/marker4.png";
import { Body2Bold } from "styles/typography";

import { pageTitleState } from "states";

import LocationButton from "components/common/atoms/LocationButton";
import GroupButton from "components/common/atoms/GroupButton";
import MapButton from "components/common/atoms/MapButton";
import Button from "components/common/atoms/Button";
import Icon from "components/common/atoms/Icon";
import AppLayout from "components/common/AppLayout";
import Popup from "components/common/atoms/Popup";
import CheckBox from "components/common/atoms/CheckBox";

const initial = {
  lat: 37.2429616,
  lng: 127.0800525,
};

const MainMap = ({ data }) => {
  const router = useRouter();
  const buildingMarking = JSON.parse(data);
  console.log("buildingMarking", buildingMarking);
  const setPageTitleState = useSetRecoilState(pageTitleState);
  const map = useRef(null);

  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    const $script = document.createElement("script");
    $script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_APP_KEY}&autoload=false&libraries=clusterer`;
    $script.addEventListener("load", () => setMapLoaded(true));
    document.head.appendChild($script);
  }, []);

  useEffect(() => {
    if (!mapLoaded) return;

    kakao.maps.load(() => {
      var container = document.getElementById("map");
      var options = {
        center: new kakao.maps.LatLng(initial.lat, initial.lng),
        level: 8,
      };

      let imageSrc = MarkerPng.src;
      let imageSize = new kakao.maps.Size(61, 68);
      let imageOption = { offset: new kakao.maps.Point(30, 48) };
      var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption);

      map.current = new kakao.maps.Map(container, options);

      // 마커 클러스터러를 생성합니다
      let clusterer = new kakao.maps.MarkerClusterer({
        map: map.current, // 마커들을 클러스터로 관리하고 표시할 지도 객체
        averageCenter: true, // 클러스터에 포함된 마커들의 평균 위치를 클러스터 마커 위치로 설정
        minLevel: 5, // 클러스터 할 최소 지도 레벨
        styles: MarkerClustererStyles,
        gridSize: 88,
      });

      const markers = [];
      buildingMarking.buildingList.forEach((value) => {
        let marker = new kakao.maps.Marker({
          position: new kakao.maps.LatLng(
            value.coordinateDto.latitude,
            value.coordinateDto.longitude
          ),
          clickable: true,
          image: markerImage,
        });
        marker.setMap(map.current);
        kakao.maps.event.addListener(marker, "click", function () {
          router.push(`/building/${value.buildingId}`);
        });
        markers.push(marker);
      });
      clusterer.addMarkers(markers);
    });
  }, [mapLoaded]);

  useEffect(() => {
    setPageTitleState(null);
  }, []);

  //나의 위치로 가게 해주는 함수
  const setMyPosition = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude; // 위도
        const lng = position.coords.longitude; // 경도

        let myPosition = new kakao.maps.LatLng(lat, lng);
        map.current.setCenter(myPosition);
      });
    }
  };

  //줌인
  const zoomIn = () => {
    map.current.setLevel(map.current.getLevel() - 1);
  };
  //줌아웃
  const zoomOut = () => {
    map.current.setLevel(map.current.getLevel() + 1);
  };

  const [popupVisible, setPopupVisible] = useState(false);
  const onHideClick = () => {
    setPopupVisible(false);
  };

  const [filterChecked, setFilterChecked] = useState(true);
  // console.log(filterChecked);
  return (
    <Fragment>
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
      <AppLayout
      // headerIcon={"search"}
      >
        <Container>
          <MapWrapper id="map" />
          <MapContainer>
            <FilterItem>
              <MapButton onClick={() => setPopupVisible(true)} />
            </FilterItem>
            <GroupItem>
              <GroupButton
                items={[
                  { icon: "plus", onClick: zoomIn },
                  { icon: "minus", onClick: zoomOut },
                ]}
              />
            </GroupItem>
            <LocationItem>
              <LocationButton onClick={setMyPosition} />
            </LocationItem>
            <ButtonItem>
              <Link href={"/buildings"}>
                <a>
                  <Button
                    label={"이 지역 자취방 리뷰 보기"}
                    type={"secondary"}
                    size={"md"}
                  />
                </a>
              </Link>
              <Link href={"/review/write"}>
                <a>
                  <Button type={"primary"} size={"md"} icon={"plus"}>
                    리뷰 쓰기
                  </Button>
                </a>
              </Link>
            </ButtonItem>
          </MapContainer>
        </Container>
      </AppLayout>
    </Fragment>
  );
};

export async function getStaticProps(context) {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_API_HOST}/building/marking`);
  const data = await JSON.stringify(res.data);

  return {
    props: { data }, // will be passed to the page component as props
  };
}

const MarkerClustererStyles = [
  {
    width: "120px",
    height: "120px",
    backgroundImage: "url(num-pin-one.png)",
    backgroundSize: "120px 120px",
    backgroundRepeat: "no-repeat",
    borderRadius: "8px",
    color: "var(--white)",
    textAlign: "center",
    fontWeight: "700",
    lineHeight: "120px",
    fontSize: "16px",
  },
  {
    width: "120px",
    height: "120px",
    backgroundImage: "url(num-pin-two.png)",
    backgroundSize: "120px 120px",
    backgroundRepeat: "no-repeat",
    borderRadius: "8px",
    color: "var(--white)",
    textAlign: "center",
    fontWeight: "700",
    lineHeight: "120px",
    fontSize: "16px",
  },
  {
    width: "120px",
    height: "120px",
    backgroundImage: "url(num-pin-three.png)",
    backgroundSize: "120px 120px",
    backgroundRepeat: "no-repeat",
    borderRadius: "8px",
    color: "var(--white)",
    textAlign: "center",
    fontWeight: "700",
    lineHeight: "120px",
    fontSize: "16px",
  },
];

const MapWrapper = styled.div`
  width: 100%;
  height: 100vh;
`;
const MapContainer = styled.div``;
const Container = styled.div`
  /* height: calc(100vh - 112px); */
  overflow: hidden !important;
`;
const FilterItem = styled.div`
  position: absolute;
  right: 20px;
  top: 68px;
  z-index: 2;
`;
const GroupItem = styled.div`
  position: absolute;
  right: 20px;
  top: 232px;
  z-index: 2;
`;
const LocationItem = styled.div`
  position: absolute;
  right: 20px;
  top: 328px;
  z-index: 2;
`;
const ButtonItem = styled.div`
  position: absolute;
  bottom: 64px;
  width: 100%;
  display: flex;
  justify-content: center;
  z-index: 2;
  gap: 8px;
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
const FilterPopupTitle = styled.div`
  display: flex;
  align-items: center;
  .title {
    margin-left: 8px;
  }
`;

export default MainMap;
