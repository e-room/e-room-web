import PropTypes from "prop-types";
import Icon from "components/common/atoms/Icon";

export default function GroupButton({ items }) {
  return (
    <div className="first-of-type:rounded-t-[12px] last-of-type:rounded-b-[12px]">
      {items.map((value) => {
        return (
          <button
            className="cursor-pointer box-border w-[44px] h-[44px] flex justify-center items-center bg-map-button border-t-[1px] border-t-gray-4 shadow-map-button rounded-[12px]"
            onClick={value.onClick}
            key={value.icon}
          >
            <Icon icon={value.icon} size="md" fill="fill-black" />
          </button>
        );
      })}
    </div>
  );
}

GroupButton.propTypes = {
  items: PropTypes.array,
};
