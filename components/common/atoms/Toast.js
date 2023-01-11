import PropTypes from "prop-types";
import styled from "@emotion/styled";
import Icon from "../atoms/Icon";
import { css, keyframes } from "@emotion/react";
import { Body2Bold } from "styles/typography";
import { useEffect, useState } from "react";

export default function Toast({
  visible = false,
  type = "normal",
  message,
  children,
}) {
  const colorStyle = COLORS[type];

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
    <StyledToast colorStyle={colorStyle} visible={visible}>
      <Icon icon={ICONS[type]} size="md" />
      <div className="message">{message ?? children}</div>
    </StyledToast>
  );
}

Toast.propTypes = {
  type: PropTypes.oneOf(["normal", "success", "danger"]),
  message: PropTypes.string,
};

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
const fadeOutDown = keyframes`
from {
  opacity: 1;
  transform: translateZ(0);
}
to {
  opacity: 0;
  transform: translate3d(0, 100%, 0);
}
`;

const modalSettings = (visible) => css`
  visibility: ${visible ? "visible" : "hidden"};
  z-index: 15;
  animation: ${visible ? fadeInUp : fadeOutDown} 0.3s ease-in-out;
  transition: visibility 0.3s ease-in-out;
`;

const StyledToast = styled.div`
  ${(p) => p.colorStyle}

  display: flex;
  flex-direction: row;
  align-items: center;

  padding: 15px 20px;
  gap: 10px;

  background: var(--toast-bg-color);

  border: 1px solid var(--toast-border-color);
  border-radius: 8px;

  box-shadow: 0px 0px 32px rgba(0, 0, 0, 0.08);
  backdrop-filter: blur(24px);

  position: absolute;
  bottom: 64px;
  left: 20px;
  right: 20px;

  ${(p) => modalSettings(p.visible)}

  color: var(--toast-color);
  svg {
    fill: var(--toast-color);
  }

  .message {
    display: flex;
    justify-content: center;
    width: 100%;

    ${Body2Bold}
  }
`;

const ICONS = {
  normal: "check-circle",
  success: "check-circle",
  danger: "exclamation-circle",
};
const COLORS = {
  normal: css`
    --toast-bg-color: var(--primary-1);
    --toast-border-color: var(--primary-1);
    --toast-color: var(--white);
  `,
  success: css`
    --toast-bg-color: var(--white);
    --toast-border-color: var(--white);
    --toast-color: var(--success);
  `,
  danger: css`
    --toast-bg-color: var(--white);
    --toast-border-color: var(--white);
    --toast-color: var(--danger1);
  `,
};
