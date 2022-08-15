import styled from "@emotion/styled";
import Icon from "../Icon";

const AppBarContainer = styled.div`
  height: 56px;
  padding-left: 16px;
  padding-right: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export default function AppBar() {
  return (
    <AppBarContainer>
      <Icon icon={"arrow-left"} size="md" />
      <Icon icon={"logo-default"} size="lg" />
      <Icon icon={"three-dot"} size="md" />
    </AppBarContainer>
  );
}
