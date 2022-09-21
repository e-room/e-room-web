import PropTypes from "prop-types";
import styled from "@emotion/styled";

const StyledAvatar = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    border: 1px solid var(--gray-3);
    border-radius: 100%;
    width: ${(props) => props.size}px;
    height: ${(props) => props.size}px;
  }
`;

const SIZES = {
  md: 24,
  lg: 64,
};
export default function Avatar({ size = "md", img, children }) {
  return (
    <StyledAvatar size={SIZES[size]}>
      {img ? <img src={img} width={SIZES[size]} height={SIZES[size]} /> : children}
    </StyledAvatar>
  );
}

Avatar.propTypes = {
  size: PropTypes.oneOf(["md", "lg"]),
  img: PropTypes.element,
};
