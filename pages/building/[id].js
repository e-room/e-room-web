import { useCallback, useEffect, useMemo, useState } from "react";
import { useRecoilState } from "recoil";
import axios from "axios";
import Link from "next/link";
import styled from "@emotion/styled";

import { imageViewState } from "states/buidlingAtom";

import AppLayout from "components/common/AppLayout";
import BuildingInfo from "components/building/BuildingInfo";
import ImageView from "components/building/ImageView";
import ReviewList from "components/building/ReviewList";
import BuildingMap from "components/building/BuildingMap";
import Slider from "components/building/Slider";
import Button from "components/common/atoms/Button";
import Icon from "components/common/atoms/Icon";
import Toast from "components/common/atoms/Toast";
import { useRouter } from "next/router";
import accessValid from "utils/accessValid";
import Loading from "components/common/Loading";
import Error from "components/common/Error";

export default () => {
  const router = useRouter();
  const { id } = router.query;

  const [building, setBuilding] = useState({});
  const [buildingImages, setBuildingImages] = useState({});
  const [buildingReviews, setBuildingReviews] = useState({});
  console.log("building", building);
  console.log("images", buildingImages);
  console.log("review", buildingReviews);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const [showImgDetail, setShowImgDetail] = useRecoilState(imageViewState);

  const onCloseImg = () => {
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
    if (toastVisible) {
      setTimeout(() => {
        setToastVisible(false);
      }, 1000);
    }
  }, [toastVisible]);

  const [favorite, setFavorite] = useState(false);
  const onFavoriteChange = useCallback(() => {
    const valid = accessValid({ redirect_uri: `/building/${id}` });
    if (!valid) return;
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
  }, [favorite]);

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
      {toast}
      {showImgDetail.visible && (
        <Slider
          data={buildingImages.reviewImageList}
          onClose={onCloseImg}
          defaultId={showImgDetail.uuid}
        />
      )}
      <BuildingMap building={building} />
      <BuildingInfo building={building} />
      {buildingImages.reviewImageCount > 0 && (
        <ImageView data={buildingImages.reviewImageList} />
      )}
      {buildingReviews.reviewSlicedList.content.length > 0 && (
        <ReviewList
          reviews={buildingReviews.reviewSlicedList.content}
          buildingId={id}
          needToBlur={buildingReviews.needToBlur}
        />
      )}

      <ButtonItem>
        <Link href={"/review/write"}>
          <a>
            <Button type={"primary"} size={"md"} icon={"plus"}>
              리뷰 쓰기
            </Button>
          </a>
        </Link>
      </ButtonItem>
    </AppLayout>
  );
};

const ButtonItem = styled.div`
  position: fixed;
  bottom: 8px;
  width: 100%;
  display: flex;
  justify-content: center;
  z-index: 2;
`;
