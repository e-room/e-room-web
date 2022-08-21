import styled from "@emotion/styled";
import { useState } from "react";
import Link from "next/link";
import Icon from "../Icon";
import { useRouter } from "next/router";

const NavBarWrapper = styled.div`
  box-shadow: 0px -4px 16px 0px rgba(0, 0, 0, 0.04);
  border-radius: 8px 8px 0px 0px;
  width: 100%;
  height: 56px;
  position: fixed;
  bottom: 0;
  left: 0;

  background: var(--white);
  z-index: 99;
`;

const NavBarContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const NavBarContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 8px 24px 4px;
  gap: 4px;

  height: 56px;
  div {
    color: ${(props) => (props.active ? `var(--primary-1)` : `var(--gray-3)`)};
  }
  svg {
    fill: ${(props) => (props.active ? `var(--primary-1)` : `var(--gray-3)`)};
  }
`;

export default function NavBar() {
  // TODO: home-stroke fill color 임시조치. 파일에서 직접 수정함
  // TODO: router 처리 다시 하기
  const router = useRouter();
  const { pathname } = router;

  const homeActive = pathname === "/";
  const reviewActive = pathname === "/ReviewFormPage";
  const heartActive = pathname === "/HeartListPage";
  const myPageActive = pathname === "/MyPage";
  return (
    <NavBarWrapper>
      <NavBarContainer>
        <Link href="/">
          <a>
            <NavBarContent active={homeActive}>
              <Icon icon={homeActive ? "home-fill" : "home-stroke"} size="md" />
              <div className="caption-bold-2">둘러보기</div>
            </NavBarContent>
          </a>
        </Link>
        <Link href="/ReviewFormPage">
          <a>
            <NavBarContent active={reviewActive}>
              <Icon icon={"pencil-fill"} size="md" />
              <div className="caption-2 text-gray-3">리뷰쓰기</div>
            </NavBarContent>
          </a>
        </Link>
        <Link href="/HeartListPage">
          <a>
            <NavBarContent active={heartActive}>
              <Icon icon={heartActive ? "heart-fill" : "heart-stroke"} size="md" />
              <div className="caption-2 text-gray-3">찜목록</div>
            </NavBarContent>
          </a>
        </Link>
        <Link href="/MyPage">
          <a>
            <NavBarContent active={myPageActive}>
              <Icon icon={"mypage"} size="md" />
              <div className="caption-2 text-gray-3">내정보</div>
            </NavBarContent>
          </a>
        </Link>
      </NavBarContainer>
    </NavBarWrapper>
  );
}
