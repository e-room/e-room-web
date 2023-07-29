import { useCallback, useEffect, useMemo, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import axios from "axios";
import styled from "@emotion/styled";

import { imageViewState } from "states/buidlingAtom";

import AppLayout from "components/common/AppLayout";
import ImageView from "components/building/ImageList";
import ReviewList from "components/building/ReviewList";
import BuildingMap from "components/building/BuildingMap";
import Slider from "components/building/Slider";
import Button from "components/common/atoms/Button";
import Icon from "components/common/atoms/Icon";
import Toast from "components/common/atoms/Toast";
import { useRouter } from "next/router";
import accessValid from "utils/accessValid";
import Loading from "components/common/lottie/Loading";
import Error from "components/common/Error";
import NoReview from "components/building/reviewItems/NoReview";
import Info from "components/building/Info";
import Score from "components/building/Score";
import NeedLogin from "components/common/NeedLogin";
import { reviewSuccessToastState } from "states/reviewAtom";
import logEvent from "amplitude/logEvent";

export default () => {
  const router = useRouter();
  const { id, isReview, returnType } = router.query;

  const [building, setBuilding] = useState({});
  const [buildingImages, setBuildingImages] = useState({});
  const [buildingReviews, setBuildingReviews] = useState({});

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const [profile, setProfile] = useState({});
  const [showImgDetail, setShowImgDetail] = useRecoilState(imageViewState);
  const reviewSucess = useRecoilValue(reviewSuccessToastState);

  const onCloseImg = () => {
    document.body.style.overflow = "unset";

    setShowImgDetail({ visible: false, uuid: null });
  };
  const [favoriteSuccess, setFavoriteSuccess] = useState(false);

  useEffect(() => {
    try {
      const getProfile = async () => {
        await axios
          .get(`/apis/member/profile`, {
            withCredentials: true,
          })
          .then((response) => {
            setProfile(response.data);
          })
          .catch((error) => {
            console.error(error);
          });
      };
      getProfile();
    } catch (e) {
      return true;
    }
  }, []);

  const [favorite, setFavorite] = useState(false);
  const [need, setNeed] = useState(false);
  const onFavoriteChange = useCallback(async () => {
    const valid = await accessValid({ redirect_uri: `/building/${id}` });
    if (!valid) return setNeed(true);
    if (valid) {
      if (favorite) {
        axios
          .delete(`/apis/member/favorite/${id}`)
          .then((res) => {
            setFavorite(false);
          })
          .catch((error) => {
            console.error(error);
          });
      } else {
        axios
          .post(`/apis/member/favorite/${id}`)
          .then(() => {
            setFavoriteSuccess(true);
            setFavorite(true);
          })
          .catch((error) => {
            console.error(error);
          });
      }
    }
  }, [favorite, need, id]);

  useEffect(() => {
    if (id) {
      logEvent({ name: "view-building", property: { buildingID: id } });

      const callData = async () => {
        const callBuilding = axios.get(`/apis/building/${id}`);
        const callImages = axios.get(`/apis/building/${id}/images`);
        const callReviews = axios.get(
          `/apis/building/${id}/room/review?size=4&sort=id,DESC`
        );
        await axios
          .all([callBuilding, callImages, callReviews])
          .then((response) => {
            setBuilding(response[0].data);
            setFavorite(response[0].data.isFavorite);
            setBuildingImages(response[1].data);
            setBuildingReviews(response[2].data);
            setLoading(false);
          })
          .catch((error) => {
            console.error(error);
            setLoading(false);
            setError(true);
          });
      };

      callData();
    }
  }, [id]);

  const [goodReviewSuccess, setGoodReviewSuccess] = useState(false);

  useEffect(() => {
    if (!reviewSucess) return;
    setGoodReviewSuccess(true);
  }, [reviewSucess]);

  const goReviewWrite = () => {
    const address = encodeURI(JSON.stringify(building.address));
    const name = encodeURI(building.name);
    const query = { address, name };
    sessionStorage.setItem("buildingQuery", JSON.stringify(query));

    logEvent({ name: "click-building-write", property: { buildingID: id } });
    router.push(`/review/write`);
  };

  if (loading) return <Loading />;
  if (error) return <Error />;

  return (
    <AppLayout
      pageTitle={`${building.name ?? ""} 리뷰`}
      enabledNavbar={false}
      additionalFunction={
        <Icon
          icon={favorite ? "heart-fill" : "heart-stroke"}
          size={"md"}
          fill={favorite ? "fill-primary-1" : "fill-black"}
          onClick={onFavoriteChange}
        />
      }
    >
      {need && <NeedLogin visible={need} setVisible={setNeed} />}
      {favoriteSuccess && <Toast text={"이 건물을 찜목록에 담았어요."} />}
      {goodReviewSuccess && <Toast text={"리뷰를 잘 등록했어요."} />}
      <Container>
        {showImgDetail.visible && (
          <Slider
            data={buildingImages.reviewImageList}
            onClose={onCloseImg}
            defaultId={showImgDetail.uuid}
          />
        )}
        <BuildingMap building={building} />
        <Info building={building} />
        {buildingReviews.reviewSlicedList.content.length > 0 && (
          <Score building={building} />
        )}
        {buildingImages.reviewImageCount > 0 && (
          <ImageView data={buildingImages.reviewImageList} />
        )}
        {buildingReviews.reviewSlicedList.content.length > 0 ? (
          <ReviewList
            profile={profile}
            reviews={buildingReviews.reviewSlicedList.content}
            buildingId={id}
            needToBlur={buildingReviews.needToBlur}
          />
        ) : (
          <NoReview building={building} goReviewWrite={goReviewWrite} />
        )}
        {buildingReviews.reviewSlicedList.content.length > 0 && (
          <div className="fixed bottom-[8px] w-full max-w-[720px] flex justify-center z-[2]">
            <Button
              type={"primary"}
              size={"md"}
              icon={"plus"}
              onClick={goReviewWrite}
            >
              이 자취방 리뷰 쓰기
            </Button>
          </div>
        )}
      </Container>
    </AppLayout>
  );
};

// no review의 bg에 flex-grow 적용하기 위해
// flex, flex-column 추가함
const Container = styled.div`
  height: calc(100vh - 44px);
  display: flex;
  flex-direction: column;
`;
