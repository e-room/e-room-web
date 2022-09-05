import AppLayout from "../components/layout/AppLayout";

import { useRecoilState } from "recoil";
import { pageNameState } from "../states";

export default function MyPage() {
  const [pageName, setPageName] = useRecoilState(pageNameState);

  console.log("pageName", pageName);
  return (
    <AppLayout appBarObject={{ headerText: "내정보" }}>
      <div onClick={() => setPageName("MyPage")}>내 정보 {pageName}</div>
    </AppLayout>
  );
}
