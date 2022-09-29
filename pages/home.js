import React, { useEffect, useState, useRef, useCallback, Fragment } from "react";
import Link from "next/link";
import Script from "next/script";
import styled from "@emotion/styled";
import LocationButton from "../components/common/atoms/LocationButton";
import GroupButton from "../components/common/atoms/GroupButton";
import MapButton from "../components/common/atoms/MapButton";
import Button from "../components/common/atoms/Button";
import Icon from "../components/common/atoms/Icon";
import AppLayout from "../components/common/AppLayout";
import Popup from "../components/common/atoms/Popup";
import { Body2Bold } from "../styles/typography";
import CheckBox from "../components/common/atoms/CheckBox";

const initial = {
  lat: 37.5173319258532,
  lng: 127.047377408384,
};

const getLocation = [
  {
    coordinate: {
      longitude: 124.450701,
      latitude: 32.570667,
    },
    buildingId: 1,
  },
  {
    coordinate: {
      longitude: 132.483,
      latitude: 40.57,
    },
    buildingId: 2,
  },
  {
    coordinate: {
      longitude: 130.4501,
      latitude: 38.57,
    },
    buildingId: 3,
  },
];

const MainMap = () => {
  const kakaoMapRef = useRef(null); // 지도 container ref
  const map = useRef(null);
  // const [mapCenter, setMapCenter] = useState({ lat: initial.lat, lng: initial.lng });

  //map불러오기
  const initMap = useCallback(() => {
    if (kakaoMapRef.current && !map.current) {
      const initialMap = new kakao.maps.Map(kakaoMapRef.current, {
        center: new kakao.maps.LatLng(initial.lat, initial.lng),
        level: 6,
      });
      map.current = initialMap;
    }
  }, [kakaoMapRef.current]);

  useEffect(() => {
    if (window.kakao) {
      initMap();
    }
  }, [initMap]);

  //나의 위치로 가게 해주는 함수
  const setMyPosition = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude; // 위도
        const lng = position.coords.longitude; // 경도
        // setMapCenter({ lat, lng });

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

  return (
    <Fragment>
      <Script
        src={`https://dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_APP_KEY}&autoload=false`}
        onLoad={() => kakao.maps.load(initMap)}
      />
      {popupVisible && (
        <Popup
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
            <Button
              label={"취소"}
              size={"sm"}
              type={"secondary"}
              width={"100%"}
              onClick={onHideClick}
            />
            <Button label={"필터 적용하기"} size={"sm"} type={"primary"} width={"100%"} />
          </ButtonGroup>
        </Popup>
      )}
      <AppLayout
      // headerIcon={"search"}
      >
        <Container>
          <MapWrapper id="map" ref={kakaoMapRef}></MapWrapper>
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
                    size={"sm"}
                  />
                </a>
              </Link>
              <Link href={"/review/write"}>
                <a>
                  {/* //TODO: icon button기능 추가.. 필요.. */}
                  <Button type={"primary"} size={"sm"}>
                    <Icon icon={"plus"} size={"md"} fill={"var(--white)"} />
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

const MapWrapper = styled.div`
  width: 100%;
  height: 100vh;
`;
const MapContainer = styled.div``;

const Container = styled.div`
  height: calc(100vh - 112px);
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

const ButtonGroup = styled.div`
  display: flex;
  gap: 8px;
`;

export default MainMap;
