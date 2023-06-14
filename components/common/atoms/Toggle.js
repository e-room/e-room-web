import PropTypes from "prop-types";

export default function Toggle({
  label,
  children,
  active = false,
  disabled = false,
  ...props
}) {
  const StylesByActive = () => {
    if (disabled) {
      return "bg-gray-4 border border-gray-4 text-gray-3 cursor-default";
    } else {
      if (active) {
        return "bg-primary-1 border border-primary-1 text-white";
      } else {
        return "bg-white border border-gray-4 text-gray-2";
      }
    }
  };

  return (
    <div
      className={`cursor-pointer select-none h-[34px] box-border flex items-center justify-center py-[8px] px-[12px] rounded-[32px] ${StylesByActive()} text-toggle`}
      {...props}
      active={active}
      disabled={disabled}
    >
      {label ?? children}
    </div>
  );
}

Toggle.propTypes = {
  label: PropTypes.string,
  active: PropTypes.bool,
  disabled: PropTypes.bool,
};
