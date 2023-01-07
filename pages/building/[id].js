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

import RoomSelector from "components/building/RoomSelector";

export default () => {
  const router = useRouter();
  const [showImgDetail, setShowImgDetail] = useRecoilState(imageViewState);
  const building = useRecoilValue(buildingSelector);

  const onCloseImg = () => {
    setShowImgDetail(false);
  };
  // router.query.id

  return (
    <AppLayout>
      <Container>
        {showImgDetail && <Slider data={dummyImages} onClose={onCloseImg} />}
        <BuildingMap />
        <BuildingInfo />
        <RoomSelector data={building.rooms} />
        <ImageView />
        <ReviewList />
      </Container>
    </AppLayout>
  );
};
export async function getStaticPaths() {
  return {
    paths: [{ params: { id: "1" } }, { params: { id: "2" } }],
    fallback: false, // can also be true or 'blocking'
  };
}

const Container = styled.div`
  height: calc(100vh - 112px);
  overflow: scroll;
`;
