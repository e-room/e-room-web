import PropTypes from "prop-types";

import ArrowDown from "../../assets/icon/arrow-down.svg";
import ArrowLeft from "../../assets/icon/arrow-left.svg";
import ArrowRight from "../../assets/icon/arrow-right.svg";
import ArrowUp from "../../assets/icon/arrow-up.svg";
import CheckCircle from "../../assets/icon/check-circle.svg";
import Check from "../../assets/icon/check.svg";
import ExclamationCircle from "../../assets/icon/exclamation-circle.svg";
import FilterFill from "../../assets/icon/filter-fill.svg";
import FilterStroke from "../../assets/icon/filter-stroke.svg";
import Google from "../../assets/icon/google.svg";
import HeartFill from "../../assets/icon/heart-fill.svg";
import HeartStroke from "../../assets/icon/heart-stroke.svg";
import HomeFill from "../../assets/icon/home-fill.svg";
import HomeStroke from "../../assets/icon/home-stroke.svg";
import Kakao from "../../assets/icon/kakao.svg";
import Location from "../../assets/icon/location.svg";
import Minus from "../../assets/icon/minus.svg";
import Mypage from "../../assets/icon/mypage.svg";
import Naver from "../../assets/icon/naver.svg";
import PencilFill from "../../assets/icon/pencil-fill.svg";
import Plus from "../../assets/icon/plus.svg";
import QuestionCircle from "../../assets/icon/question-circle.svg";
import Search from "../../assets/icon/search.svg";
import SendFill from "../../assets/icon/send-fill.svg";
import SendStroke from "../../assets/icon/send-stroke.svg";
import StarDefault from "../../assets/icon/star-default.svg";
import StarFilled from "../../assets/icon/star-filled.svg";
import StarHalf from "../../assets/icon/star-half.svg";
import ThreeDot from "../../assets/icon/three-dot.svg";
import ThumbFill from "../../assets/icon/thumb-fill.svg";
import ThumbStroke from "../../assets/icon/thumb-stroke.svg";
import ThumbsUpFill from "../../assets/icon/thumbs-up-fill.svg";
import ThumbsUpStroke from "../../assets/icon/thumbs-up-stroke.svg";
import XIcon from "../../assets/icon/x-icon.svg";

import LogoDefault from "../../assets/logo/logo-default.svg";
import LogoWhite from "../../assets/logo/logo-white.svg";

export default function Icon({ icon, size = "md", fill }) {
  const SIZES = {
    sm: 16,
    md: 24,
    lg: 32,
  };

  const args = {
    width: SIZES[size],
    height: SIZES[size],
    fill,
  };

  switch (icon) {
    case "arrow-down":
      return <ArrowDown {...args} />;
    case "arrow-left":
      return <ArrowLeft {...args} />;
    case "arrow-right":
      return <ArrowRight {...args} />;
    case "arrow-up":
      return <ArrowUp {...args} />;
    case "check-circle":
      return <CheckCircle {...args} />;
    case "check":
      return <Check {...args} />;
    case "exclamation-circle":
      return <ExclamationCircle {...args} />;
    case "filter-fill":
      return <FilterFill {...args} />;
    case "filter-stroke":
      return <FilterStroke {...args} />;
    case "google":
      return <Google {...args} />;
    case "heart-fill":
      return <HeartFill {...args} />;
    case "heart-stroke":
      return <HeartStroke {...args} />;
    case "home-fill":
      return <HomeFill {...args} />;
    case "home-stroke":
      return <HomeStroke {...args} />;
    case "kakao":
      return <Kakao {...args} />;
    case "location":
      return <Location {...args} />;
    case "minus":
      return <Minus {...args} />;
    case "mypage":
      return <Mypage {...args} />;
    case "naver":
      return <Naver {...args} />;
    case "pencil-fill":
      return <PencilFill {...args} />;
    case "plus":
      return <Plus {...args} />;
    case "question-circle":
      return <QuestionCircle {...args} />;
    case "search":
      return <Search {...args} />;
    case "send-fill":
      return <SendFill {...args} />;
    case "send-stroke":
      return <SendStroke {...args} />;
    case "star-default":
      return <StarDefault {...args} />;
    case "star-filled":
      return <StarFilled {...args} />;
    case "star-half":
      return <StarHalf {...args} />;
    case "three-dot":
      return <ThreeDot {...args} />;
    case "thumb-fill":
      return <ThumbFill {...args} />;
    case "thumb-stroke":
      return <ThumbStroke {...args} />;
    case "thumbs-up-fill":
      return <ThumbsUpFill {...args} />;
    case "thumbs-up-stroke":
      return <ThumbsUpStroke {...args} />;
    case "x-icon":
      return <XIcon {...args} />;
    case "logo-default":
      return <LogoDefault {...args} />;
    case "logo-white":
      return <LogoWhite {...args} />;
    default:
      return;
  }
}

Icon.propTypes = {
  icon: PropTypes.string,
  fill: PropTypes.string,
  size: PropTypes.oneOf(["sm", "md", "lg"]),
};
