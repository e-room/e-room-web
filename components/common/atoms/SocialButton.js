import PropTypes from "prop-types";
import Icon from "../atoms/Icon";

export default function SocialButton({
  type,
  onClick,
  className,
  children,
  ...props
}) {
  const TEXTS = {
    kakao: "카카오 계정으로 로그인",
    google: "구글 아이디로 로그인",
    naver: "네이버 아이디로 로그인",
  };

  const StylesByType = {
    kakao: "bg-kakao border border-kakao",
    google: "bg-google border border-gray-4",
    naver: "bg-naver border border-naver",
  };

  const TextStylesByType = {
    kakao: "text-black",
    google: "text-black",
    naver: "text-white",
  };

  return (
    <button
      onClick={onClick}
      type={type}
      className={`h-[52px] rounded-[12px] px-[20px] flex items-center ${StylesByType[type]}`}
      {...props}
    >
      <Icon icon={type} size="md" />
      <div className={`w-full text-body-bold-2 ${TextStylesByType[type]}`}>
        {children ?? TEXTS[type]}
      </div>
    </button>
  );
}

SocialButton.propTypes = {
  type: PropTypes.oneOf(["kakao", "google", "naver"]),
  onClick: PropTypes.func,
  className: PropTypes.string,
};
