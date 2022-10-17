import PropTypes from "prop-types";
import styled from "@emotion/styled";
import Icon from "../atoms/Icon";

export default function XButton({ onClick, ...props }) {
  return (
    <StyledXButton onClick={onClick} {...props}>
      <Icon icon="x-icon" size="sm" />
    </StyledXButton>
  );
}

XButton.propTypes = {
  onClick: PropTypes.func,
};

const StyledXButton = styled.div`
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
