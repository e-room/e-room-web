import PropTypes from "prop-types";
import styled from "@emotion/styled";
import Icon from "../atoms/Icon";
import { css, keyframes } from "@emotion/react";
import { Body2 } from "styles/typography";
import { useEffect, useState } from "react";

export default function Toast({
  visible = false,
  icon = "check-circle",
  iconColor = "black",
  text,
  children,
}) {
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
    <StyledToast visible={visible} iconColor={iconColor}>
      <Icon icon={icon} size="md" />
      <div className="message">{text ?? children}</div>
    </StyledToast>
  );
}

Toast.propTypes = {
  icon: PropTypes.string,
  iconColor: PropTypes.string,
  text: PropTypes.string,
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
  display: flex;
  flex-direction: row;
  align-items: center;

  padding: 16px 20px;
  gap: 12px;

  background: var(--white);

  box-shadow: 28px 28px 56px rgba(37, 39, 37, 0.08),
    0px 0px 64px rgba(37, 39, 37, 0.04);
  border-radius: 12px;

  position: absolute;
  bottom: 64px;
  left: 20px;
  right: 20px;

  ${(p) => modalSettings(p.visible)}

  color: var(--black);
  svg {
    fill: ${(p) => p.iconColor && `var(--${p.iconColor})`};
  }

  .message {
    width: 100%;

    ${Body2}
  }
`;
