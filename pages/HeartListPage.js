import styled from "@emotion/styled";
import PerfectScrollbar from "react-perfect-scrollbar";

import AppLayout from "../components/common/AppLayout";
import BuildingList from "../components/building/BuildingList";
import { useRecoilValue } from "recoil";
import { heartListSelector } from "../states/heartAtom";

export default function HeartListPage() {
  const data = useRecoilValue(heartListSelector);
  return (
    <AppLayout appBarObject={{ headerText: "찜한 자취방" }}>
      <Container>
        <PerfectScrollbar>
          <BuildingList data={data} />
        </PerfectScrollbar>
      </Container>
    </AppLayout>
  );
}
const Container = styled.div`
  height: calc(100vh - 112px);
  background-color: #fafafa !important;
`;
