import PropTypes from "prop-types";

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
    <div className="flex flex-col">
      {label && <div className="text-body-bold-2 mb-[4px]">{label}</div>}
      <div className="flex items-center">
        <input
          className="text-body-2 flex items-center p-[15px] border border-gray-4 rounded-[12px] appearance-none placeholder:text-gray-3 focus:outline-none focus:border-primary-1"
          type={type}
          placeholder={placeholder}
          onChange={onChange}
          value={value || ""}
          style={{ width, height }}
          {...props}
        />
        {unit && (
          <div className="text-body-3 ml-[8px] w-[30px] min-w-[30px] whitespace-nowrap">
            {unit}
          </div>
        )}
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
