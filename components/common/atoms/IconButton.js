import PropTypes from "prop-types";
import styled from "@emotion/styled";
import Icon from "./Icon";

const StyledIconButton = styled.button`
  box-sizing: border-box;
  cursor: pointer;

  width: 44px;
  height: 44px;
  display: flex;
  justify-content: center;
  align-items: center;

  background: rgba(255, 255, 255, 0.8);

  border: none;
  border-top: 1px solid var(--gray-4);

  box-shadow: 0px 0px 32px rgba(0, 0, 0, 0.08);
  backdrop-filter: blur(24px);

  border-radius: 12px;

  svg {
    fill: var(--black);
  }
`;

export default function IconButton({ onClick, icon }) {
  return (
    <StyledIconButton onClick={onClick}>
      <Icon icon={icon} size="md" />
    </StyledIconButton>
  );
}

IconButton.propTypes = {
  fill: PropTypes.bool,
  onClick: PropTypes.func,
};
