import React, {
  useEffect,
  useState,
  useRef,
  Fragment,
  useCallback,
  useMemo,
} from "react";
import axios from "axios";
import Link from "next/link";
import styled from "@emotion/styled";

import MarkerPng from "assets/marker4.png";

import LocationButton from "components/common/atoms/LocationButton";
import GroupButton from "components/common/atoms/GroupButton";
import Button from "components/common/atoms/Button";
import Icon from "components/common/atoms/Icon";
import AppLayout from "components/common/AppLayout";
import { fadeInUp_OutDown } from "styles/keyframes";
import BuildingInfo from "components/map/BuildingInfo";
import SearchPage from "components/map/SearchPage";

const MainMap = ({ data }) => {
  const buildingMarking = JSON.parse(data);
  const map = useRef(null);

  const [mapLoaded, setMapLoaded] = useState(false);
  const imsiMarkerList = [];
  const [searchVisible, setSearchVisible] = useState(false);
  const [buttonVisible, setButtonVisible] = useState(true);
  const [infoVisible, setInfoVisible] = useState({ visible: false, id: null });

  useEffect(() => {
    const $script = document.createElement("script");
    $script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_APP_KEY}&autoload=false&libraries=clusterer`;
    $script.addEventListener("load", () => setMapLoaded(true));
    document.head.appendChild($script);
  }, []);

  useEffect(() => {
    if (!mapLoaded) return;

    kakao.maps.load(async () => {
      const centerPoint = JSON.parse(localStorage.getItem("centerPoint"));
      const initial = {
        lat: centerPoint?.lat ?? 37.2429616,
        lng: centerPoint?.lng ?? 127.0800525,
      };

      var container = document.getElementById("map");
      var options = {
        center: new kakao.maps.LatLng(initial.lat, initial.lng),
        level: centerPoint?.level ?? 8,
      };

      let imageSrc = MarkerPng.src;
      let imageSize = new kakao.maps.Size(61, 68);
      let imageOption = { offset: new kakao.maps.Point(30, 48) };
      var markerImage = new kakao.maps.MarkerImage(
        imageSrc,
        imageSize,
        imageOption
      );

      map.current = await new kakao.maps.Map(container, options);

      // 마커 클러스터러를 생성합니다
      const clusterer = await new kakao.maps.MarkerClusterer({
        map: map.current, // 마커들을 클러스터로 관리하고 표시할 지도 객체
        averageCenter: true, // 클러스터에 포함된 마커들의 평균 위치를 클러스터 마커 위치로 설정
        minLevel: 5, // 클러스터 할 최소 지도 레벨
        styles: MarkerClustererStyles,
        gridSize: 88,
      });

      const markers = [];

      await buildingMarking.buildingList.forEach((value) => {
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
          // router.push(`/building/${value.buildingId}`);
          setInfoVisible({ visible: true, id: value.buildingId });
        });
        markers.push(marker);
        imsiMarkerList.push({ marker, id: value.buildingId });
      });
      clusterer.addMarkers(markers);

      setCenterPoint();
      setLocalStorage();

      kakao.maps.event.addListener(map.current, "idle", () => {
        setCenterPoint();
        setLocalStorage();
        onShowListButton();
      });
    });
  }, [mapLoaded, searchVisible]);

  const onShowListButton = () => {
    const bounds = map.current.getBounds();
    const inBounds = imsiMarkerList.filter((overlay) => {
      if (bounds.contain(overlay.marker.getPosition())) {
        return overlay.id;
      }
    });
    if (inBounds.length > 0) {
      setButtonVisible(true);
    } else {
      setButtonVisible(false);
      setInfoVisible({ visible: false, id: null });
    }
  };

  const setLocalStorage = () => {
    if (map.current) {
      const bounds = map.current.getBounds();
      const inBounds = imsiMarkerList.filter((overlay) => {
        if (bounds.contain(overlay.marker.getPosition())) {
          return overlay.id;
        }
      });
      const ids = [];
      inBounds.forEach((value) => ids.push(value.id));
      localStorage.setItem("buildingMarking", ids);
    }
  };
  const setCenterPoint = () => {
    if (map.current) {
      const centerPoint = map.current.getCenter();
      const level = map.current.getLevel();

      localStorage.setItem(
        "centerPoint",
        JSON.stringify({
          lat: centerPoint.getLat(),
          lng: centerPoint.getLng(),
          level: level,
        })
      );
    }
  };

  //나의 위치로 가게 해주는 함수
  const setMyPosition = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude; // 위도
        const lng = position.coords.longitude; // 경도

        let myPosition = new kakao.maps.LatLng(lat, lng);
        map.current.setCenter(myPosition);
        map.current.setLevel(1);
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

  if (searchVisible)
    return (
      <SearchPage
        searchVisible={searchVisible}
        setSearchVisible={setSearchVisible}
      />
    );

  const buildingView = useMemo(() => {
    return <BuildingInfo id={infoVisible.id} />;
  }, [infoVisible]);

  return (
    <Fragment>
      <AppLayout
        additionalFunction={
          <Icon
            icon={"search"}
            size={"md"}
            onClick={() => setSearchVisible(true)}
          />
        }
      >
        <Container>
          <MapWrapper id="map" />
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
          <ButtonItem visible={buttonVisible} infoVisible={infoVisible.visible}>
            <Link href={"/buildings"}>
              <a>
                <Button
                  label={"이 지역을 목록으로 보기"}
                  icon={"list"}
                  type={"secondary"}
                  size={"md"}
                />
              </a>
            </Link>
            <Test visible={infoVisible.visible}>
              {infoVisible.visible && buildingView}
            </Test>
          </ButtonItem>
        </Container>
      </AppLayout>
    </Fragment>
  );
};

export async function getServerSideProps(context) {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_API_HOST}/building/marking`
  );
  const data = JSON.stringify(res.data);

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
  width: 100vw;
  height: 100vh;
  /* height: calc(100vh - 112px); */
`;
const Container = styled.div`
  position: relative;
  overflow: hidden !important;

  width: 100vw;
  height: 100vh;
  margin: 0 !important;
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
  position: fixed;
  bottom: 64px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  z-index: 2;

  ${(p) => fadeInUp_OutDown(p.visible)}
`;

const Test = styled.div`
  ${(p) => fadeInUp_OutDown(p.visible)}
`;

export default MainMap;
