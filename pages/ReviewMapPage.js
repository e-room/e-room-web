import React, { useEffect, useState, useRef, useCallback } from "react";
import Link from "next/link";
import Head from "next/head";
import Script from "next/script";
import styled from "@emotion/styled";
import LocationButton from "../components/Button/LocationButton";
import GroupButton from "../components/Button/GroupButton";
import MapButton from "../components/Button/MapButton";
import Button from "../components/Button/Button";

const NEXT_PUBLIC_KAKAO_KEY = "7825714128d19a402fd2f559cd77866c";

const initialLocation = {
  lat: 37.5173319258532,
  lng: 127.047377408384,
};

const MainMap = () => {
  const [level, setLevel] = useState(8); //지도레벨
  const [pos, setPos] = useState(); //경도 위도
  const containerRef = useRef(null); // 지도 ref

  //map불러오기
  const initMap = useCallback(() => {
    if (containerRef.current) {
      const map = new kakao.maps.Map(containerRef.current, {
        center: new kakao.maps.LatLng(initialLocation.lat, initialLocation.lng),
        level: level,
      });
    }
  }, []);
  useEffect(() => {
    if (window?.kakao) {
      initMap();
    }
  }, [initMap]);

  //나의 위치로 가게 해주는 함수
  const setLocation = () => {
    let container = document.getElementById("map");

    let options = {
      center: new kakao.maps.LatLng(37.5173319258532, 127.047377408384),
      level: level,
    };
    let map = new kakao.maps.Map(container, options);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        let lat = position.coords.latitude, // 위도
          lon = position.coords.longitude; // 경도

        let locPosition = new kakao.maps.LatLng(lat, lon);
        map.setCenter(locPosition);
      });
    }
  };
  //줌인
  const zoomIn = () => {
    if (level > 5) {
      setLevel(level - 1);
    }

    let container = document.getElementById("map");

    let options = {
      center: new kakao.maps.LatLng(37.5173319258532, 127.047377408384),
      level: level,
    };
    let map = new kakao.maps.Map(container, options);
  };
  //줌아웃
  const zoomOut = () => {
    if (level < 10) {
      setLevel(level + 1);
    }

    let container = document.getElementById("map");

    let options = {
      center: new kakao.maps.LatLng(37.5173319258532, 127.047377408384),
      level: level,
    };
    let map = new kakao.maps.Map(container, options);
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
      <MapWrapper id="map" ref={containerRef}></MapWrapper>
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
          <LocationButton onClick={setLocation} />
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
const MapContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  z-index: 2;
`;

const FilterItem = styled.div`
  position: absolute;
  right: 20px;
  top: 68px;
`;
const GroupItem = styled.div`
  position: absolute;
  right: 20px;
  top: 232px;
`;
const LocationItem = styled.div`
  position: absolute;
  right: 20px;
  top: 328px;
`;
const ButtonItem = styled.div`
  position: absolute;
  bottom: 64px;
  width: 100%;
  display: flex;
  justify-content: center;
`;

export default MainMap;
