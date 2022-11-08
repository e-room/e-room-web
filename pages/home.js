import React, { useEffect, useState, useRef, useCallback, Fragment } from "react";
import Link from "next/link";
import Script from "next/script";
import styled from "@emotion/styled";
import LocationButton from "components/common/atoms/LocationButton";
import GroupButton from "components/common/atoms/GroupButton";
import MapButton from "components/common/atoms/MapButton";
import Button from "components/common/atoms/Button";
import Icon from "components/common/atoms/Icon";
import AppLayout from "components/common/AppLayout";
import Popup from "components/common/atoms/Popup";
import { Body2Bold } from "styles/typography";
import CheckBox from "components/common/atoms/CheckBox";
import { pageTitleState } from "states";
import { useSetRecoilState } from "recoil";
import MarkerPng from "assets/marker4.png";
const initial = {
  lat: 33.453705,
  lng: 126.570677,
};
const MainMap = () => {
  const setPageTitleState = useSetRecoilState(pageTitleState);
  const kakaoMapRef = useRef(null); // 지도 container ref
  const map = useRef(null);
  // const [mapCenter, setMapCenter] = useState({ lat: initial.lat, lng: initial.lng });
  //map불러오기
  const initMap = useCallback(() => {
    let imageSrc = MarkerPng.src;
    let imageSize = new kakao.maps.Size(61, 68);
    let imageOption = { offset: new kakao.maps.Point(30, 48) };
    var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption);

    if (kakaoMapRef.current && !map.current) {
      const initialMap = new kakao.maps.Map(kakaoMapRef.current, {
        center: new kakao.maps.LatLng(initial.lat, initial.lng),
        level: 6,
      });
      // 마커 클러스터러를 생성합니다
      let clusterer = new kakao.maps.MarkerClusterer({
        map: initialMap, // 마커들을 클러스터로 관리하고 표시할 지도 객체
        averageCenter: true, // 클러스터에 포함된 마커들의 평균 위치를 클러스터 마커 위치로 설정
        minLevel: 4, // 클러스터 할 최소 지도 레벨
        styles: [
          {
            width: "61px",
            height: "68px",
            backgroundImage: "url(num_chip+pin_1.svg)",
            backgroundRepeat: "no-repeat",
            borderRadius: "8px",
            color: "var(--primary-1)",
            textAlign: "center",
            fontWeight: "700",
            lineHeight: "20px",
            fontSize: "14px",
          },
          {
            width: "61px",
            height: "68px",
            backgroundImage: "url(num_chip+pin_2.svg)",
            backgroundRepeat: "no-repeat",
            borderRadius: "8px",
            color: "var(--primary-1)",
            textAlign: "center",
            fontWeight: "700",
            lineHeight: "20px",
            fontSize: "14px",
          },
          {
            width: "61px",
            height: "68px",
            backgroundImage: "url(num_chip+pin_3.svg)",
            backgroundRepeat: "no-repeat",
            borderRadius: "8px",
            color: "var(--primary-1)",
            textAlign: "center",
            fontWeight: "700",
            lineHeight: "20px",
            fontSize: "14px",
          },
        ],
      });
      // TODO: 동기로 변경하고 setTimeout 제거
      const markers = [];
      setTimeout(() => {
        getLocation.forEach((value) => {
          let marker = new kakao.maps.Marker({
            position: new kakao.maps.LatLng(value.lat, value.lng),
            image: markerImage,
          });
          marker.setMap(initialMap);
          markers.push(marker);
        });
        clusterer.addMarkers(markers);
      }, [1000]);
      map.current = initialMap;
    }
  }, [kakaoMapRef.current]);
  useEffect(() => {
    setPageTitleState(null);
  }, []);
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
        src={`https://dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_APP_KEY}&autoload=false&libraries=clusterer`}
        onLoad={() => kakao.maps.load(initMap)}
      />
      {popupVisible && (
        <Popup
          title={
            <div style={{ display: "flex", alignItems: "center" }}>
              <Icon icon={"filter-stroke"} />
              <div style={{ marginLeft: 8 }}>필터</div>
            </div>
          }
          titleAlign={"left"}
          buttonType={"default"}
          cancelText="취소"
          submitText="필터 적용하기"
          onCancelClick={onHideClick}
        >
          <Contents>
            <SubText>직거래 가능한 방만 보기</SubText>
            <CheckBox />
          </Contents>
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
                    size={"md"}
                  />
                </a>
              </Link>
              <Link href={"/review/write"}>
                <a>
                  {/* //TODO: icon button기능 추가.. 필요.. */}
                  <Button type={"primary"} size={"lg"}>
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
const dummy = () => {
  return Array(100)
    .fill()
    .map(() => {
      return {
        lat: 33.450705,
        lng: 126.570677,
      };
    });
};
const getLocation = [
  {
    lat: 33.450705,
    lng: 126.570677,
  },
  {
    lat: 33.450936,
    lng: 126.569477,
  },
  {
    lat: 33.450879,
    lng: 126.56994,
  },
  {
    lat: 33.451393,
    lng: 126.570738,
  },
  {
    lat: 33.452493,
    lng: 126.572938,
  },
  {
    lat: 33.451373,
    lng: 126.570538,
  },
  {
    lat: 33.45129,
    lng: 126.571701,
  },
  {
    lat: 33.451457,
    lng: 126.57101,
  },
  {
    lat: 33.45131,
    lng: 126.570018,
  },
  {
    lat: 33.451099,
    lng: 126.570799,
  },
  {
    lat: 33.451393,
    lng: 126.570738,
  },
  {
    lat: 33.451393,
    lng: 126.570738,
  },
  {
    lat: 33.451393,
    lng: 126.570738,
  },
  {
    lat: 33.451393,
    lng: 126.570738,
  },
  {
    lat: 33.451393,
    lng: 126.570738,
  },
  {
    lat: 33.451393,
    lng: 126.570738,
  },
];
