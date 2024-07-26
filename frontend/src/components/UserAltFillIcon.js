import PropTypes from "prop-types";

const UserAltFillIcon = ({ className = "" }) => {
  return (
    <img
      className={`mb-[-35px] h-[173px] w-[163px] relative ${className}`}
      loading="lazy"
      alt=""
      src="/user-alt-fill.svg"
    />
  );
};

UserAltFillIcon.propTypes = {
  className: PropTypes.string,
};

export default UserAltFillIcon;