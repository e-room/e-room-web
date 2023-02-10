import PropTypes from "prop-types";
import styled from "@emotion/styled";
import Icon from "../atoms/Icon";
import { Body2 } from "styles/typography";
import { useEffect, useState } from "react";
import { fadeInUp_OutDown } from "styles/keyframes";

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

  ${(p) => fadeInUp_OutDown(p.visible)}

  color: var(--black);
  svg {
    fill: ${(p) => p.iconColor && `var(--${p.iconColor})`};
  }

  .message {
    width: 100%;

    ${Body2}
  }
`;
