import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import styled from "@emotion/styled";

import accessValid from "utils/accessValid";
import { Body1Bold, Body2Bold, Caption1Bold, Caption2 } from "styles/typography";

import AppLayout from "components/common/AppLayout";
import Avatar from "components/common/atoms/Avatar";
import Icon from "components/common/atoms/Icon";
import Loading from "components/common/Loading";
import Error from "components/common/Error";

export default function mypage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [profile, setProfile] = useState({
    name: null,
    email: null,
    profileImageUrl: null,
  });
  const getProfile = async () => {
    const valid = await accessValid({ redirect_uri: `/mypage` });
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
          console.error(error.message);
          setLoading(false);
          setError(true);
        });
    } else {
      setLoading(false);
      setError(true);
    }
  };

  const goContact = () => {
    alert("문의하기");
  };

  const onLogout = async () => {
    const response = await axios.get(`/apis/logout`, { withCredentials: true });
    if (response.status === 200) {
      router.push("/");
    } else {
      alert("로그아웃에 실패했습니다.");
    }
  };

  const onWithdrawal = async () => {
    const response = await axios.delete(`/apis/member/exit`, {
      withCredentials: true,
    });
    if (response.status === 200) {
      router.push("/");
    } else {
      alert("탈퇴하기가 실패했습니다.");
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  if (loading) return <Loading />;
  if (error) return <Error />;

  return (
    <AppLayout pageTitle={"내정보"}>
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
                  <Icon icon={"arrow-right"} size={"md"} fill={"var(--gray-3)"} />
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
            <Button className="withdrawal" onClick={onWithdrawal}>
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
  width: 100vw;
  height: 100vh;
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
