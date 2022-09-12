import { useRouter } from "next/router";
import AppLayout from "../../components/layout/AppLayout";
import styled from "@emotion/styled";
import BuildingInfo from "../../components/Building/BuildingInfo";
import ImageView from "../../components/Building/ImageView";
import ReviewList from "../../components/Building/ReviewList";

export default () => {
  const router = useRouter();
  // router.query.id

  return (
    <AppLayout>
      {/* <SubMapBar /> */}
      <BuildingInfo />
      <ImageView />
      <ReviewList />
    </AppLayout>
  );
};
