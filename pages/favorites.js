import styled from "@emotion/styled";

import AppLayout from "components/common/AppLayout";
import BuildingList from "components/building/BuildingList";

export default function favorites() {
  return (
    <AppLayout pageTitle={"찜한 자취방"}>
      <Container>{/* <BuildingList data={data} /> */}</Container>
    </AppLayout>
  );
}
const Container = styled.div`
  height: calc(100vh - 112px);
  background-color: #fafafa !important;
  overflow: scroll;
`;
