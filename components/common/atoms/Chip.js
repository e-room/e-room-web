import PropTypes from "prop-types";
import styled from "@emotion/styled";

export default function Chip({ label, children }) {
  return (
    <StyledChip>
      <div>{label ?? children}</div>
    </StyledChip>
  );
}

Chip.propTypes = {
  label: PropTypes.string,
};

const StyledChip = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 2px 8px;

  height: 20px;

  background: var(--primary-1);
  border-radius: 16px;

  div {
    font-weight: 600;
    color: var(--white);
    font-size: 12px;
    line-height: 16px;
  }
`;
