import PropTypes from "prop-types";
import styled from "@emotion/styled";
import ArrowIcon from "../../../assets/arrow.svg";
import { useState } from "react";
import { Body2, Body2Bold, Body3 } from "../../../styles/typography";

// TODO: 검색기능 및 여러가지 기능 추가 필요(조사 후 진행)
// TODO: hover할때 위 아래 네모모양으로 표시됨
export default function Select({
  placeholder = "필드를 선택해주세요.",
  items = [],
  value,
  onChange,
  label,
  unit,
  ...props
}) {
  const [isVisible, setIsVisible] = useState(true);
  const onOptionsShow = () => {
    setIsVisible(!isVisible);
  };

  // TODO: blur 시 옵션 리스트 숨김으로 변경
  // onOptionChange 할 때 blur(focus out)이 먼저 일어나서 값을 변경할 수 없음
  // ref나 따로 연결해서 사용해야 함
  const onBlur = (e) => {
    console.log("on blur");
    setTimeout(() => setIsVisible(false), 100);
  };

  // TODO: 공통컴포넌트로 분리 필요

  return (
    <StyledSelect>
      <div style={{ display: "flex", flexDirection: "column" }}>
        {label && <TextLabel>{label}</TextLabel>}
        <div style={{ display: "flex", alignItems: "center" }}>
          <SelectField onClick={onOptionsShow} focus={isVisible}>
            <OptionField defaultOption={value}>
              {value ? `${value}년` : placeholder}
            </OptionField>
            <div className="toggle-icon">
              <ArrowIcon width={11} height={6} fill={`var(--gray-1)`} />
            </div>
            <OptionList visible={isVisible}>
              {items.map((option) => {
                return (
                  <Option
                    key={option.value}
                    onClick={() => {
                      onChange(option);
                      setIsVisible(false);
                    }}
                    isSelect={value && option.value === value}
                  >
                    {option.label}
                  </Option>
                );
              })}
            </OptionList>
          </SelectField>

          {unit && <TextUnit>{unit}</TextUnit>}
        </div>
      </div>
    </StyledSelect>
  );
}

const OptionField = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  color: ${(p) => (p.defaultOption ? `var(--black)` : `var(--gray-3)`)};
`;

const SelectField = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  width: 100%;

  border: 1px solid var(--gray-4);
  border-radius: 12px;
  background: transparent;

  position: relative;

  ${Body2}

  .toggle-icon {
    display: flex;
  }

  svg {
    margin-left: 10px;
  }

  ${(p) =>
    p.focus &&
    `border: 1px solid var(--primary-1);
    svg {
      fill: var(--primary-1);
    }`}
`;

const OptionList = styled.div`
  display: ${(p) => (p.visible ? "block" : "none")};
  box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.08);
  background: var(--white);
  border-radius: 12px;
  width: 100%;
  position: absolute;
  z-index: 9;
  top: 59px;
  left: 0;
`;

const Option = styled.button`
  border: none;
  background: transparent;
  width: 100%;
  text-align: left;
  padding: 16px;

  overflow: hidden;

  ${(p) => (p.isSelect ? Body2Bold : Body2)}

  &:hover {
    background: var(--gray-4);
  }

  ${(p) =>
    p.isSelect &&
    `
    color: var(--primary-1);
    background: var(--primary-6);
    :nth-of-type(1) {
      border-radius: 12px 12px 0px 0px;
    }
    :nth-last-of-type(1) {
      border-radius: 0px 0px 12px 12px;
    }
  `}
`;

const StyledSelect = styled.div`
  &:focus {
    outline: none;
    border: 1px solid var(--primary-1);
    svg {
      fill: var(--primary-1);
    }
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
