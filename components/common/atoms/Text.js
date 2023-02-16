import PropTypes from "prop-types";
import styled from "@emotion/styled";
import { Body2, Body2Bold, Body3 } from "styles/typography";

export default function Text({
  type = "text",
  value,
  onChange,
  placeholder = "필드를 입력해주세요.",
  width,
  height,
  label,
  unit,
  ...props
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {label && <TextLabel>{label}</TextLabel>}
      <div style={{ display: "flex", alignItems: "center" }}>
        <StyledInputText
          type={type}
          placeholder={placeholder}
          onChange={onChange}
          value={value || ""}
          style={{ width, height }}
          {...props}
        />
        {unit && <TextUnit>{unit}</TextUnit>}
      </div>
    </div>
  );
}

Text.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  label: PropTypes.string,
  unit: PropTypes.string,
};

const StyledInputText = styled.input`
  ${Body2}
  display: flex;
  align-items: center;

  // TODO: padding size 15 -> 16
  padding: 15px;

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
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

const TextLabel = styled.div`
  ${Body2Bold}

  margin-bottom: 4px;
`;

const TextUnit = styled.div`
  ${Body3}
  white-space: nowrap;
  margin-left: 8px;
  width: 30px;
  min-width: 30px;
`;
