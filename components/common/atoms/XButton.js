import PropTypes from "prop-types";
import styled from "@emotion/styled";
import Icon from "../atoms/Icon";

const StyledXButton = styled.button`
  cursor: pointer;
  background: var(--primary-1);
  border: 1px solid var(--primary-1);
  width: 20px;
  height: 20px;
  border-radius: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    fill: var(--white);
  }
`;

export default function XButton({ onClick }) {
  return (
    <StyledXButton onClick={onClick}>
      <Icon icon="x-icon" size="sm" />
    </StyledXButton>
  );
}

XButton.propTypes = {
  onClick: PropTypes.func,
};
