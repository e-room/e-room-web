import { useRouter } from "next/router";
import AppLayout from "components/common/AppLayout";
import styled from "@emotion/styled";
import BuildingInfo from "components/Building/BuildingInfo";
import ImageView, { dummyImages } from "components/Building/ImageView";
import ReviewList from "components/Building/ReviewList";
import BuildingMap from "components/building/BuildingMap";
import { imageViewState } from "states/buidlingAtom";
import { useRecoilState } from "recoil";
import Slider from "components/building/Slider";

export default () => {
  const router = useRouter();
  const [showImgDetail, setShowImgDetail] = useRecoilState(imageViewState);

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
