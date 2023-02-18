import PropTypes from "prop-types";
import styled from "@emotion/styled";
import { Body2, Caption1 } from "styles/typography";
import { useEffect, useState } from "react";

export default function TextArea(props) {
  const {
    value,
    onChange,
    placeholder = "필드를 입력해주세요.",
    width,
    height,
    caption,
    count,
    countUnit,
  } = props;

  const [status, setStatus] = useState(null);

  const onBlur = (e) => {
    if (!count) return;
    if (!value || value.length < count) {
      setStatus("danger-1");
    } else {
      setStatus("success");
    }
  };

  useEffect(() => {
    if (!count || !status || !value) return;

    if (value.length < count) {
      setStatus("danger-1");
    } else {
      setStatus("success");
    }
  }, [value]);

  return (
    <>
      <StyledInputText
        placeholder={placeholder}
        onChange={onChange}
        defaultValue={value || ""}
        style={{ width, height }}
        onBlur={onBlur}
        status={status}
        {...props}
      />
      <CaptionField status={status}>
        <div className="caption">{status === "danger-1" && caption}</div>
        <div className="count">
          {count && `${value ? value.length : 0}`}
          {countUnit}
        </div>
      </CaptionField>
    </>
  );
}

TextArea.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

const StyledInputText = styled.textarea`
  ${Body2}

  box-sizing: border-box;
  display: flex;
  align-items: center;
  padding: 16px;

  border: ${(p) =>
    p.status ? `1px solid var(--${p.status})` : `1px solid var(--gray-4)`};
  border-radius: 12px;

  resize: none;

  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;

  ::placeholder {
    color: var(--gray-3);
  }
  &:focus {
    outline: none;
    border: ${(p) => !p.status && `1px solid var(--primary-1)`};
  }
`;
const CaptionField = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 8px;
  margin: 4px;

  .caption {
    ${Caption1}
    color: ${(p) => (p.status ? `var(--${p.status})` : `var(--gray-2)`)};

    word-break: break-word;
    text-overflow: ellipsis;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
  }
  .count {
    ${Caption1}
    color: ${(p) => (p.status ? `var(--${p.status})` : `var(--gray-2)`)};
  }
`;
