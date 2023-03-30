import ArrowDownIcon from "../../../assets/arrow-down.svg";
import ArrowUpIcon from "../../../assets/arrow-up.svg";
import { Body2 } from "../../../styles/typography";
import Select, { components } from "react-select";

// size = md || lg
export default function CustomSelect({
  size = "lg",
  options,
  value,
  label,
  onChange,
}) {
  const formatValue = label ? value : { value };
  // TODO: padding size 15 -> 16
  const colorStyles = {
    container: (base) => {
      return { ...base, width: "100%" };
    },
    control: (base, state) => {
      return {
        ...base,
        padding: size === "lg" ? 15 : "9px 15px",
        borderRadius: 12,

        outline: "none",
        borderWidth: 1,
        borderColor:
          state.isFocused && state.menuIsOpen
            ? `var(--primary-1)`
            : `var(--gray-4)`,
        boxShadow: "none",
        "&:hover": `var(--primary-1)`,
      };
    },
    placeholder: (base) => {
      return {
        ...base,
        Body2,
        color: `var(--gray-3)`,
        margin: 0,
      };
    },
    singleValue: (base) => {
      return { ...base, fontWeight: 500, fontSize: "16px", lineHeight: "24px" };
    },
    input: (base) => {
      return {
        ...base,
        margin: 0,
        padding: 0,
      };
    },
    valueContainer: (base) => {
      return { ...base, padding: 0 };
    },
    menu: (base) => {
      return {
        ...base,
        boxShadow: "0px 0px 12px rgba(0, 0, 0, 0.08)",
        borderRadius: 12,
        backgroundColor: `var(--white)`,
      };
    },
    menuList: (base) => {
      return { ...base, padding: 0 };
    },
    option: (base, state) => {
      const isActive = (state.isFocused && !state.data) || state.isSelected;
      return {
        ...base,
        Body2,
        fontWeight: isActive ? `700` : `500`,
        color: isActive ? `var(--primary-1)` : `var(--black)`,
        padding: 16,
        backgroundColor: isActive ? `var(--primary-6)` : `var(--white)`,
        ":nth-of-type(1)": {
          borderRadius: "12px 12px 0px 0px",
        },
        ":nth-last-of-type(1)": {
          borderRadius: "0px 0px 12px 12px",
        },
        "&:hover": {
          backgroundColor: `var(--primary-6)`,
          ":nth-of-type(1)": {
            borderRadius: "12px 12px 0px 0px",
          },
          ":nth-last-of-type(1)": {
            borderRadius: "0px 0px 12px 12px",
          },
        },
        ":active": {
          backgroundColor: `var(--primary-6)`,
          ":nth-of-type(1)": {
            borderRadius: "12px 12px 0px 0px",
          },
          ":nth-last-of-type(1)": {
            borderRadius: "0px 0px 12px 12px",
          },
        },
      };
    },
  };

  const DropdownIndicator = (props) => {
    const { selectProps } = props;
    return (
      <components.DropdownIndicator {...props}>
        {props.isFocused && selectProps.menuIsOpen ? (
          <ArrowUpIcon width={11} height={6} fill={`var(--primary-1)`} />
        ) : (
          <ArrowDownIcon width={11} height={6} fill={`var(--gray-1)`} />
        )}
      </components.DropdownIndicator>
    );
  };
  return (
    <Select
      styles={colorStyles}
      components={{
        DropdownIndicator,
        IndicatorSeparator: null,
      }}
      value={formatValue}
      onChange={onChange}
      options={options}
      placeholder={"필드를 선택해주세요."}
      isSearchable={false}
      selected={formatValue}
      getOptionLabel={(option) => {
        return label ? `${option[label]}` : `${option.value}년`;
      }}
      getOptionValue={(option) => option.value}
    />
  );
}
