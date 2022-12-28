import PropTypes from "prop-types";
import styled from "@emotion/styled";

export default function Text({
  value,
  onChange,
  placeholder = "필드를 입력해주세요.",
  width,
  height,
  ...props
}) {
  return (
    <StyledInputText
      type={"text"}
      placeholder={placeholder}
      onChange={onChange}
      value={value}
      style={{ width, height }}
      {...props}
    />
  );
}

Text.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

const StyledInputText = styled.input`
  display: flex;
  align-items: center;
  padding: 16px;

  border: 1px solid var(--gray-4);
  border-radius: 12px;

  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;

  ::placeholder {
    color: var(--gray-3);
  }
  &:focus {
    outline: none;
    border: 1px solid var(--primary-1);
  }
`;
