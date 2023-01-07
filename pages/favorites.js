import styled from "@emotion/styled";

import AppLayout from "components/common/AppLayout";
import BuildingList from "components/building/BuildingList";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { heartListSelector } from "states/heartAtom";
import { pageTitleState } from "states";
import { useEffect } from "react";
import { buildingListSelector } from "states/buidlingAtom";

export default function favorites() {
  // const data = useRecoilValue(buildingListSelector);
  const setPageTitleState = useSetRecoilState(pageTitleState);

  useEffect(() => {
    setPageTitleState("찜한 자취방");
  }, []);

  return (
    <AppLayout>
      <Container>{/* <BuildingList data={data} /> */}</Container>
    </AppLayout>
  );
}
const Container = styled.div`
  height: calc(100vh - 112px);
  background-color: #fafafa !important;
  overflow: scroll;
`;
