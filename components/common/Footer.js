import styled from "@emotion/styled";
import Link from "next/link";
import Icon from "../common/atoms/Icon";
import { useRouter } from "next/router";
import { Caption2, Caption2Bold } from "styles/typography";

const navItems1 = [
  {
    path: "/",
    activePaths: ["/", "/buildings", "/login"],
    defaultIcon: "home-stroke",
    activeIcon: "home-fill",
    title: "둘러보기",
  },
  {
    path: "/review/write",
    activePaths: ["/review/write", "/review/write/[index]"],
    defaultIcon: "pencil-fill",
    activeIcon: "pencil-fill",
    title: "리뷰쓰기",
  },
  {
    path: "/favorites",
    activePaths: ["/favorites"],
    defaultIcon: "heart-stroke",
    activeIcon: "heart-fill",
    title: "찜목록",
  },
  {
    path: "/mypage",
    activePaths: ["/mypage"],
    defaultIcon: "mypage",
    activeIcon: "mypage",
    title: "내정보",
  },
];
const navItems = [
  {
    path: "/home",
    activePaths: ["/home", "/buildings", "/login"],
    icon: "home",
    title: "홈",
  },
  {
    path: "/map",
    activePaths: ["/map"],
    icon: "map-marked",
    title: "지도",
  },
  {
    path: "/review/write",
    activePaths: ["/review/write", "/review/write/[index]"],
    icon: "pencil",
    title: "리뷰쓰기",
  },
  {
    path: "/mypage",
    activePaths: ["/mypage"],
    icon: "mypage",
    title: "내정보",
  },
];

export default function Footer({ enabled }) {
  const router = useRouter();
  const { pathname } = router;
  if (!enabled) return;
  return (
    <NavBarWrapper>
      <NavBarContainer>
        {navItems.map((value, index) => {
          const active = value.activePaths.includes(pathname);

          return (
            <Link href={value.path} key={index}>
              <a>
                <NavBarContent active={active}>
                  <Icon
                    icon={value.icon}
                    fill={active ? "var(primary-1)" : "black"}
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

const NavBarWrapper = styled.footer`
  box-shadow: 0px -1px 0px rgba(33, 33, 33, 0.02);
  border-radius: 16px 16px 0px 0px;
  width: 100%;
  height: 56px;
  position: fixed;
  bottom: 0;
  background: var(--white);
  z-index: 3;
  box-sizing: border-box;
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
    color: ${(p) => (p.active ? `var(--primary-1)` : `var(--gray-3)`)};
  }
  svg {
    fill: ${(p) => (p.active ? `var(--primary-1)` : `var(--gray-3)`)};
  }
`;
