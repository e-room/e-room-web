import PropTypes from "prop-types";
import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";
import Icon from "../atoms/Icon";
import { SubTitle1 } from "../../../styles/typography";

export default function Popup({
  title,
  titleAlign = "center",
  visible = false,
  onHideClick,
  children,
}) {
  return (
    <Overlay>
      <Container>
        {/* <XField>
          <div onClick={onHideClick}>
            <Icon icon={"x-icon"} size={"md"} fill={`var(--white)`} />
          </div>
        </XField> */}
        <StyledPopup visible={visible}>
          <Title align={titleAlign}>{title}</Title>
          {children}
        </StyledPopup>
      </Container>
    </Overlay>
  );
}

Popup.propTypes = {
  title: PropTypes.string,
  titleAlign: PropTypes.oneOf(["center", "left", "right"]),
  visible: PropTypes.bool,
  onHideClick: PropTypes.func,
};

const Overlay = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  overflow: hidden;
  z-index: 10;

  background: rgba(0, 0, 0, 0.4);
`;

const fadeInUp = keyframes`
0% {
  opacity: 0;
  transform: translate3d(0, 100%, 0);
}
to {
  opacity: 1;
  transform: translateZ(0);
}
`;

const Container = styled.div`
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const XField = styled.div`
  display: flex;
  justify-content: flex-end;

  margin-bottom: 8px;
  margin-right: 20px;
`;

const StyledPopup = styled.div`
  display: flex;
  flex-direction: column;
  padding: 32px 20px 20px;
  gap: 16px;
  isolation: isolate;

  width: 100%;

  background: var(--white);
  border-radius: 32px;

  margin: 0px 20px;
`;

const Title = styled.div`
  ${SubTitle1}

  color: var(--black);

  text-align: ${(p) => p.align};
  display: flex;
  align-items: center;
`;
