import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import styled from "@emotion/styled";

import accessValid from "utils/accessValid";
import {
  Body1Bold,
  Body2Bold,
  Caption1Bold,
  Caption2,
} from "styles/typography";

import AppLayout from "components/common/AppLayout";
import Avatar from "components/common/atoms/Avatar";
import Icon from "components/common/atoms/Icon";
import Loading from "components/common/lottie/Loading";
import Error from "components/common/Error";
import ChannelTalk from "components/common/ChannelTalk";
import Popup from "components/common/atoms/Popup";
import NeedLogin from "components/common/NeedLogin";
import logEvent from "amplitude/logEvent";

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
          <PopupSubTitle>
            회원님의 모든 리뷰가 사라져요. <br />
            다른 사람들이 쓴 리뷰를 모두 볼 수 없어요.
          </PopupSubTitle>
        </Popup>
      )}
      <Container>
        <MyInfo>
          <Avatar size={"lg"} img={profile.profileImageUrl} />
          <Box>
            <div className="nickname">{profile.name}</div>
            <div className="email">{profile.email}</div>
          </Box>
        </MyInfo>
        <ServiceInfo>
          <AreaTitle>서비스 정보</AreaTitle>
          <MenuList>
            <Link href={`${process.env.NEXT_PUBLIC_INSTAGRAM_LINK}`}>
              <a target="_blank" rel="noreferrer">
                <MenuItem>
                  <div>공식 인스타그램</div>
                  <Icon
                    icon={"arrow-right"}
                    size={"md"}
                    fill={"var(--gray-3)"}
                  />
                </MenuItem>
              </a>
            </Link>
            <MenuItem onClick={goContact}>
              <div>문의하기</div>
              <Icon icon={"arrow-right"} size={"md"} fill={"var(--gray-3)"} />
            </MenuItem>
          </MenuList>
          <ButtonGroup>
            <Button className="logout" onClick={onLogout}>
              로그아웃
            </Button>
            <Button
              className="withdrawal"
              onClick={() => onWithdrawalVisible(true)}
            >
              탈퇴하기
            </Button>
          </ButtonGroup>
        </ServiceInfo>
      </Container>
    </AppLayout>
  );
}

const Container = styled.div`
  background-color: #fafafa;
  height: calc(var(--vh, 1vh) * 100 - 112px);
`;

const MyInfo = styled.div`
  height: 104px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  background-color: var(--white);

  gap: 16px;
  padding: 20px;

  .nickname {
    ${Body1Bold}
    color: var(--black);
  }

  .email {
    ${Caption2}
    color: var(--black);
    opacity: 0.5;
  }
`;

const Box = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 100%;
`;

const ServiceInfo = styled.div`
  display: flex;
  flex-direction: column;
`;
const AreaTitle = styled.div`
  ${Caption2}
  color: var(--gray-1);

  padding: 20px 0 12px 20px;
`;

const MenuList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;
const MenuItem = styled.div`
  ${Body2Bold}
  color: var(--black);
  background: var(--white);

  display: flex;
  justify-content: space-between;
  padding: 16px 20px;
  gap: 16px;

  cursor: pointer;
`;

const ButtonGroup = styled.div`
  ${Caption1Bold}

  display: flex;
  flex-direction: column;
  padding: 20px;
  gap: 20px;

  color: var(--black);
  .withdrawal {
    opacity: 0.5;
  }
`;

const Button = styled.div`
  cursor: pointer;
`;
const PopupSubTitle = styled.div`
  ${Caption1Bold}
  text-align: center;
`;
