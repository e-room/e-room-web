import styled from "@emotion/styled";
import Icon from "../Icon";

export default function AppBar({ rightIcon, headerText }) {
  const rightIcons = ["three-dot", "search", "filter-stroke", "heart-stroke"];

  return (
    <AppBarWrapper>
      <AppBarContainer>
        <Box>
          <Icon icon={"arrow-left"} size="md" />
        </Box>
        <Box>
          {headerText ? (
            <Header>{headerText}</Header>
          ) : (
            <>
              <Icon icon={"logo-default"} size="lg" />
              <LogoTitle>
                <span>e</span>room
              </LogoTitle>
            </>
          )}
        </Box>
        <Box>
          {rightIcon && <Icon icon={rightIcon} size="md" />}

          {/* <Icon icon={"search"} size="md" /> */}
          {/* <Icon icon={"filter-stroke"} size="md" /> */}
          {/* <Icon icon={"heart-stroke"} size="md" /> */}
        </Box>
      </AppBarContainer>
    </AppBarWrapper>
  );
}

const AppBarWrapper = styled.div`
  width: 100%;
  height: 56px;

  position: fixed;
  top: 0;
  left: 0;

  background: var(--white);
  z-index: 9;
`;

const AppBarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 16px;
  box-shadow: 0px -4px 16px 0px rgba(0, 0, 0, 0.04);
  height: 56px;
`;

const Box = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 24px;
`;

const Header = styled.div`
  font-family: "Pretendard";
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  line-height: 24px;

  text-align: center;

  color: var(--black);
`;

const LogoTitle = styled.div`
  font-family: "Poppins";
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  line-height: 27px;
  color: var(--primary-1);
  span {
    color: var(--primary-3);
  }
`;
