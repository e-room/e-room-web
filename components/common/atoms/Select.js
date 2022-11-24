import PropTypes from "prop-types";
import styled from "@emotion/styled";
import ArrowIcon from "../../../assets/arrow.svg";
import { useMemo, useState } from "react";
import { Body2 } from "../../../styles/typography";

// TODO: 검색기능 및 여러가지 기능 추가 필요(조사 후 진행)
// TODO: hover할때 위 아래 네모모양으로 표시됨
export default function Select({
  placeholder = "필드를 선택해주세요.",
  items = [],
  defaultValue,
  ...props
}) {
  const [isVisible, setIsVisible] = useState(false);
  const onOptionsShow = () => {
    setIsVisible(!isVisible);
  };

  const [defaultOption, setDefaultOption] = useState(defaultValue);
  const onOptionChange = (option) => {
    setDefaultOption(option);
    setIsVisible(false);
  };

  // TODO: blur 시 옵션 리스트 숨김으로 변경
  // onOptionChange 할 때 blur(focus out)이 먼저 일어나서 값을 변경할 수 없음
  // ref나 따로 연결해서 사용해야 함
  const onBlur = (e) => {
    // setIsVisible(false);
  };

  return (
    <StyledSelect>
      <SelectField onClick={onOptionsShow} onBlur={onBlur}>
        <OptionField defaultOption={defaultOption}>
          {defaultOption ?? placeholder}
        </OptionField>
        <div className="toggle-icon">
          <ArrowIcon width={11} height={6} fill={`var(--gray-1)`} />
        </div>
      </SelectField>
      <OptionList visible={isVisible}>
        {items &&
          items.map((option) => {
            return (
              <Option key={option.value} onClick={() => onOptionChange(option.label)}>
                {option.label}
              </Option>
            );
          })}
      </OptionList>
    </StyledSelect>
  );
}

const OptionField = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  color: ${(p) => (p.defaultOption ? `var(--black)` : `var(--gray-3)`)};
`;

const SelectField = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  width: 100%;

  border: 1px solid var(--gray-4);
  border-radius: 12px;
  background: transparent;

  ${Body2}

  .toggle-icon {
    display: flex;
  }

  svg {
    margin-left: 10px;
  }

  &:focus {
    border: 1px solid var(--primary-1);
    svg {
      fill: var(--primary-1);
    }
  }
`;

const OptionList = styled.div`
  box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.08);
  border-radius: 12px;
  margin-top: 3px;
  display: ${(p) => (p.visible ? "block" : "none")};
`;

const Option = styled.button`
  border: none;
  background: transparent;
  width: 100%;
  text-align: left;
  padding: 16px;

  ${Body2}

  &:hover {
    background: var(--gray-4);
  }
`;

const StyledSelect = styled.div``;
