import SocialButton from "../components/button/SocialButton";

export default function LoginPage() {
  return (
    <div>
      <div class="login-wrapper">
        {/* <th:block th:insert="common/fragments :: appBar" /> */}
        <div class="container">
          <div class="login-intro">
            <div
              class="title-1 text-black"
              // style="margin-bottom: 12px;"
            >
              꿈의 자취방,
              <br />
              이룸에서 이루어드릴게요!
            </div>
            <div
              class="body-2 text-gray-1"
              // style="margin-bottom: 32px;"
            >
              로그인하고 실거주자가 들려주는
              <br />
              자취방 이야기를 들어보세요!
            </div>
          </div>
          <SocialButton type="kakao" />
          <SocialButton type="google" />
          <SocialButton type="naver" />
        </div>
      </div>
    </div>
  );
}
