import PropTypes from "prop-types";
import styled from "@emotion/styled";
import Icon from "../Icon";
import { css } from "@emotion/react";

export default function Toast({ type = "normal", message, children }) {
  const colorStyle = COLORS[type];
  return (
    <StyledToast colorStyle={colorStyle}>
      <Icon icon={ICONS[type]} size="md" />
      <div>{message ?? children}</div>
    </StyledToast>
  );
}

Toast.propTypes = {
  type: PropTypes.oneOf(["normal", "success", "danger"]),
  message: PropTypes.string,
};

const StyledToast = styled.div`
  ${(p) => p.colorStyle}

  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 16px 20px;
  gap: 10px;
  height: 40px;

  background: var(--toast-bg-color);

  border: 1px solid var(--toast-color);
  border-radius: 8px;

  box-shadow: 0px 0px 32px rgba(0, 0, 0, 0.08);
  backdrop-filter: blur(24px);

  color: var(--toast-color);
  svg {
    fill: var(--toast-color);
  }

  div {
    display: flex;
    justify-content: center;
    width: 100%;
    font-weight: 700;
    font-size: 16px;
    line-height: 24px;
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
    --toast-color: var(--white);
  `,
  success: css`
    --toast-bg-color: var(--white);
    --toast-color: var(--success);
  `,
  danger: css`
    --toast-bg-color: var(--white);
    --toast-color: var(--danger);
  `,
};
