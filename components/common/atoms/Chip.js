import PropTypes from "prop-types";
import styled from "@emotion/styled";
import { css } from "@emotion/react";

export default function Chip({ label, type = "primary", children }) {
  const colorStyle = COLORS[type];
  return (
    <StyledChip colorStyle={colorStyle}>
      <div>{label ?? children}</div>
    </StyledChip>
  );
}

Chip.propTypes = {
  label: PropTypes.string,
  type: PropTypes.oneOf(["primary", "secondary", "tertiary"]),
};

const StyledChip = styled.div`
  ${(p) => p.colorStyle}

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 2px 8px;

  height: 20px;

  background: var(--chip-bg-color);
  border-radius: 16px;

  div {
    font-weight: 600;
    color: var(--chip-label-color);
    font-size: 12px;
    line-height: 16px;
  }
`;
const COLORS = {
  primary: css`
    --chip-bg-color: var(--primary-1);
    --chip-label-color: var(--white);
  `,
  secondary: css`
    --chip-bg-color: var(--secondary-1);
    --chip-label-color: var(--black);
  `,
  tertiary: css`
    --chip-bg-color: var(--gray-4);
    --chip-label-color: var(--black);
  `,
};
