import styled from "@emotion/styled";
import Icon from "../Icon";

const AppBarWrapper = styled.div`
  height: 56px;
  padding: 0px 16px;

  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0px -4px 16px 0px rgba(0, 0, 0, 0.04);
`;

export default function AppBar() {
  return (
    <AppBarWrapper>
      <Icon icon={"arrow-left"} size="md" />
      <Icon icon={"logo-default"} size="lg" />
      <Icon icon={"three-dot"} size="md" />
    </AppBarWrapper>
  );
}
