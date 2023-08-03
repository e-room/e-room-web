import PropTypes from "prop-types";
import Icon from "../atoms/Icon";

export default function MapButton({ fill, onClick }) {
  return (
    <button
      className="box-border cursor-pointer w-[44px] h-[44px] flex justify-center items-center bg-map-button border-0 border-t-gray-4 rounded-[12px] shadow-map-button backdrop-blur-xl"
      onClick={onClick}
    >
      <Icon
        icon={fill ? "filter-fill" : "filter-stroke"}
        size="md"
        fill="fill-black"
      />
    </button>
  );
}

MapButton.propTypes = {
  fill: PropTypes.bool,
  onClick: PropTypes.func,
};
