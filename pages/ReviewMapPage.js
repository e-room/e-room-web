import React, { useEffect, useState, useRef, useCallback } from "react";
import Link from "next/link";
import Head from "next/head";
import Script from "next/script";
import styled from "@emotion/styled";
import LocationButton from "../components/Button/LocationButton";
import GroupButton from "../components/Button/GroupButton";
import MapButton from "../components/Button/MapButton";
import Button from "../components/Button/Button";

// TODO: .env 파일 분리하기
const NEXT_PUBLIC_KAKAO_KEY = "7825714128d19a402fd2f559cd77866c";

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

  return (
    <React.Fragment>
      <Script
        src={`https://dapi.kakao.com/v2/maps/sdk.js?appkey=${NEXT_PUBLIC_KAKAO_KEY}&autoload=false`}
        onLoad={() => kakao.maps.load(initMap)}
      />
      <Head>
        <link rel="preconnect" href="https://dapi.kakao.com" />
        <link rel="dns-prefetch" href="https://dapi.kakao.com" />
      </Head>
      <MapWrapper id="map" ref={kakaoMapRef}></MapWrapper>
      <MapContainer>
        <FilterItem>
          <MapButton />
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
          {/* Link > a tag 필수 */}
          {/* Link href = pages/[page].js */}
          {/* TODO: href === page name 필수인지 확인하기 */}
          <Link href={"/BuildingListPage"}>
            <a>
              <Button label={"이 지역 자취방 리뷰 보기"} type={"primary"} size={"sm"} />
            </a>
          </Link>
        </ButtonItem>
      </MapContainer>
    </React.Fragment>
  );
};

const MapWrapper = styled.div`
  width: 100%;
  height: 100vh;
`;
const MapContainer = styled.div``;

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
`;

export default MainMap;
