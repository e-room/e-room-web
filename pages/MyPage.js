import AppLayout from "../components/common/AppLayout";

import { useRecoilState } from "recoil";
import { pageNameState } from "../states";
import { myPageState } from "../states/myPageAtom";

export default function MyPage() {
  const [pageName, setPageName] = useRecoilState(pageNameState);
  const title = useRecoilState(myPageState);

  return (
    <AppLayout appBarObject={{ headerText: "내정보" }}>
      <div onClick={() => setPageName("MyPage")}>
        내 정보 {pageName} title : {title}
      </div>
    </AppLayout>
  );
}
