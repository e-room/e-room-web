import PropTypes from "prop-types";
import styled from "@emotion/styled";
import Icon from "../Icon";

export default function Score({ size = "md" }) {
  return (
    <div>
      <Icon icon="star-filled" size={size} />
      <Icon icon="star-filled" size={size} />
      <Icon icon="star-half" size={size} />
      <Icon icon="star-default" size={size} />
      <Icon icon="star-default" size={size} />
    </div>
  );
}

Score.propTypes = {
  size: PropTypes.string,
};
