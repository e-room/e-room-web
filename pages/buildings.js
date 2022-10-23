import styled from "@emotion/styled";
import AppLayout from "components/common/AppLayout";
import Button from "components/common/atoms/Button";
import Icon from "components/common/atoms/Icon";

import Link from "next/link";
import BuildingList from "components/building/BuildingList";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { buildingListSelector } from "states/buidlingAtom";
import { pageTitleState } from "states";
import { useEffect } from "react";

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
              {/* //TODO: icon button기능 추가.. 필요.. */}
              <Button type={"primary"} size={"md"}>
                <Icon icon={"plus"} size={"lg"} fill={"var(--white)"} />
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
