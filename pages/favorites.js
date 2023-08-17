import AppLayout from "components/common/AppLayout";
import { useEffect, useState } from "react";
import accessValid from "utils/accessValid";
import FavoriteList from "components/favorite/FavoriteList";
import NoDataPage from "components/favorite/NoDataPage";
import Loading from "components/common/lottie/Loading";
import Error from "components/common/Error";
import NeedLogin from "components/common/NeedLogin";
import logEvent from "amplitude/logEvent";
import { getFavoriteData } from "services/member.service";

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
      await getFavoriteData()
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
    logEvent({ name: "view-favorites" });
    getData();
  }, []);

  if (need)
    return <NeedLogin visible={need} setVisible={setNeed} useBack={true} />;

  if (loading) return <Loading />;
  if (error) return <Error />;

  return (
    <AppLayout pageTitle={"찜한 자취방"}>
      <div className="h-[calc(100vh-100px)]">
        {data.length > 0 ? <FavoriteList data={data} /> : <NoDataPage />}
      </div>
    </AppLayout>
  );
}
