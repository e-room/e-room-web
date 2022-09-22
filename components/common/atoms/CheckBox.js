import PropTypes from "prop-types";
import styled from "@emotion/styled";
import { useState } from "react";

export default function CheckBox() {
  const [checked, setChecked] = useState(true);

  return (
    <StyledChecKBox
      type={"checkbox"}
      checked={checked}
      onChange={() => setChecked(!checked)}
    />
  );
}

CheckBox.propTypes = {};

const StyledChecKBox = styled.input`
  appearance: none;
  width: 20px;
  height: 20px;

  background: ${({ checked }) => (checked ? `var(--primary-1)` : `var(--white)`)};
  border: 1px solid ${({ checked }) => (checked ? `var(--primary-1)` : `var(--gray-3)`)};

  // TODO: svg 임시로 가져옴. 추후 개선 필요
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M15.3561 3.149C15.5499 3.34566 15.5477 3.66224 15.351 3.85609L5.86957 13.2021L0.648999 8.05609C0.452338 7.86224 0.45006 7.54566 0.643912 7.349C0.837765 7.15234 1.15434 7.15006 1.351 7.34391L5.86957 11.7979L14.649 3.14391C14.8457 2.95006 15.1622 2.95234 15.3561 3.149Z' /%3E%3C/svg%3E%0A");

  border-radius: 4px;
`;
