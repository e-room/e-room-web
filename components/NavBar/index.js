import styled from "@emotion/styled";
import { useState } from "react";
import Icon from "../Icon";

const NavBarWrapper = styled.div`
  box-shadow: 0px -4px 16px 0px rgba(0, 0, 0, 0.04);
  border-radius: 8px 8px 0px 0px;
  width: 100%;
  height: 56px;
  position: fixed;
  bottom: 0;
  left: 0;
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
  // TODO: home-stroke fill color 임시조치
  const [active, setActive] = useState(0);
  return (
    <NavBarWrapper>
      <NavBarContainer>
        <NavBarContent active={active === 0} onClick={() => setActive(0)}>
          <Icon icon={active === 0 ? "home-fill" : "home-stroke"} size="md" />
          <div class="caption-bold-2">둘러보기</div>
        </NavBarContent>
        <NavBarContent active={active === 1} onClick={() => setActive(1)}>
          <Icon icon={"pencil-fill"} size="md" />
          <div class="caption-2 text-gray-3">리뷰쓰기</div>
        </NavBarContent>
        <NavBarContent active={active === 2} onClick={() => setActive(2)}>
          <Icon icon={active === 2 ? "heart-fill" : "heart-stroke"} size="md" />
          <div class="caption-2 text-gray-3">찜목록</div>
        </NavBarContent>
        <NavBarContent active={active === 3} onClick={() => setActive(3)}>
          <Icon icon={"mypage"} size="md" />
          <div class="caption-2 text-gray-3">내정보</div>
        </NavBarContent>
      </NavBarContainer>
    </NavBarWrapper>
  );
}
