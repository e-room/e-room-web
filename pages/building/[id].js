import { useRecoilState } from "recoil";
import axios from "axios";
import styled from "@emotion/styled";

import { imageViewState } from "states/buidlingAtom";

import AppLayout from "components/common/AppLayout";
import BuildingInfo from "components/building/BuildingInfo";
import ImageView, { dummyImages } from "components/building/ImageView";
import ReviewList from "components/building/ReviewList";
import BuildingMap from "components/building/BuildingMap";
import Slider from "components/building/Slider";
import RoomSelector from "components/building/RoomSelector";

export default ({ data, imgs, reviews }) => {
  const building = JSON.parse(data);
  const buildingImages = JSON.parse(imgs);
  const buildingReviews = JSON.parse(reviews);
  console.log("buildingReviews", buildingReviews);
  console.log("images", buildingImages);
  console.log("buildingInfo", building);
  const [showImgDetail, setShowImgDetail] = useRecoilState(imageViewState);

  const onCloseImg = () => {
    setShowImgDetail(false);
  };

  return (
    <AppLayout pageTitle={`${building.name ?? ""} 리뷰`}>
      <Container>
        {showImgDetail && (
          <Slider data={buildingImages.reviewImageList} onClose={onCloseImg} />
        )}
        <BuildingMap building={building} />
        <BuildingInfo building={building} />
        {building.rooms.length > 0 && <RoomSelector data={building.rooms} />}
        {buildingImages.reviewImageCount > 0 && (
          <ImageView data={buildingImages.reviewImageList} />
        )}
        {buildingReviews.content.length > 0 && (
          <ReviewList data={buildingReviews} />
        )}
      </Container>
    </AppLayout>
  );
};

export async function getServerSideProps({ params }) {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_API_HOST}/building/${params.id}`,
    {
      headers: {
        mocking: 239,
      },
    }
  );
  const res1 = await axios.get(
    `${process.env.NEXT_PUBLIC_API_HOST}/building/${params.id}/images`,
    {
      headers: {
        mocking: 239,
      },
    }
  );
  const res2 = await axios.get(
    `${process.env.NEXT_PUBLIC_API_HOST}/building/${params.id}/room/review`,
    {
      headers: {
        mocking: 239,
      },
    }
  );
  const data = JSON.stringify(res.data);
  const imgs = JSON.stringify(res1.data);
  const reviews = JSON.stringify(res2.data);
  return {
    // Passed to the page component as props
    props: { data, imgs, reviews },
  };
}

const Container = styled.div`
  height: calc(100vh - 112px);
  overflow: scroll;
`;
