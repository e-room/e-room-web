import PropTypes from "prop-types";
import Icon from "../atoms/Icon";

export default function XButton({ onClick, ...props }) {
  return (
    <div
      className="cursor-pointer bg-primary-1 border border-primary-1 w-[20px] h-[20px] rounded-full flex justify-center items-center"
      onClick={onClick}
      {...props}
    >
      <Icon icon="x-icon" size="sm" fill="fill-white" />
    </div>
  );
}

XButton.propTypes = {
  onClick: PropTypes.func,
};
