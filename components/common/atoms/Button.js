import PropTypes from "prop-types";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { FontFamily, FontStyle } from "../../../styles/typography";
import Icon from "./Icon";

const StyledButton = styled.button`
  ${(p) => p.sizeStyle}
  ${(p) => p.colorStyle}
  ${(p) => p.customStyles}
  ${(p) => p.isIcon && `gap: 10px`};

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: ${(p) => (p.isIcon ? `12px 16px` : `12px 24px`)};
  box-shadow: 0px -4px 16px rgba(0, 0, 0, 0.04);
  border-radius: 12px;

  cursor: pointer;

  ${FontFamily}
  ${FontStyle}

  height: var(--button-height);
  font-size: var(--button-font-size);
  font-weight: 700;

  background: var(--button-bg-color);
  border: 1px solid var(--button-border-color);
  color: var(--button-label-color);

  &:disabled {
    background: var(--button-disabled-color);
    border: 1px solid var(--button-disabled-color);
    color: var(--button-disabled-label-color);
  }

  svg {
    fill: var(--button-label-color);
  }
`;

const SIZES = {
  md: css`
    --button-font-size: 16px;
    --button-height: 48px;
  `,
  lg: css`
    --button-font-size: 18px;
    --button-height: 52px;
  `,
};
const COLORS = {
  primary: css`
    --button-bg-color: var(--primary-1);
    --button-border-color: var(--primary-1);
    --button-label-color: var(--white);

    --button-disabled-color: var(--primary-5);
    --button-disabled-label-color: var(--primary-4);
  `,
  secondary: css`
    --button-bg-color: var(--white);
    --button-border-color: var(--gray-4);
    --button-label-color: var(--gray-1);

    --button-disabled-color: var(--gray-4);
    --button-disabled-label-color: var(--gray-3);
  `,
  warning: css`
    --button-bg-color: var(--danger1);
    --button-border-color: var(--danger1);
    --button-label-color: var(--white);

    // TODO: warning disabled color 추가해야 함

    --button-disabled-color: var(--danger-5);
    --button-disabled-label-color: var(--danger-4);
  `,
};

export default function Button({
  type = "primary",
  size = "md",
  label,
  disabled,
  width,
  children,
  style,
  icon,
  ...props
}) {
  const sizeStyle = SIZES[size];
  const colorStyle = COLORS[type];
  return (
    <StyledButton
      type={type}
      sizeStyle={sizeStyle}
      colorStyle={colorStyle}
      disabled={disabled}
      style={{ width }}
      customStyles={style}
      isIcon={icon ? true : false}
      {...props}
    >
      {icon && <Icon icon={icon} size={size} />}
      {label ?? children}
    </StyledButton>
  );
}

Button.propTypes = {
  type: PropTypes.oneOf(["primary", "secondary", "warning"]),
  size: PropTypes.oneOf(["md", "lg"]),
  label: PropTypes.string,
  disabled: PropTypes.bool,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};
