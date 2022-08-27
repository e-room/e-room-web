import styled from "@emotion/styled";
import Icon from "../Icon";

export default function AppBar({ rightIcon, headerText }) {
  const rightIcons = ["three-dot", "search", "filter-stroke", "heart-stroke"];

  return (
    <AppBarWrapper>
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
    </AppBarWrapper>
  );
}

const AppBarWrapper = styled.div`
  height: 56px;
  padding: 0px 16px;

  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0px -4px 16px 0px rgba(0, 0, 0, 0.04);
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
