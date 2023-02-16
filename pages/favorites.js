import styled from "@emotion/styled";
import AppLayout from "components/common/AppLayout";
import axios from "axios";
import { useEffect, useState } from "react";
import accessValid from "utils/accessValid";
import FavoriteList from "components/building/FavoriteList";
import NoDataPage from "components/favorite/NoDataPage";

export default function favorites() {
  const [data, setData] = useState([]);
  const getData = async () => {
    const valid = await accessValid({ redirect_uri: `/favorites` });
    if (valid) {
      await axios
        .get(`/apis/member/favorite`)
        .then((res) => setData(res.data.content));
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <AppLayout pageTitle={"찜한 자취방"}>
      <Container>
        {data.length > 0 ? <FavoriteList data={data} /> : <NoDataPage />}
      </Container>
    </AppLayout>
  );
}
const Container = styled.div`
  height: calc(100vh - 112px);
  background-color: #fafafa !important;
  overflow: scroll;
`;
