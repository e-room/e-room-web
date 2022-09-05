import { useContext } from "react";
import SocialButton from "../components/button/SocialButton";
import { GlobalContext } from "./_app";

import styled from "@emotion/styled";
import AppLayout from "../components/layout/AppLayout";

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

export default function LoginPage() {
  const { setIsLogin } = useContext(GlobalContext);

  return (
    <AppLayout>
      <LoginWrapper>
        <LoginIntro>
          <div className="title-1 text-black">
            꿈의 자취방,
            <br />
            이룸에서 이루어드릴게요!
          </div>
          <div className="body-2 text-gray-1">
            로그인하고 실거주자가 들려주는
            <br />
            자취방 이야기를 들어보세요!
          </div>
        </LoginIntro>
        <LoginButtonGroup>
          <SocialButton type="kakao" onClick={() => setIsLogin(true)} />
          <SocialButton type="google" onClick={() => setIsLogin(true)} />
          <SocialButton type="naver" onClick={() => setIsLogin(true)} />
        </LoginButtonGroup>
      </LoginWrapper>
    </AppLayout>
  );
}
