import styled from "@emotion/styled";
import { SubTitle2 } from "../../styles/typography";
import Icon from "../common/atoms/Icon";
import { useRouter } from "next/router";

export default function Header({ pageTitle, additionalFunction }) {
  const router = useRouter();

  const onBack = () => {
    router.back();
  };

  return (
    <AppBarWrapper>
      <Box onClick={onBack}>
        <Icon icon={"arrow-left"} size="md" />
      </Box>
      <Box>
        {pageTitle ? (
          <HeaderTitle>{pageTitle}</HeaderTitle>
        ) : (
          <>
            <Icon icon={"logo-default"} size="lg" />
            <LogoTitle>
              <span>e</span>room
            </LogoTitle>
          </>
        )}
      </Box>
      <Box>{additionalFunction ?? null}</Box>
    </AppBarWrapper>
  );
}

const AppBarWrapper = styled.header`
  width: 100%;
  height: 44px;

  position: fixed;
  top: 0;
  left: 0;
  padding: 0 20px 0 16px;
  box-sizing: border-box;

  background: var(--white);
  z-index: 9;
  box-shadow: 0px -4px 16px 0px rgba(0, 0, 0, 0.04);

  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Box = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 24px;
`;

const HeaderTitle = styled.div`
  ${SubTitle2}
  text-align: center;

  color: var(--black);

  word-break: break-word;
  text-overflow: ellipsis;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
`;

const LogoTitle = styled.div`
  ${SubTitle2}
  color: var(--primary-1);
  span {
    color: var(--primary-3);
  }
`;
