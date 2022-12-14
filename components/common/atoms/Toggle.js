import PropTypes from "prop-types";
import styled from "@emotion/styled";

export default function Toggle({ label, children, active = false, ...props }) {
  return (
    <StyledToggle {...props} active={active}>
      {label ?? children}
    </StyledToggle>
  );
}

Toggle.propTypes = {
  label: PropTypes.string,
  active: PropTypes.bool,
};

const StyledToggle = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  padding: 8px 12px;

  background: ${(p) => (p.active ? `var(--primary-1)` : `var(--gray-4)`)};
  border-radius: 32px;

  color: ${(p) => (p.active ? `var(--white)` : `var(--gray-2)`)};
  font-weight: 700;
  font-size: 14px;
  line-height: 18px;

  cursor: pointer;

  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
`;
