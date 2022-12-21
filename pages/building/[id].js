import { useRouter } from "next/router";
import AppLayout from "components/common/AppLayout";
import styled from "@emotion/styled";
import BuildingInfo from "components/building/BuildingInfo";
import ImageView, { dummyImages } from "components/building/ImageView";
import ReviewList from "components/building/ReviewList";
import BuildingMap from "components/building/BuildingMap";
import { buildingSelector, imageViewState } from "states/buidlingAtom";
import { useRecoilState, useRecoilValue } from "recoil";
import Slider from "components/building/Slider";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";

export default () => {
  const router = useRouter();
  const [showImgDetail, setShowImgDetail] = useRecoilState(imageViewState);
  const building = useRecoilValue(buildingSelector);

  const onCloseImg = () => {
    setShowImgDetail(false);
  };
  // router.query.id

  //////////////////////////////////////////
  const [scrollActive, setScrollActive] = useState(false);
  const layoutRef = useRef(null);
  const handleScroll = useCallback(({ target }) => {
    console.log(target.scrollTop);
    if (target.scrollTop > 500) setScrollActive(true);
    else setScrollActive(false);
  }, []);

  useLayoutEffect(() => {
    if (layoutRef.current) {
      layoutRef.current.addEventListener("scroll", handleScroll);
      return () => layoutRef.current.removeEventListener("scroll", handleScroll);
    }
  }, []);
  //////////////////////////////////////////

  return (
    <AppLayout>
      <Container ref={layoutRef}>
        {showImgDetail && <Slider data={dummyImages} onClose={onCloseImg} />}
        <BuildingMap />
        <BuildingInfo />
        <ImageView />
        <ReviewList />
      </Container>
      <TestBox isTop={scrollActive}>{scrollActive ? "픽스됨~~~" : "아직 ㅠㅠ"}</TestBox>
    </AppLayout>
  );
};

const Container = styled.div`
  height: calc(100vh - 112px);
  overflow: scroll;
`;

const TestBox = styled.div`
  position: fixed;
  top: ${(p) => (p.isTop ? "0" : "500px")};
  right: 20px;
  z-index: 199999;
  padding: 10px;
  background: lightseagreen;
  border-radius: 6px;
  color: #fff;
  border: 1px solid rgb(23, 122, 117);
  text-align: left;
`;
