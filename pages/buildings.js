import { useEffect, useState } from "react";
import Link from "next/link";
import styled from "@emotion/styled";

import AppLayout from "components/common/AppLayout";
import Button from "components/common/atoms/Button";
import BuildingList from "components/building/BuildingList";

import axios from "axios";
import Banner1 from "assets/banner/banner1.png";

export default function buildings({ data }) {
  // const parseData = data ? JSON.parse(data) : [];
  const [parseData, setParseData] = useState([]);
  console.log("buildingList", parseData);

  useEffect(() => {
    const buildingMarking = JSON.parse(
      localStorage.getItem("buildingMarking")
    ).buildingList.map((v) => v.buildingId);

    axios
      .get(
        `${process.env.NEXT_PUBLIC_API_HOST}/building?buildingIds=${buildingMarking}`,
        {
          headers: {
            mocking: 239,
          },
        }
      )
      .then((res) => {
        setParseData(res.data);
      });
  }, []);

  if (parseData.length <= 0) {
    return <div>loading...</div>;
  }

  return (
    <AppLayout pageTitle={"이 지역 자취방"}>
      <Container>
        <div style={{ paddingBottom: 150 }}>
          <Banner>
            <img src={Banner1.src} width={"100%"} height={"100%"} />
          </Banner>
          <BuildingList data={parseData} />
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

// export async function getServerSideProps(context) {
//   // console.log("zz", buildingIds);
//   const test =
//     typeof window !== "undefined"
//       ? JSON.parse(localStorage.getItem("buildingMarking"))
//       : null;

//   console.log("test", test);

//   const res = await axios.get(
//     `${process.env.NEXT_PUBLIC_API_HOST}/building?buildingIds=47`,
//     {
//       headers: {
//         mocking: 239,
//       },
//     }
//   );
//   const data = await JSON.stringify(res.data);

//   return {
//     props: { data }, // will be passed to the page component as props
//   };
// }

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
