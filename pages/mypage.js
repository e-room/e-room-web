import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import styled from "@emotion/styled";

import accessValid from "utils/accessValid";

import AppLayout from "components/common/AppLayout";
import Avatar from "components/common/atoms/Avatar";
import Loading from "components/common/lottie/Loading";
import Error from "components/common/Error";
import ChannelTalk from "components/common/ChannelTalk";
import Popup from "components/common/atoms/Popup";
import NeedLogin from "components/common/NeedLogin";
import logEvent from "amplitude/logEvent";
import MenuItem from "components/mypage/MenuItem";
import MenuList from "components/mypage/MenuList";

export default function mypage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [profile, setProfile] = useState({
    id: null,
    name: null,
    email: null,
    profileImageUrl: null,
  });
  let channelTalk;

  const [need, setNeed] = useState(false);
  const getProfile = async () => {
    const valid = await accessValid({ redirect_uri: `/mypage` });
    if (!valid) {
      return setNeed(true);
    }
    if (valid) {
      await axios
        .get(`/apis/member/profile`, {
          withCredentials: true,
        })
        .then((response) => {
          setProfile(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error(error);
          setLoading(false);
        });
    } else {
      setLoading(false);
      // setError(true);
    }
  };

  const goFavoriteFoom = () => {
    router.push(`/favorites`);
  };

  const goInstagram = () => {
    window.open(process.env.NEXT_PUBLIC_INSTAGRAM_LINK, "_blank", "noreferrer");
  };

  const goContact = () => {
    channelTalk.showMessenger();
  };

  const onLogout = async () => {
    logEvent({ name: "click-mypage-logout" });
    const response = await axios.get(`/apis/logout`, { withCredentials: true });
    if (response.status === 200) {
      router.push("/");
    } else {
      alert("로그아웃에 실패했습니다.");
    }
  };

  const [showWithdrawal, setShowWithdrawal] = useState(false);
  const onWithdrawalVisible = (bool) => {
    if (bool) {
      setShowWithdrawal(true);
    } else {
      setShowWithdrawal(false);
    }
  };
  const onWithdrawal = async () => {
    logEvent({ name: "click-mypage-delete_account" });
    const response = await axios.delete(`/apis/member/exit`, {
      withCredentials: true,
    });
    if (response.status === 200) {
      router.push(`/login?redirect_uri=/mypage&isWithdrawal=true`);
    } else {
      alert("탈퇴하기가 실패했습니다.");
    }
  };

  useEffect(() => {
    logEvent({ name: "view-mypage" });
    getProfile();
  }, []);

  useEffect(() => {
    if (profile === undefined) return;
    channelTalk = new ChannelTalk();

    if (profile?.id) {
      channelTalk.boot({
        pluginKey: process.env.NEXT_PUBLIC_CHANNEL_IO_KEY,
        memberId: profile?.id,
        profile: {
          name: profile?.name,
          email: profile?.email,
          avatarUrl: profile?.profileImageUrl,
        },
      });
    } else {
      channelTalk.boot({
        pluginKey: process.env.NEXT_PUBLIC_CHANNEL_IO_KEY,
      });
    }
    return () => {
      channelTalk.shutdown();
    };
  }, [profile]);

  if (need)
    return <NeedLogin visible={need} setVisible={setNeed} useBack={true} />;
  if (loading) return <Loading />;
  if (error) return <Error />;

  return (
    <AppLayout pageTitle={"내정보"}>
      {showWithdrawal && (
        <Popup
          title={"정말 탈퇴하시겠어요?"}
          visible={showWithdrawal}
          buttonType={"warning"}
          cancelText={"취소"}
          submitText={"탈퇴하기"}
          onCancelClick={() => onWithdrawalVisible(false)}
          onConfirmClick={() => onWithdrawal()}
        >
          <div className="text-caption-bold-1 text-center">
            회원님의 모든 리뷰가 사라져요. <br />
            다른 사람들이 쓴 리뷰를 모두 볼 수 없어요.
          </div>
        </Popup>
      )}
      <Container>
        <div className="flex items-center justify-between bg-white gap-[16px] p-[20px]">
          <Avatar size={"lg"} img={profile.profileImageUrl} />
          <div className="flex flex-col gap-[4px] w-full">
            <div className="text-black text-body-bold-1">{profile.name}</div>
            <div className="text-black/[0.5] text-caption-2">
              {profile.email}
            </div>
          </div>
        </div>
        <div className="mt-[20px]">
          <MenuItem
            titleIcon="heart-fill"
            title="찜한 자취방"
            onClick={goFavoriteFoom}
          />
        </div>
        <div className="flex flex-col">
          <div className="text-caption-2 text-gray-1 pt-[20px] pb-[12px] pl-[20px]">
            서비스 정보
          </div>
          <MenuList>
            <MenuItem title="공식 인스타그램" onClick={goInstagram} />
            <MenuItem title="문의하기" onClick={goContact} />
          </MenuList>
          <div className="text-caption-bold-1 flex flex-col p-[20px] gap-[20px]">
            <div className="text-black cursor-pointer" onClick={onLogout}>
              로그아웃
            </div>
            <div
              className="text-black/[0.5] cursor-pointer"
              onClick={() => onWithdrawalVisible(true)}
            >
              탈퇴하기
            </div>
          </div>
        </div>
      </Container>
    </AppLayout>
  );
}

const Container = styled.div`
  height: calc(var(--vh, 1vh) * 100 - 112px);
  background: #f9f9f9;
`;
