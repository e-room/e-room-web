import styled from "@emotion/styled";
import { useState } from "react";
import Link from "next/link";
import Icon from "../common/atoms/Icon";
import { useRouter } from "next/router";

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
  // TODO: home-stroke fill color 임시조치. 파일에서 직접 수정함
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
                  <div
                    className={
                      active ? "caption-bold-2" : "caption-2 text-gray-3"
                    }
                  >
                    {value.title}
                  </div>
                </NavBarContent>
              </a>
            </Link>
          );
        })}
      </NavBarContainer>
    </NavBarWrapper>
  );
}

const NavBarWrapper = styled.div`
  box-shadow: 0px -4px 16px 0px rgba(0, 0, 0, 0.04);
  border-radius: 8px 8px 0px 0px;
  width: 100%;
  height: 56px;
  position: fixed;
  bottom: 0;
  left: 0;
  background: var(--white);
  z-index: 9;
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
