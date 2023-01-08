import styled from "@emotion/styled";
import { useState } from "react";
import Link from "next/link";
import Icon from "../common/atoms/Icon";
import { useRouter } from "next/router";
import { Caption2, Caption2Bold } from "styles/typography";

const navItems = [
  {
    path: "/",
    defaultIcon: "home-stroke",
    activeIcon: "home-fill",
    title: "둘러보기",
  },
  {
    path: "/review/write",
    defaultIcon: "pencil-fill",
    activeIcon: "pencil-fill",
    title: "리뷰쓰기",
  },
  {
    path: "/favorites",
    defaultIcon: "heart-stroke",
    activeIcon: "heart-fill",
    title: "찜목록",
  },
  {
    path: "/mypage",
    defaultIcon: "mypage",
    activeIcon: "mypage",
    title: "내정보",
  },
];

export default function Footer() {
  const router = useRouter();
  const { pathname } = router;
  return (
    <NavBarWrapper>
      <NavBarContainer>
        {navItems.map((value, index) => {
          const active = value.path === pathname;

          return (
            <Link href={value.path} key={index}>
              <a>
                <NavBarContent active={active}>
                  <Icon
                    icon={active ? value.activeIcon : value.defaultIcon}
                    size="md"
                  />
                  <div>{value.title}</div>
                </NavBarContent>
              </a>
            </Link>
          );
        })}
      </NavBarContainer>
    </NavBarWrapper>
  );
}

/* 
NavBar border-radius 16px로 바껴서 수정 시도했는데, 이게 radius가 안먹고있더라구요, 
근데 overflow hidden해도 해결이 안되어서 우선 코멘트 남깁니다! -희범-
*/
const NavBarWrapper = styled.footer`
  box-shadow: 0px -4px 16px 0px rgba(0, 0, 0, 0.04);
  border-radius: 16px 16px 0px 0px;
  width: 100%;
  height: 56px;
  position: fixed;
  bottom: 0;
  background: var(--white);
  overflow: hidden;
`;

const NavBarContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

const NavBarContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 8px 24px 4px;
  gap: 4px;

  max-height: 56px;
  div {
    ${(p) => (p.active ? Caption2Bold : Caption2)}
    color: ${(props) => (props.active ? `var(--primary-1)` : `var(--gray-3)`)};
  }
  svg {
    fill: ${(props) => (props.active ? `var(--primary-1)` : `var(--gray-3)`)};
  }
`;
