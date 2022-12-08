import PropTypes from "prop-types";
import Icon from "../atoms/Icon";
import { useState } from "react";
import { Rating } from "react-simple-star-rating";

export default function Score({ size = "md", value, readOnly = false }) {
  const [rating, setRating] = useState(0);
  const handleRating = (rate) => setRating(rate);
  return (
    <Rating
      onClick={handleRating}
      value={value}
      readonly={readOnly}
      fillIcon={
        <Icon icon={`star-filled`} size={size} fill={"var(--primary-1)"} />
      }
      emptyIcon={
        <Icon icon={`star-default`} size={size} fill={"var(--primary-1)"} />
      }
    />
  );
}

Score.propTypes = {
  size: PropTypes.string,
  value: PropTypes.any,
  readOnly: PropTypes.bool,
};
