import styled from "@emotion/styled";
import AppLayout from "components/common/AppLayout";
import axios from "axios";
import { useEffect, useState } from "react";
import accessValid from "utils/accessValid";
import FavoriteList from "components/building/FavoriteList";
import NoDataPage from "components/favorite/NoDataPage";
import Loading from "components/common/Loading";
import Error from "components/common/Error";

export default function favorites() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const getData = async () => {
    const valid = await accessValid({ redirect_uri: `/favorites` });
    if (valid) {
      await axios
        .get(`/apis/member/favorite`)
        .then((response) => {
          setData(response.data.content);
          setLoading(false);
        })
        .catch((error) => {
          console.error(error.message);
          setLoading(false);
          setError(true);
        });
    }
  };

  useEffect(() => {
    getData();
  }, []);

  if (loading) return <Loading />;
  if (error) return <Error />;

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
