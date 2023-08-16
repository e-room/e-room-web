import { Fragment, useEffect, useRef, useState } from "react";
import axios from "axios";
import Link from "next/link";

import logEvent from "amplitude/logEvent";

import Footer from "components/common/Footer";
import Button from "components/common/atoms/Button";
import GroupButton from "components/common/atoms/GroupButton";
import IconButton from "components/common/atoms/IconButton";
import BuildingInfo from "components/map/BuildingInfo";
import { BOUNDS_POSITIONS, INITIAL_POSITION } from "constants/localStorageType";
import SearchPage from "components/map/SearchPage";
import { useRouter } from "next/router";

const map = ({ data }) => {
  const router = useRouter();
  const { lat, lng, type } = router.query;

  const buildingMarking = JSON.parse(data);
  const boundsListRef = useRef(null);
  const mapElement = useRef(null);
  const [map, setMap] = useState(null);

  const [test, setTest] = useState(null);
  const testRef = useRef(null);
  const [searchVisible, setSearchVisible] = useState(false);

  useEffect(() => {
    const { naver } = window;
    if (!mapElement.current || !naver) return;

    const initialPosition = JSON.parse(localStorage.getItem(INITIAL_POSITION));

    let initialCenter = {
      lat: initialPosition?.centerPoint?._lat ?? 37.2429616,
      lng: initialPosition?.centerPoint?._lng ?? 127.0800525,
    };
    let initialZoom = initialPosition?.zoom ?? 12;

    if (lat && lng) {
      initialCenter = {
        lat: lat,
        lng: lng,
      };
      initialZoom = 16;
    }

    const mapOptions = {
      center: new naver.maps.LatLng(initialCenter.lat, initialCenter.lng),
      zoom: initialZoom,
    };
    const initialMap = new naver.maps.Map(mapElement.current, mapOptions);

    setMap(initialMap);
  }, [lat, lng]);

  useEffect(() => {
    if (type === "myLocation" && map) setMyPosition();
  }, [type, map]);

  useEffect(() => {
    if (
      !buildingMarking.buildingList ||
      buildingMarking.buildingList.length < 1
    )
      return;

    setCenterPoint();
    const markers = [];
    const content = `<img src="/map/current-pin.png" width="61" height="65" alt="현재 위치"/>`;
    const clusteringIcon = {
      content:
        '<div style="cursor:pointer;width:120px;height:120px;line-height:120px;font-size:16px;color:white;text-align:center;font-weight:700;background:url(/map/num-pin-one.png);background-size:contain;"></div>',
      size: N.Size(120, 120),
    };

    buildingMarking.buildingList.forEach((value) => {
      const position = new naver.maps.LatLng(
        value.coordinateDto.latitude,
        value.coordinateDto.longitude
      );

      let marker = new naver.maps.Marker({
        position,
        map,
        icon: {
          content,
          size: new naver.maps.Size(61, 68),
        },
      });

      naver.maps.Event.addListener(marker, "click", () => {
        logEvent({
          name: "click-map-pin",
          property: { buildingID: value.buildingId },
        });
        map.panTo(position);
        setTest(value.buildingId);

        testRef.current.classList.remove("hidden");
        testRef.current.classList.add("animate-toast-visible");
      });

      markers.push({ marker, buildingId: value.buildingId });
    });

    new MarkerClustering({
      minClusterSize: 2,
      maxZoom: 13,
      map: map,
      markers: markers.map((v) => v.marker),
      disableClickZoom: false,
      gridSize: 88,
      icons: [clusteringIcon],
      indexGenerator: [10, 100, 1000],
      stylingFunction: function (clusterMarker, count) {
        clusterMarker.getElement().querySelector("div:first-child").innerText =
          count;
      },
    });

    if (markers.length > 0) {
      setLocalStorage(markers);
    }

    if (naver && map) {
      naver.maps.Event.addListener(map, "idle", () => {
        setCenterPoint();
        setLocalStorage(markers);
      });
    }
  }, [map]);

  const setCenterPoint = () => {
    if (map) {
      const centerPoint = map.getCenter();
      const zoomLevel = map.getZoom();

      localStorage.setItem(
        INITIAL_POSITION,
        JSON.stringify({
          centerPoint: centerPoint,
          zoom: zoomLevel,
        })
      );
    }
  };

  const setLocalStorage = (markers) => {
    if (map) {
      const mapBounds = map.getBounds();
      let marker, position;
      const ids = [];

      for (let i = 0; i < markers.length; i++) {
        marker = markers[i].marker;
        position = marker.getPosition();

        if (mapBounds.hasLatLng(position)) {
          ids.push(markers[i].buildingId);
        }
      }

      localStorage.setItem(BOUNDS_POSITIONS, ids);

      if (ids.length > 0) {
        boundsListRef.current.classList.add("animate-toast-visible");
        boundsListRef.current.classList.remove("animate-toast-hidden");
      } else {
        boundsListRef.current.classList.add("animate-toast-hidden");
        boundsListRef.current.classList.remove("animate-toast-visible");
        testRef.current.classList.add("animate-toast-hidden");
        testRef.current.classList.add("hidden");
        testRef.current.classList.remove("animate-toast-visible");
      }
    }
  };

  const setMyPosition = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude; // 위도
        const lng = position.coords.longitude; // 경도

        let myPosition = new naver.maps.LatLng(lat, lng);
        map.panTo(myPosition);
        map.setZoom(18, true);
      });
    }
  };

  const zoomIn = () => {
    map.setZoom(map.getZoom() + 1, true);
  };
  const zoomOut = () => {
    map.setZoom(map.getZoom() - 1, true);
  };

  if (searchVisible) {
    return (
      <SearchPage
        searchVisible={searchVisible}
        setSearchVisible={setSearchVisible}
      />
    );
  }

  return (
    <Fragment>
      <div className="relative overflow-hidden w-screen h-screen m-0">
        <div className="w-screen h-screen" ref={mapElement} />
        <div className="absolute right-[20px] top-[25px] z-[2]">
          <IconButton
            icon="search"
            onClick={() => {
              logEvent({ name: "click-map-search" });
              setSearchVisible(true);
            }}
          />
        </div>
        <div className="absolute right-[20px] top-[232px] z-[2]">
          <GroupButton
            items={[
              { icon: "plus", onClick: zoomIn },
              { icon: "minus", onClick: zoomOut },
            ]}
          />
        </div>
        <div className="absolute right-[20px] top-[328px] z-[2]">
          <IconButton onClick={setMyPosition} icon="location" />
        </div>
        <div
          className="fixed bottom-[64px] w-full flex justify-center items-center flex-col z-[2]"
          ref={boundsListRef}
        >
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
          <div ref={testRef}>{test && <BuildingInfo id={test} />}</div>
        </div>
      </div>
      <Footer enabled={true} />
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

export default map;
