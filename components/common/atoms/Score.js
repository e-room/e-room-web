import PropTypes from "prop-types";
import Icon from "../atoms/Icon";
import { Rating } from "react-simple-star-rating";

export default function Score({
  size = "md",
  value,
  readOnly = false,
  onClick,
  allowFraction = false,
}) {
  return (
    <Rating
      onClick={onClick}
      initialValue={value}
      readonly={readOnly}
      fillIcon={<Icon icon={`star-filled`} size={size} fill="fill-primary-1" />}
      emptyIcon={
        <Icon icon={`star-default`} size={size} fill="fill-primary-1" />
      }
      allowFraction={allowFraction}
    />
  );
}

Score.propTypes = {
  size: PropTypes.string,
  value: PropTypes.any,
  readOnly: PropTypes.bool,
  onClick: PropTypes.func,
};
