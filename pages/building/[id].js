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
  const [toastVisible, setToastVisible] = useState(false);
  const toast = useMemo(() => {
    return (
      <Toast
        icon={"check-circle"}
        iconColor={"success"}
        text={"이 건물을 찜목록에 담았어요."}
        visible={toastVisible}
      />
    );
  }, [toastVisible]);

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

  useEffect(() => {
    if (toastVisible) {
      setTimeout(() => {
        setToastVisible(false);
      }, 1000);
    }
  }, [toastVisible]);

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
            setToastVisible(true);
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

  const [reviewToastVisible, setReviewToastVisible] = useState(false);
  const reviewToast = useMemo(() => {
    return (
      <Toast
        icon={"check-circle"}
        iconColor={"success"}
        text={"리뷰를 잘 등록했어요."}
        visible={reviewToastVisible}
      />
    );
  }, [reviewToastVisible]);
  useEffect(() => {
    if (reviewToastVisible) {
      setTimeout(() => {
        setReviewToastVisible(false);
      }, 3000);
    }
  }, [reviewToastVisible]);
  useEffect(() => {
    if (!reviewSucess) return;
    setReviewToastVisible(true);
  }, [reviewSucess]);

  const goReviewWrite = () => {
    const address = encodeURI(JSON.stringify(building.address));
    const name = encodeURI(building.name);
    const query = { address, name };
    sessionStorage.setItem("buildingQuery", JSON.stringify(query));

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
          fill={favorite ? "var(--primary-1)" : "var(--black)"}
          onClick={onFavoriteChange}
        />
      }
    >
      {need && <NeedLogin visible={need} setVisible={setNeed} />}
      {toast}
      {reviewToast}
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
          <ButtonItem>
            <Button
              type={"primary"}
              size={"md"}
              icon={"plus"}
              onClick={goReviewWrite}
            >
              이 자취방 리뷰 쓰기
            </Button>
          </ButtonItem>
        )}
      </Container>
    </AppLayout>
  );
};

const Container = styled.div`
  height: calc(100vh - 44px);
  background-color: #fafafa;
`;

const ButtonItem = styled.div`
  position: fixed;
  bottom: 8px;
  width: 100%;
  max-width: 720px;
  display: flex;
  justify-content: center;
  z-index: 2;
`;
