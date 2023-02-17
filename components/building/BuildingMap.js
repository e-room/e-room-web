import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import MarkerPng from "assets/marker4.png";

const BuildingMap = ({ building }) => {
  const initial = {
    lat: building.coordinate.latitude,
    lng: building.coordinate.longitude,
  };

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
      const imageSrc = MarkerPng.src;
      const imageSize = new kakao.maps.Size(61, 68);
      const imageOption = { offset: new kakao.maps.Point(30, 48) };

      const markerImage = new kakao.maps.MarkerImage(
        imageSrc,
        imageSize,
        imageOption
      );

      const container = document.getElementById("map");
      const options = {
        center: new kakao.maps.LatLng(initial.lat, initial.lng),
        level: 3,
        draggable: false,
        scrollwheel: false,
        disableDoubleClick: true,
        disableDoubleClickZoom: true,
      };

      const initialMap = new kakao.maps.Map(container, options);
      new kakao.maps.Marker({
        position: new kakao.maps.LatLng(initial.lat, initial.lng),
        map: initialMap,
        image: markerImage,
      });
    });
  }, [mapLoaded]);

  return <MapWrapper id="map" />;
};

const MapWrapper = styled.div`
  width: 100%;
  height: 240px;
`;

export default BuildingMap;
