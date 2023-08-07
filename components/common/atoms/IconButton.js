import PropTypes from "prop-types";
import Icon from "components/common/atoms/Icon";

export default function IconButton({ onClick, icon }) {
  return (
    <button
      className="cursor-pointer box-border w-[44px] h-[44px] flex justify-center items-center bg-map-button border-t-[1px] border-t-gray-4 shadow-map-button rounded-[12px]"
      onClick={onClick}
    >
      <Icon icon={icon} size="md" fill="fill-black" />
    </button>
  );
}

IconButton.propTypes = {
  onClick: PropTypes.func,
};
