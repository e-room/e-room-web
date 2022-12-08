import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import AppLayout from "components/common/AppLayout";
import { pageTitleState } from "states";
import styled from "@emotion/styled";
import Avatar from "components/common/atoms/Avatar";
import Img from "assets/avatar/64.png";
import { Body1Bold, Caption2 } from "styles/typography";

export default function mypage() {
  const setPageTitleState = useSetRecoilState(pageTitleState);

  useEffect(() => {
    setPageTitleState("내정보");
  }, []);
  return (
    <AppLayout>
      <MyInfo>
        <Avatar size={"lg"} img={Img.src} />
        <div style={{ width: "100%" }}>
          <Nickname>하품하는 망아지</Nickname>
          <Email>hbnhb@kakao.com</Email>
        </div>
      </MyInfo>
    </AppLayout>
  );
}

const MyInfo = styled.div`
  height: 104px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  gap: 16px;
  padding: 20px;
`;

const Nickname = styled.div`
  ${Body1Bold}
  color: var(--black);
`;
const Email = styled.div`
  ${Caption2}
  color: var(--black);
  opacity: 0.5;
`;
