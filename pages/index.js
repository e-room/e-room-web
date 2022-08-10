import AppLayout from "../components/layout/AppLayout";

const Home = () => {
  return (
    <AppLayout>
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
          <button
            class="btn-social-google"
            onclick="location.href='/oauth2/authorization/google';"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              // width="24"
              // height="24"
              viewBox="0 0 24 24"
              fill="none"
              // style="vertical-align: -7;
              //               position: relative;
              //               left: -67px;"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M20.64 12.2046C20.64 11.5664 20.5827 10.9527 20.4764 10.3636H12V13.845H16.8436C16.635 14.97 16.0009 15.9232 15.0477 16.5614V18.8196H17.9564C19.6582 17.2527 20.64 14.9455 20.64 12.2046Z"
                fill="#4285F4"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M12.0001 21C14.4301 21 16.4674 20.1941 17.9565 18.8195L15.0479 16.5613C14.2419 17.1013 13.211 17.4204 12.0001 17.4204C9.65603 17.4204 7.67194 15.8372 6.96422 13.71H3.9574V16.0418C5.43831 18.9831 8.48194 21 12.0001 21Z"
                fill="#34A853"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M6.96409 13.7099C6.78409 13.1699 6.68182 12.5931 6.68182 11.9999C6.68182 11.4068 6.78409 10.8299 6.96409 10.2899V7.95813H3.95727C3.34773 9.17313 3 10.5477 3 11.9999C3 13.4522 3.34773 14.8268 3.95727 16.0418L6.96409 13.7099Z"
                fill="#FBBC05"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M12.0001 6.57955C13.3215 6.57955 14.5079 7.03364 15.4406 7.92545L18.0219 5.34409C16.4633 3.89182 14.426 3 12.0001 3C8.48194 3 5.43831 5.01682 3.9574 7.95818L6.96422 10.29C7.67194 8.16273 9.65603 6.57955 12.0001 6.57955Z"
                fill="#EA4335"
              />
            </svg>
            <span class="body-bold-2">구글 아이디로 로그인</span>
          </button>
          <button
            class="btn-social-kakao"
            onclick="location.href='/oauth2/authorization/kakao';"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              // width="18"
              // height="17"
              viewBox="0 0 18 17"
              fill="none"
              // style="vertical-align: -3;
              //               position: relative;
              //               left: -60px;"
            >
              <path
                d="M8.9975 0.5C4.02888 0.5 0 3.55771 0 7.33833C0 9.6829 1.55957 11.7344 3.92891 12.98L2.92919 16.5603C2.91178 16.6313 2.91707 16.7057 2.94433 16.7736C2.97159 16.8415 3.01951 16.8996 3.08162 16.9401C3.14374 16.9806 3.21707 17.0015 3.29171 16.9999C3.36634 16.9984 3.43871 16.9745 3.49903 16.9315L7.87781 14.0936C8.24771 14.1278 8.62261 14.1522 9.0025 14.1522C13.9711 14.1522 18 11.0945 18 7.31391C18 3.53329 13.9661 0.5 8.9975 0.5Z"
                fill="black"
                fill-opacity="0.85"
              />
            </svg>
            <span class="body-bold-2">카카오 계정으로 로그인</span>
          </button>
          <button
            class="btn-social-naver"
            onclick="location.href='/oauth2/authorization/naver';"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              // width="16"
              // height="16"
              viewBox="0 0 16 16"
              fill="none"
              // style="vertical-align: -2;
              //               position: relative;
              //               left: -60px;"
            >
              {/* > */}
              <path
                d="M10.6777 8.525L5.11157 0.5H0.5V15.5H5.33471V7.475L10.8884 15.5H15.5V0.5H10.6777V8.525Z"
                fill="white"
              />
            </svg>
            <span class="body-bold-2 text-white">네이버 아이디로 로그인</span>
          </button>
        </div>

        {/* <th:block th:insert="common/fragments :: navBar" /> */}
      </div>
    </AppLayout>
  );
};

export default Home;
