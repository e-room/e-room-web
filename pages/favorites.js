import styled from "@emotion/styled";
import AppLayout from "components/common/AppLayout";
import axios from "axios";
import { useEffect, useState } from "react";
import accessValid from "utils/accessValid";
import FavoriteList from "components/favorite/FavoriteList";
import NoDataPage from "components/favorite/NoDataPage";
import Loading from "components/common/lottie/Loading";
import Error from "components/common/Error";
import { Container } from "./buildings";
import NeedLogin from "components/common/NeedLogin";

export default function favorites() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const [need, setNeed] = useState(false);
  const getData = async () => {
    const valid = await accessValid({ redirect_uri: `/favorites` });
    if (!valid) {
      return setNeed(true);
    }
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
    } else {
      setLoading(false);
      setError(true);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  if (need)
    return <NeedLogin visible={need} setVisible={setNeed} useBack={true} />;

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
