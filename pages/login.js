import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

import AppLayout from "components/common/AppLayout";
import SocialButton from "components/common/atoms/SocialButton";
import Loading from "components/common/lottie/Loading";
import Toast from "components/common/atoms/Toast";
import logEvent from "amplitude/logEvent";

export default function Login() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const { redirect_uri = "/", isWithdrawal } = router.query;

  const onLoginClick = (type) => {
    if (!type) return;
    logEvent({ name: "click-login-login", property: { login_type: type } });
    router.push(
      `${process.env.NEXT_PUBLIC_API_HOST}/oauth2/authorization/${type}?redirect_uri=${redirect_uri}&is_local=${process.env.NEXT_PUBLIC_IS_LOCAL}`
    );
  };

  useEffect(() => {
    logEvent({ name: "view-login" });

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

  const [toastVisible, setToastVisible] = useState(false);
  const toast = useMemo(() => {
    return (
      <Toast
        icon={"check-circle"}
        iconColor={"success"}
        text={"탈퇴가 완료되었어요."}
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
  useEffect(() => {
    if (!isWithdrawal) return;
    setToastVisible(true);
  }, [isWithdrawal]);

  if (loading) return <Loading />;

  return (
    <AppLayout>
      {toast}
      <div className="mt-[25vh] mx-[20px]">
        <div className="text-title-1 text-black mb-[12px]">
          꿈의 자취방,
          <br />
          이룸에서 이루어드릴게요!
        </div>
        <div className="text-body-2 text-gray-1">
          로그인하고 실거주자가 들려주는
          <br />
          자취방 이야기를 들어보세요!
        </div>
        <div className="flex flex-col gap-[8px] mt-[32px]">
          <SocialButton type="kakao" onClick={() => onLoginClick("kakao")} />
          <SocialButton type="google" onClick={() => onLoginClick("google")} />
          <SocialButton type="naver" onClick={() => onLoginClick("naver")} />
        </div>
      </div>
    </AppLayout>
  );
}
