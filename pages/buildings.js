import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import Link from "next/link";
import styled from "@emotion/styled";

import AppLayout from "components/common/AppLayout";
import Button from "components/common/atoms/Button";
import BuildingList from "components/building/BuildingList";

import { pageTitleState } from "states";
import axios from "axios";

export default function buildings({ data }) {
  const setPageTitleState = useSetRecoilState(pageTitleState);
  console.log("data", data);

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
          {/* <BuildingList data={data} /> */}
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

// This gets called on every request
export async function getServerSideProps() {
  // Fetch data from external API
  const res = await axios.get(`${process.env.NEXT_PUBLIC_API_HOST}/building`, {
    headers: {
      isLocal: true,
    },
  });

  // Pass data to the page via props
  return {
    props: {
      data: res.data,
    },
  };
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
