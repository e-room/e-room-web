import { useRouter } from "next/router";
import AppLayout from "../../components/common/AppLayout";
import styled from "@emotion/styled";
import BuildingInfo from "../../components/Building/BuildingInfo";
import ImageView from "../../components/Building/ImageView";
import ReviewList from "../../components/Building/ReviewList";
import BuildingMap from "../../components/building/BuildingMap";

export default () => {
  const router = useRouter();
  // router.query.id

  return (
    <AppLayout>
      <Container>
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
