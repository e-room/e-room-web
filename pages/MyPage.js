import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import AppLayout from "components/common/AppLayout";
import { pageTitleState } from "states";

export default function mypage() {
  const setPageTitleState = useSetRecoilState(pageTitleState);

  useEffect(() => {
    setPageTitleState("내정보");
  }, []);
  return <AppLayout>내 정보</AppLayout>;
}
