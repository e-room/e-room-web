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
    case "ArrowDown":
      return <ArrowDown {...args} />;
    case "ArrowLeft":
      return <ArrowLeft {...args} />;
    case "ArrowRight":
      return <ArrowRight {...args} />;
    case "ArrowUp":
      return <ArrowUp {...args} />;
    case "CheckCircle":
      return <CheckCircle {...args} />;
    case "Check":
      return <Check {...args} />;
    case "ExclamationCircle":
      return <ExclamationCircle {...args} />;
    case "FilterFill":
      return <FilterFill {...args} />;
    case "FilterStroke":
      return <FilterStroke {...args} />;
    case "Google":
      return <Google {...args} />;
    case "HeartFill":
      return <HeartFill {...args} />;
    case "HeartStroke":
      return <HeartStroke {...args} />;
    case "HomeFill":
      return <HomeFill {...args} />;
    case "HomeStroke":
      return <HomeStroke {...args} />;
    case "Kakao":
      return <Kakao {...args} />;
    case "Location":
      return <Location {...args} />;
    case "Minus":
      return <Minus {...args} />;
    case "Mypage":
      return <Mypage {...args} />;
    case "Naver":
      return <Naver {...args} />;
    case "PencilFill":
      return <PencilFill {...args} />;
    case "Plus":
      return <Plus {...args} />;
    case "QuestionCircle":
      return <QuestionCircle {...args} />;
    case "Search":
      return <Search {...args} />;
    case "SendFill":
      return <SendFill {...args} />;
    case "SendStroke":
      return <SendStroke {...args} />;
    case "StarDefault":
      return <StarDefault {...args} />;
    case "StarFilled":
      return <StarFilled {...args} />;
    case "StarHalf":
      return <StarHalf {...args} />;
    case "ThreeDot":
      return <ThreeDot {...args} />;
    case "ThumbFill":
      return <ThumbFill {...args} />;
    case "ThumbStroke":
      return <ThumbStroke {...args} />;
    case "ThumbsUpFill":
      return <ThumbsUpFill {...args} />;
    case "ThumbsUpStroke":
      return <ThumbsUpStroke {...args} />;
    case "XIcon":
      return <XIcon {...args} />;
    case "LogoDefault":
      return <LogoDefault {...args} />;
    case "LogoWhite":
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
