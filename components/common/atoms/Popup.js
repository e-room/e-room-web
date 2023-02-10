import PropTypes from "prop-types";
import styled from "@emotion/styled";
import { SubTitle1 } from "styles/typography";
import Button from "./Button";
import { useEffect, useState } from "react";
import { fadeIn_Down } from "styles/keyframes";

export default function Popup({
  title,
  titleAlign = "center",
  visible = false,
  buttonType = "default",
  onCancelClick,
  onConfirmClick,
  children,
  confirmText = "label",
  cancelText = "cancel",
  submitText = "submit",
}) {
  const ButtonType = () => {
    switch (buttonType) {
      case "confirm":
        return (
          <Button
            label={confirmText}
            size="md"
            width={"100%"}
            type={"primary"}
            onClick={onConfirmClick}
          />
        );
      case "default":
        return (
          <div style={{ display: "flex", gap: 8 }}>
            <Button
              label={cancelText}
              size="md"
              width={"100%"}
              type={"secondary"}
              onClick={onCancelClick}
            />
            <Button
              label={submitText}
              size="md"
              width={"100%"}
              type={"primary"}
            />
          </div>
        );
      case "warning":
        return (
          <div style={{ display: "flex", gap: 8 }}>
            <Button
              label={cancelText}
              size="md"
              width={"100%"}
              type={"secondary"}
              onClick={onCancelClick}
            />
            <Button
              label={submitText}
              size="md"
              width={"100%"}
              type={"warning"}
              onClick={onConfirmClick}
            />
          </div>
        );
      default:
        return;
    }
  };

  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    let timeoutId;
    if (visible) {
      setIsOpen(true);
    } else {
      timeoutId = setTimeout(() => setIsOpen(false), 300);
    }

    return () => {
      if (timeoutId !== undefined) {
        clearTimeout(timeoutId);
      }
    };
  }, [visible]);

  if (!isOpen) return null;

  return (
    <Overlay>
      <Container visible={visible}>
        <StyledPopup visible={visible}>
          <Title align={titleAlign}>{title}</Title>
          {children}
          <ButtonGroup>{ButtonType()}</ButtonGroup>
        </StyledPopup>
      </Container>
    </Overlay>
  );
}

Popup.propTypes = {
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  titleAlign: PropTypes.oneOf(["center", "left", "right"]),
  visible: PropTypes.bool,
  buttonType: PropTypes.oneOf(["confirm", "default", "warning"]),
  onCancelClick: PropTypes.func,
  onConfirmClick: PropTypes.func,
  confirmText: PropTypes.string,
  cancelText: PropTypes.string,
  submitText: PropTypes.string,
};

const Overlay = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  overflow: hidden;
  touch-action: none;
  z-index: 10;

  /** var(--black) and opacity 20% **/
  background: rgba(33, 33, 33, 0.2);
`;

const Container = styled.div`
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  ${(p) => fadeIn_Down(p.visible)}
`;

const StyledPopup = styled.div`
  display: flex;
  flex-direction: column;
  padding: 32px 16px 16px;
  gap: 24px;
  isolation: isolate;

  width: calc(100vw - 40px);
  max-width: 320px;
  box-sizing: border-box;

  background: var(--white);
  border-radius: 24px;
`;

const Title = styled.div`
  ${SubTitle1}

  color: var(--black);

  text-align: ${(p) => p.align};
`;

const ButtonGroup = styled.div`
  width: 100%;
`;
