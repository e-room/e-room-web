import React, { useEffect, useState, useRef, Fragment, useMemo } from "react";
import axios from "axios";
import Link from "next/link";
import styled from "@emotion/styled";

import MarkerPng from "assets/marker4.png";

import IconButton from "components/common/atoms/IconButton";
import GroupButton from "components/common/atoms/GroupButton";
import Button from "components/common/atoms/Button";
import Footer from "components/common/Footer";
import logEvent from "amplitude/logEvent";
import { fadeInUp_OutDown } from "styles/keyframes";
import BuildingInfo from "components/map/BuildingInfo";
import SearchPage from "components/map/SearchPage";

const MainMap = ({ data }) => {
  const buildingMarking = JSON.parse(data);
  const map = useRef(null);

  const imsiMarkerList = [];
  const [searchVisible, setSearchVisible] = useState(false);
  const [buttonVisible, setButtonVisible] = useState(true);
  const [infoVisible, setInfoVisible] = useState({ visible: false, id: null });

  useEffect(() => {
    kakao.maps.load(async () => {
      var container = document.getElementById("map");
      var options = {
        center: new kakao.maps.LatLng(initial.lat, initial.lng),
        level: centerPoint?.level ?? 8,
      };

      map.current = await new kakao.maps.Map(container, options);

      kakao.maps.event.addListener(map.current, "idle", () => {
        onShowListButton();
      });
    });
  }, [searchVisible]);

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

  const buildingView = useMemo(() => {
    return <BuildingInfo id={infoVisible.id} />;
  }, [infoVisible]);

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
        <div className="w-screen h-screen" id="map" />
        <div className="absolute right-[20px] top-[25px] z-[2]">
          <IconButton
            icon="search"
            onClick={() => {
              logEvent({ name: "click-map-search" });
              setSearchVisible(true);
            }}
          />
        </div>
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
      </div>
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
    color: "white",
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
    color: "white",
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
    color: "white",
    textAlign: "center",
    fontWeight: "700",
    lineHeight: "120px",
    fontSize: "16px",
  },
];

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
