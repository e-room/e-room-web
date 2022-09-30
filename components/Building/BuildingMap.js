import React, { useEffect, useState, useRef, useCallback, Fragment } from "react";
import Script from "next/script";
import styled from "@emotion/styled";
import MarkerPng from "assets/marker.png";

const initial = {
  lat: 37.5173319258532,
  lng: 127.047377408384,
};

const BuildingMap = () => {
  const kakaoMapRef = useRef(null); // 지도 container ref

  //map불러오기
  const initMap = useCallback(() => {
    let imageSrc = MarkerPng.src;
    let imageSize = new kakao.maps.Size(61, 68);
    let imageOption = { offset: new kakao.maps.Point(30, 48) };

    var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption);

    if (kakaoMapRef.current && kakaoMapRef) {
      const initialMap = new kakao.maps.Map(kakaoMapRef.current, {
        center: new kakao.maps.LatLng(initial.lat, initial.lng),
        level: 3,
        draggable: false,
      });

      setTimeout(() => {
        new kakao.maps.Marker({
          position: new kakao.maps.LatLng(initial.lat, initial.lng),
          map: initialMap,
          image: markerImage,
        });
      }, [500]);
    }
  }, [kakaoMapRef.current]);

  useEffect(() => {
    if (window.kakao) {
      initMap();
    }
  }, []);

  return (
    <Fragment>
      <Script
        src={`https://dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_APP_KEY}&autoload=false`}
        onLoad={() => kakao.maps.load(initMap)}
      />
      <MapWrapper id="map" ref={kakaoMapRef}></MapWrapper>
    </Fragment>
  );
};

const MapWrapper = styled.div`
  width: 100%;
  height: 240px;
`;

export default BuildingMap;
