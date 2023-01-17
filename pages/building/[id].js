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

export default ({ data }) => {
  const building = JSON.parse(data);
  console.log(building);
  const [showImgDetail, setShowImgDetail] = useRecoilState(imageViewState);

  const onCloseImg = () => {
    setShowImgDetail(false);
  };

  return (
    <AppLayout>
      <Container>
        {showImgDetail && <Slider data={dummyImages} onClose={onCloseImg} />}
        <BuildingMap building={building} />
        <BuildingInfo building={building} />
        <RoomSelector data={building.rooms} />
        <ImageView />
        <ReviewList />
      </Container>
    </AppLayout>
  );
};

export async function getStaticPaths() {
  return {
    paths: [{ params: { id: "47" } }],
    fallback: false, // can also be true or 'blocking'
  };
}

// `getStaticPaths` requires using `getStaticProps`
export async function getStaticProps({ params }) {
  console.log("aa", params);
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_API_HOST}/building/${params.id}`,
    {
      headers: {
        mocking: 239,
      },
    }
  );
  const data = await JSON.stringify(res.data);
  return {
    // Passed to the page component as props
    props: { data },
  };
}

const Container = styled.div`
  height: calc(100vh - 112px);
  overflow: scroll;
`;
