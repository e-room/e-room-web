import PropTypes from "prop-types";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { FontFamily, FontStyle } from "../../styles/typography";

const StyledButton = styled.button`
  ${(p) => p.sizeStyle}
  ${(p) => p.colorStyle}
  ${(p) => p.customStyles}
  
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 12px 24px;
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
`;

const SIZES = {
  sm: css`
    --button-font-size: 16px;
    --button-height: 48px;
  `,
  md: css`
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
};

export default function Button({
  type = "primary",
  size = "sm",
  label,
  disabled,
  width,
  children,
  style,
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
      {...props}
    >
      {label ?? children}
    </StyledButton>
  );
}

Button.propTypes = {
  type: PropTypes.oneOf(["primary", "secondary"]),
  size: PropTypes.oneOf(["sm", "md"]),
  label: PropTypes.string,
  disabled: PropTypes.bool,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};
