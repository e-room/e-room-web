import { useEffect } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import Link from "next/link";
import styled from "@emotion/styled";

import AppLayout from "components/common/AppLayout";
import Button from "components/common/atoms/Button";
import Icon from "components/common/atoms/Icon";
import BuildingList from "components/building/BuildingList";

import { pageTitleState } from "states";
import { buildingListSelector } from "states/buidlingAtom";

export default function buildings() {
  const data = useRecoilValue(buildingListSelector);
  const setPageTitleState = useSetRecoilState(pageTitleState);

  useEffect(() => {
    setPageTitleState("이 지역 자취방");
  }, []);

  return (
    <AppLayout
    // appBarObject={{ rightIcon: "filter-stroke", headerText: "" }}
    >
      <Container>
        <div style={{ paddingBottom: 150 }}>
          <Banner>배너영역</Banner>
          <BuildingList data={data} />
        </div>
        <ButtonGroup>
          <Link href={"/review/write"}>
            <a>
              <Button type={"primary"} size={"md"} icon={"plus"}>
                리뷰 쓰기
              </Button>
            </a>
          </Link>
        </ButtonGroup>
      </Container>
    </AppLayout>
  );
}

const Container = styled.div`
  height: calc(100vh - 112px);
  background-color: #fafafa !important;
  overflow: scroll;
`;

const ButtonGroup = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  position: fixed;
  bottom: 64px;
`;
const Banner = styled.div`
  width: 100%;
  height: 84px;
  background-color: var(--primary-5);
`;
