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
        <ImageView />
        <ReviewList />
      </Container>
    </AppLayout>
  );
};

const Container = styled.div`
  height: calc(100vh - 112px);
  overflow: scroll;
`;
