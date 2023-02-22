import { useEffect, useState } from "react";
import axios from "axios";
import styled from "@emotion/styled";
import { useRouter } from "next/router";

import { Body2, Title1 } from "styles/typography";

import AppLayout from "components/common/AppLayout";
import SocialButton from "components/common/atoms/SocialButton";
import Loading from "components/common/Loading";

export default function Login() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const { redirect_uri = "/" } = router.query;

  const onLoginClick = (type) => {
    if (!type) return;
    router.push(
      `${process.env.NEXT_PUBLIC_API_HOST}/oauth2/authorization/${type}?redirect_uri=${redirect_uri}&is_local=${process.env.NEXT_PUBLIC_IS_LOCAL}`
    );
  };

  useEffect(() => {
    try {
      const onValidCheck = async () => {
        await axios.get(`/apis/token/valid`).then((response) => {
          if (response.data.isValid) router.push(`/`);
          else {
            setLoading(false);
            return true;
          }
        });
      };
      onValidCheck();
    } catch (e) {
      setLoading(false);
      return true;
    }
  }, []);

  if (loading) return <Loading />;

  return (
    <AppLayout>
      <LoginWrapper>
        <LoginIntro>
          <Title>
            꿈의 자취방,
            <br />
            이룸에서 이루어드릴게요!
          </Title>
          <SubTitle>
            로그인하고 실거주자가 들려주는
            <br />
            자취방 이야기를 들어보세요!
          </SubTitle>
        </LoginIntro>
        <LoginButtonGroup>
          <SocialButton type="kakao" onClick={() => onLoginClick("kakao")} />
          <SocialButton type="google" onClick={() => onLoginClick("google")} />
          <SocialButton type="naver" onClick={() => onLoginClick("naver")} />
        </LoginButtonGroup>
      </LoginWrapper>
    </AppLayout>
  );
}

const LoginWrapper = styled.div`
  margin: 0px 20px;
  margin-top: 25vh;
`;

const LoginIntro = styled.div`
  div:nth-of-type(1) {
    margin-bottom: 12px;
  }
  div:nth-of-type(2) {
    margin-bottom: 32px;
  }
`;

const LoginButtonGroup = styled.div`
  display: flex;
  flex-direction: column;

  // TODO: tailwind -> mb-8 이런걸로 바꾸기
  button:nth-of-type(1) {
    margin-bottom: 8px;
  }
  button:nth-of-type(2) {
    margin-bottom: 8px;
  }
`;

const Title = styled.div`
  ${Title1}
  color: var(--black);
`;

const SubTitle = styled.div`
  ${Body2}

  color: var(--gray-1);
`;
