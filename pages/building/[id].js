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

export default ({ data, imgs, reviews }) => {
  const router = useRouter();
  const { id } = router.query;

  const building = JSON.parse(data);
  const buildingImages = JSON.parse(imgs);
  const buildingReviews = JSON.parse(reviews);

  const [showImgDetail, setShowImgDetail] = useRecoilState(imageViewState);

  const onCloseImg = () => {
    setShowImgDetail(false);
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
          console.log(res);
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
      <Container>
        {showImgDetail && (
          <Slider data={buildingImages.reviewImageList} onClose={onCloseImg} />
        )}
        <BuildingMap building={building} />
        <BuildingInfo building={building} />
        {buildingImages.reviewImageCount > 0 && (
          <ImageView data={buildingImages.reviewImageList} />
        )}
        {buildingReviews.content.length > 0 && (
          <ReviewList data={buildingReviews} buildingId={id} />
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
      </Container>
    </AppLayout>
  );
};

export async function getServerSideProps({ params }) {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_API_HOST}/building/${params.id}`,
    {
      headers: {
        mocking: 239,
      },
    }
  );
  const res1 = await axios.get(
    `${process.env.NEXT_PUBLIC_API_HOST}/building/${params.id}/images`,
    {
      headers: {
        mocking: 239,
      },
    }
  );
  const res2 = await axios.get(
    `${process.env.NEXT_PUBLIC_API_HOST}/building/${params.id}/room/review`,
    {
      headers: {
        mocking: 239,
      },
    }
  );
  const data = JSON.stringify(res.data);
  const imgs = JSON.stringify(res1.data);
  const reviews = JSON.stringify(res2.data);
  return {
    // Passed to the page component as props
    props: { data, imgs, reviews },
  };
}

const Container = styled.div`
  overflow: scroll;
`;

const ButtonItem = styled.div`
  position: fixed;
  bottom: 8px;
  width: 100%;
  display: flex;
  justify-content: center;
  z-index: 2;
`;
