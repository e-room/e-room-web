import styled from "@emotion/styled";

import AppLayout from "components/common/AppLayout";
import BuildingList from "components/building/BuildingList";
import axios from "axios";
import { useEffect, useState } from "react";
import accessValid from "utils/accessValid";

export default function favorites() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({});
  const getData = async () => {
    const valid = await accessValid({ redirect_uri: `/favorites` });
    if (valid) {
      setLoading(true);
      await axios
        .get(`/apis/member/favorite`, {
          headers: {
            mocking: 239,
          },
        })
        .then((res) => setData(res.data));
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  if (loading) return <div>loading...</div>;

  return (
    <AppLayout pageTitle={"찜한 자취방"}>
      <Container>
        {data?.content?.length > 0 && <BuildingList data={data} />}
      </Container>
    </AppLayout>
  );
}
const Container = styled.div`
  height: calc(100vh - 112px);
  background-color: #fafafa !important;
  overflow: scroll;
`;
