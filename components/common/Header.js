import styled from "@emotion/styled";
import { SubTitle2 } from "../../styles/typography";
import Icon from "../common/atoms/Icon";
import { useRouter } from "next/router";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { pageTitleState } from "../../states";
import { reviewStepState } from "../../states/reviewAtom";

export default function Header({ rightIcon }) {
  const router = useRouter();
  const pageTitle = useRecoilValue(pageTitleState);
  const setReviewStep = useSetRecoilState(reviewStepState);

  const rightIcons = ["three-dot", "search", "filter-stroke", "heart-stroke"];

  const onBack = () => {
    if (pageTitle === "리뷰 쓰기") {
      setReviewStep((step) => (step > 1 ? step - 1 : 1));
    } else {
      router.back();
    }
  };

  return (
    <AppBarWrapper>
      <AppBarContainer>
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
        <Box>{rightIcon && <Icon icon={rightIcon} size="md" />}</Box>
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

const HeaderTitle = styled.div`
  ${SubTitle2}
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
