import PropTypes from "prop-types";
import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";
import Button from "./Button";
import Icon from "./Icon";
import { Caption1Bold, SubTitle1 } from "../../../styles/typography";

export default function BottomSheet({
  title,
  visible = false,
  buttonType = "default",
  onHideClick,
  onSubmit,
  children,
}) {
  const ButtonType = () => {
    switch (buttonType) {
      case "confirm":
        return (
          <Button
            label={"Label"}
            size="lg"
            width={"100%"}
            type={"primary"}
            onClick={onSubmit}
          />
        );
      case "default":
        return (
          <div style={{ display: "flex", gap: 8 }}>
            <Button
              label={"Label"}
              size="lg"
              width={"100%"}
              type={"secondary"}
            />
            <Button label={"Label"} size="lg" width={"100%"} type={"primary"} />
          </div>
        );
      case "warning":
        return (
          <div style={{ display: "flex", gap: 8 }}>
            <Button
              label={"Label"}
              size="lg"
              width={"100%"}
              type={"secondary"}
            />
            <Button label={"Label"} size="lg" width={"100%"} type={"warning"} />
          </div>
        );
      default:
        return;
    }
  };

  return (
    <Overlay>
      <Container>
        <XField>
          <div onClick={onHideClick}>
            <Icon icon={"x-icon"} size={"md"} fill={`var(--white)`} />
          </div>
        </XField>
        <StyledSheet visible={visible}>
          <Title>{title}</Title>
          {children}
          <ButtonGroup>{ButtonType()}</ButtonGroup>
        </StyledSheet>
      </Container>
    </Overlay>
  );
}

BottomSheet.propTypes = {
  title: PropTypes.string,
  subTitle: PropTypes.string,
  visible: PropTypes.bool,
  buttonType: PropTypes.oneOf(["confirm", "default", "warning"]),
  onHideClick: PropTypes.func,
  onSubmit: PropTypes.func,
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
from {
  opacity: 0;
  transform: translate3d(0, 100%, 0);
}
to {
  opacity: 1;
  transform: translateZ(0);
}
`;

const Container = styled.div`
  bottom: 0;
  position: fixed;
  width: 100%;
  animation: ${fadeInUp} 1s;
`;

const XField = styled.div`
  display: flex;
  justify-content: flex-end;

  margin-bottom: 8px;
  margin-right: 20px;
`;

const StyledSheet = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  /* width: 100%; */
  padding: 32px 20px 20px;
  gap: 16px;
  isolation: isolate;

  background: var(--white);
  border-radius: 32px 32px 0px 0px;
`;

const Title = styled.div`
  ${SubTitle1}

  color: var(--black);
  width: 100%;
  text-align: center;
`;

const SubTitle = styled.div`
  ${Caption1Bold}

  text-align: center;

  color: var(--black);
`;

const ButtonGroup = styled.div`
  width: 100%;
`;
