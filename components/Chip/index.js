import PropTypes from "prop-types";
import styled from "@emotion/styled";

const StyledChip = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2px 8px;

  height: 20px;
  width: 47px;

  background: var(--primary-1);
  border-radius: 16px;

  div {
    font-weight: 600;
    color: var(--white);
    font-size: 12px;
    line-height: 16px;
  }
`;

// TODO: width? 조절이 안됨 -> 고정값에서 변동값으로 바꿔야 함
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
