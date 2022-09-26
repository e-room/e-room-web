import styled from "@emotion/styled";
import AppLayout from "../components/common/AppLayout";
import Button from "../components/common/atoms/Button";
import Icon from "../components/common/atoms/Icon";

import Link from "next/link";
import PerfectScrollbar from "react-perfect-scrollbar";
import BuildingList from "../components/building/BuildingList";
import { useRecoilValue } from "recoil";
import { buildingListSelector } from "../states/buidlingAtom";

export default function BuildingListPage() {
  const data = useRecoilValue(buildingListSelector);
  return (
    <AppLayout
      appBarObject={{ rightIcon: "filter-stroke", headerText: "이 지역 자취방" }}
    >
      <Container>
        <PerfectScrollbar>
          <div style={{ paddingBottom: 150 }}>
            <Banner>배너영역</Banner>
            <BuildingList data={data} />
          </div>
          <ButtonGroup>
            <Link href={"/ReviewFormPage"}>
              <a>
                {/* //TODO: icon button기능 추가.. 필요.. */}
                <Button type={"primary"} size={"sm"}>
                  <Icon icon={"plus"} size={"md"} fill={"var(--white)"} />
                  리뷰 쓰기
                </Button>
              </a>
            </Link>
          </ButtonGroup>
        </PerfectScrollbar>
      </Container>
    </AppLayout>
  );
}

const Container = styled.div`
  height: calc(100vh - 112px);
  background-color: #fafafa !important;
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
