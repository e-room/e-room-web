import PropTypes from "prop-types";

export default function Chip({ label, type = "primary", children }) {
  const StylesByType = {
    primary: "bg-primary-1 text-white",
    secondary: "bg-secondary-1 text-black",
    tertiary: "bg-gray-4 text-black",
  };

  return (
    <div
      className={`flex items-center justify-center py-[2px] px-[8px] rounded-[16px] ${StylesByType[type]}`}
    >
      <div className="text-caption-bold-2">{label ?? children}</div>
    </div>
  );
}

Chip.propTypes = {
  label: PropTypes.string,
  type: PropTypes.oneOf(["primary", "secondary", "tertiary"]),
};
