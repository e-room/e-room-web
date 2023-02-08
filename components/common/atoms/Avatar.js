import PropTypes from "prop-types";
import styled from "@emotion/styled";

const SIZES = {
  md: 24,
  lg: 64,
};
export default function Avatar({ size = "md", img, children, ...props }) {
  return (
    <StyledAvatar size={SIZES[size]} {...props}>
      {img ? (
        <img src={img} width={SIZES[size]} height={SIZES[size]} />
      ) : (
        children
      )}
    </StyledAvatar>
  );
}

Avatar.propTypes = {
  size: PropTypes.oneOf(["md", "lg"]),
  // img: PropTypes.element,
};

const StyledAvatar = styled.div`
  display: flex;
  img {
    border-radius: 100%;
    width: ${(props) => props.size}px;
    height: ${(props) => props.size}px;
  }
`;
