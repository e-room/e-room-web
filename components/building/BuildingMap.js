import React, { useEffect, useRef } from "react";

const BuildingMap = ({ building }) => {
  const initial = {
    lat: building.coordinate.latitude,
    lng: building.coordinate.longitude,
  };

  const mapElement = useRef(null);
  useEffect(() => {
    const { naver } = window;
    // if (!mapElement.current || !naver) return;

    const position = new naver.maps.LatLng(initial.lat, initial.lng);

    const mapOptions = {
      center: position,
      zoom: 17,
      disableDoubleClickZoom: true,
      disableDoubleTapZoom: true,
      disableTwoFingerTapZoom: true,
      draggable: false,
      mapDataControl: false,
      pinchZoom: false,
      scrollWheel: false,
    };
    const initialMap = new naver.maps.Map(mapElement.current, mapOptions);
    const content = `<img src="/map/current-pin.png" width="48" height="54" alt="현재 위치"/>`;

    let marker = new naver.maps.Marker({
      position,
      map: initialMap,
      icon: {
        content,
        size: new naver.maps.Size(48, 48),
      },
    });
  }, []);

  return <div className="w-full min-h-[240px]" ref={mapElement} />;
};

export default BuildingMap;
