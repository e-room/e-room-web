import { useRouter } from "next/router";
import AppLayout from "../../components/layout/AppLayout";
import styled from "@emotion/styled";
import BuildingInfo from "../../components/Building/BuildingInfo";

export default () => {
  const router = useRouter();
  // router.query.id

  return (
    <AppLayout>
      {/* <SubMapBar /> */}
      <BuildingInfo />
      {/* <ReviewList /> */}
    </AppLayout>
  );
};
