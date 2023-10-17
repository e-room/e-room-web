const statusStyles = {
  default: "text-gray-1 border-white font-bold",
  primary_select: "text-primary-1 border-primary-1 font-bold",
  secondary_select: "text-black border-black font-medium",
};

const sizeStyles = {
  large: "px-4 py-3 text-base",
  medium: "px-2 py-[0.62rem] text-sm",
};

const statusValueStyles = {
  default: "text-gray-3",
  primary_select: "text-primary-3",
  secondary_select: "text-gray-3",
};

const sizeValueStyles = {
  large: "ml-2",
  medium: "ml-1",
};

// TODO: 전환 애니메이션 추가
const baseStyle =
  "cursor-pointer border-b-2 inline-flex justify-center items-center flex-1";

export default function TabOption({ label, value, status, size, onClick }) {
  return (
    <div
      className={[baseStyle, statusStyles[status], sizeStyles[size]].join(" ")}
      onClick={onClick}
    >
      {label}
      <span
        className={[statusValueStyles[status], sizeValueStyles[size]].join(" ")}
      >
        {value}
      </span>
    </div>
  );
}
