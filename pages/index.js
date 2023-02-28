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
import { useRouter } from "next/router";
import styled from "@emotion/styled";

import MarkerPng from "assets/marker4.png";
import { Body2, Body2Bold, Caption2, Caption2Bold } from "styles/typography";
import Img from "assets/img.png";

import LocationButton from "components/common/atoms/LocationButton";
import GroupButton from "components/common/atoms/GroupButton";
import Button from "components/common/atoms/Button";
import Icon from "components/common/atoms/Icon";
import AppLayout from "components/common/AppLayout";
import SearchList from "components/search/SearchList";
import Nodata from "components/search/Nodata";
import { fadeInUp_OutDown } from "styles/keyframes";
import Score from "components/common/atoms/Score";
import parseFloat from "utils/parseFloat";

const MainMap = ({ data }) => {
  const router = useRouter();
  const buildingMarking = JSON.parse(data);
  const map = useRef(null);

  const [mapLoaded, setMapLoaded] = useState(false);
  const imsiMarkerList = [];
  const [searchVisible, setSearchVisible] = useState(false);
  const [buttonVisible, setButtonVisible] = useState(true);
  const [infoVisible, setInfoVisible] = useState(false);

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
          setInfoVisible((value) => !value);
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
    if (inBounds.length < 1) setButtonVisible(false);
    else setButtonVisible(true);
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

  const [searchValue, setSearchValue] = useState("");
  const [searchList, setSearchList] = useState([]);

  const debounce = useCallback((func) => {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func.apply(this, args);
      }, 500);
    };
  }, []);

  const saveInput = async (e) => {
    setSearchList([]);
    const response = await axios.get(
      `/apis/building/search?params=${e.target.value}`
    );
    setSearchList(response.data.content);
  };

  const onSearchValue = useMemo(() => debounce((e) => saveInput(e)), []);

  const searchView = useCallback(() => {
    if (!searchVisible) return;
    if (searchList.length < 1 || !searchValue) {
      return <Nodata />;
    } else {
      return <SearchList data={searchList} searchValue={searchValue} />;
    }
  }, [searchList, searchVisible, searchValue, saveInput]);

  return (
    <Fragment>
      {searchVisible && (
        <SearchField>
          <div
            onClick={() => setSearchVisible(false)}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minWidth: 24,
              marginLeft: 4,
              cursor: "pointer",
            }}
          >
            <Icon icon={"arrow-left"} size={"md"} />
          </div>
          <input
            placeholder="주소나 건물 이름으로 검색해보세요"
            onKeyUp={onSearchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            value={searchValue}
          />
          {searchValue && (
            <div
              className={"x-icon cursor-pointer"}
              onClick={() => setSearchValue("")}
            >
              <Icon icon={"x-icon-xs"} size={"xs"} fill={"var(--white)"} />
            </div>
          )}
        </SearchField>
      )}
      <AppLayout
        additionalFunction={
          <Icon
            icon={"search"}
            size={"md"}
            onClick={() => setSearchVisible(true)}
          />
        }
      >
        {searchVisible ? (
          <ListContainer>{searchView()}</ListContainer>
        ) : (
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
            <ButtonItem visible={buttonVisible} infoVisible={infoVisible}>
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
              <div className="building-info-view">
                <img
                  src={Img.src}
                  width={72}
                  height={72}
                  style={{ borderRadius: 8 }}
                />
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 4,
                    justifyContent: "center",
                  }}
                >
                  <div className="building-name">건물 이름</div>
                  <ReviewArea>
                    <div
                      className="review-count"
                      style={{ opacity: 0.5, marginRight: 8 }}
                    >
                      리뷰 0개
                    </div>
                    <StarArea>{parseFloat(3, 1)}</StarArea>
                    <div style={{ marginTop: 3 }}>
                      <Score
                        size="sm"
                        readOnly={true}
                        value={3}
                        allowFraction={true}
                      />
                    </div>
                  </ReviewArea>
                </div>
              </div>
            </ButtonItem>
          </Container>
        )}
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

  gap: 8px;

  ${(p) => fadeInUp_OutDown(p.visible)}

  .building-info-view {
    width: calc(100vw - 40px);
    background-color: white;
    max-width: 320px;
    max-height: 88px;
    box-sizing: border-box;
    border-radius: 12px;
    padding: 8px;

    gap: 12px;
    display: flex;

    ${(p) => p.visible && fadeInUp_OutDown(p.infoVisible)}

    .building-name {
      ${Body2Bold}
      color: var(--black);
    }
  }
`;
const ReviewArea = styled.div`
  display: flex;
  align-items: center;
  max-height: 16px;
  .review-count {
    ${Caption2}
  }
`;
const StarArea = styled.div`
  ${Caption2Bold}
  color: var(--primary-1);
`;

const SearchField = styled.div`
  position: fixed;
  z-index: 10;
  top: 0;
  left: 0;
  width: 100%;
  height: 44px;
  background: var(--white);

  box-sizing: border-box;
  padding: 12px;
  gap: 16px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  input {
    width: 100%;
    height: 24px;
    border: none;

    ::placeholder {
      ${Body2}

      color: var(--gray-3);
    }
    &:focus {
      outline: none;
    }
  }

  .x-icon {
    border-radius: 100%;
    background: var(--gray-3);
    min-width: 16px;
    min-height: 16px;

    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const ListContainer = styled.div`
  height: calc(100vh - 100px);
  background-color: #fafafa !important;
  overflow-y: auto;
  overflow-x: hidden;
  margin: 44px 0;
`;
export default MainMap;
