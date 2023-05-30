import PropTypes from "prop-types";

const SIZES = {
  md: 24,
  lg: 64,
};
export default function Avatar({ size = "md", img, children, ...props }) {
  return (
    <div {...props}>
      {img ? (
        <img
          src={img}
          width={SIZES[size]}
          height={SIZES[size]}
          style={{
            minWidth: SIZES[size],
            maxWidth: SIZES[size],
            height: SIZES[size],
          }}
          className={`rounded-full object-cover`}
        />
      ) : (
        children
      )}
    </div>
  );
}

Avatar.propTypes = {
  size: PropTypes.oneOf(["md", "lg"]),
  // img: PropTypes.element,
};
