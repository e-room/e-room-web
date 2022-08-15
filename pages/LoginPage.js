import { useContext } from "react";
import SocialButton from "../components/button/SocialButton";
import { GlobalContext } from "./_app";

export default function LoginPage() {
  const { setIsLogin } = useContext(GlobalContext);

  return (
    <div>
      <div className="login-wrapper">
        <div className="container">
          <div className="login-intro">
            <div
              className="title-1 text-black"
              // style="margin-bottom: 12px;"
            >
              꿈의 자취방,
              <br />
              이룸에서 이루어드릴게요!
            </div>
            <div
              className="body-2 text-gray-1"
              // style="margin-bottom: 32px;"
            >
              로그인하고 실거주자가 들려주는
              <br />
              자취방 이야기를 들어보세요!
            </div>
          </div>
          <SocialButton type="kakao" onClick={() => setIsLogin(true)} />
          <SocialButton type="google" onClick={() => setIsLogin(true)} />
          <SocialButton type="naver" onClick={() => setIsLogin(true)} />
        </div>
      </div>
    </div>
  );
}
