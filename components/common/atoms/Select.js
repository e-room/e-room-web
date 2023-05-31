import ArrowDownIcon from "assets/arrow-down.svg";
import ArrowUpIcon from "assets/arrow-up.svg";
import Select, { components } from "react-select";

export default function CustomSelect({
  size = "lg", // 'md' || 'lg'
  options,
  value,
  label,
  onChange,
}) {
  const formatValue = label ? value : { value };

  const DropdownIndicator = (props) => {
    const { selectProps } = props;
    return (
      <components.DropdownIndicator {...props}>
        {props.isFocused && selectProps.menuIsOpen ? (
          <ArrowUpIcon width={11} height={6} className="fill-primary-1" />
        ) : (
          <ArrowDownIcon width={11} height={6} className="fill-gray-1" />
        )}
      </components.DropdownIndicator>
    );
  };
  return (
    <Select
      classNames={{
        container: () => "w-full",
        control: ({ isFocused, menuIsOpen }) =>
          `rounded-[12px] outline-none border ${
            isFocused && menuIsOpen ? "border-primary-1" : "border-gray-4"
          } shadow-none ${size === "lg" ? "p-[15px]" : "py-[9px] px-[15px]"}`,
        placeholder: () => "text-body-2 text-gray-3",
        // input: () => "m-0 p-0",
        // valueContainer: () => "p-0",
        singleValue: () => "text-body-2",
        menu: () => "shadow-select rounded-[12px] bg-white",
        // menuList: () => "p-0",
        option: ({ isFocused, data, isSelected }) => {
          const isActive = (isFocused && !data) || isSelected;
          return `text-body-2 p-[16px] ${
            isActive
              ? "font-bold text-primary-1 bg-primary-6"
              : "font-medium text-black bg-white"
          }
          first-of-type:rounded-t-[12px] last-of-type:rounded-b-[12px]
          hover:bg-primary-6 active:bg-primary-6
          `;
        },
      }}
      unstyled={true}
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
