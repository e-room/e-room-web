import PropTypes from "prop-types";
import Icon from "./Icon";

export default function Button({
  type = "primary",
  size = "md",
  label,
  disabled,
  width,
  children,
  style,
  icon,
  className,
  ...props
}) {
  const StylesBySize = {
    md: "text-body-bold-2",
    lg: "text-body-bold-1",
  };
  const PaddingByIsIcon = () => {
    if (icon) {
      if (size === "md") return "py-[12px] px-[16px]";
      else if (size === "lg") return "py-[14px] px-[16px]";
    } else {
      if (size === "md") return "py-[12px] px-[24px]";
      else if (size === "lg") return "py-[14px] px-[24px]";
    }
  };

  const StylesByType = {
    primary:
      "bg-primary-1 border border-primary-1 text-white disabled:bg-primary-5 disabled:text-primary-4 disabled:border-primary-5",
    secondary:
      "bg-white border border-gray-4 text-gray-1 disabled:bg-gray-4 disabled:text-gray-3 disabled:border-gray-4",
    warning:
      "bg-danger-1 border border-danger-1 text-white disabled:bg-danger-5 disabled:text-danger-4 disabled:border-danger-5",
  };

  const IconStylesByType = {
    primary: "fill-white group-disabled:fill-primary-4",
    secondary: "fill-gray-1 group-disabled:fill-gray-3",
    warning: "fill-white group-disabled:fill-danger-4",
  };

  return (
    <button
      className={`group flex justify-center items-center gap-[10px] rounded-[12px] shadow-button box-border ${
        StylesBySize[size]
      } ${PaddingByIsIcon()} ${StylesByType[type]} ${className}`}
      disabled={disabled}
      style={{ width, ...style }}
      {...props}
    >
      {icon && <Icon icon={icon} size="md" fill={IconStylesByType[type]} />}
      {label ?? children}
    </button>
  );
}

Button.propTypes = {
  type: PropTypes.oneOf(["primary", "secondary", "warning"]),
  size: PropTypes.oneOf(["md", "lg"]),
  label: PropTypes.string,
  disabled: PropTypes.bool,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};
