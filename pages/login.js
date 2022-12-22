import { useSetRecoilState } from "recoil";
import styled from "@emotion/styled";
import { getProviders, signIn } from "next-auth/react";

import { Body2, Title1 } from "styles/typography";
import { loginState } from "states/authAtom";

import AppLayout from "components/common/AppLayout";
import SocialButton from "components/common/atoms/SocialButton";

export default function Login({ providers }) {
  const setLoginState = useSetRecoilState(loginState);

  const onLoginClick = (type) => {
    setLoginState((prev) => ({ ...prev, status: true, type }));
  };
  console.log(providers);

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
          {Object.values(providers).map((provider) => (
            <SocialButton
              type={provider.id}
              onClick={() => signIn(provider.id)}
              key={provider.id}
            />
          ))}
        </LoginButtonGroup>
      </LoginWrapper>
    </AppLayout>
  );
}

export async function getServerSideProps(context) {
  const providers = await getProviders();
  return {
    props: { providers },
  };
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
  color: var(--black)
`;

const SubTitle = styled.div`
  ${Body2}

  color: var(--gray-1)
`;
