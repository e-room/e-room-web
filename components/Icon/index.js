import PropTypes from "prop-types";

import ArrowDown from "../../assets/arrow-down.svg";
import ArrowLeft from "../../assets/arrow-left.svg";
import ArrowRight from "../../assets/arrow-right.svg";
import ArrowUp from "../../assets/arrow-up.svg";
import CheckCircle from "../../assets/check-circle.svg";
import Check from "../../assets/check.svg";
import ExclamationCircle from "../../assets/exclamation-circle.svg";
import FilterFill from "../../assets/filter-fill.svg";
import FilterStroke from "../../assets/filter-stroke.svg";
import Google from "../../assets/google.svg";
import HeartFill from "../../assets/heart-fill.svg";
import HeartStroke from "../../assets/heart-stroke.svg";
import HomeFill from "../../assets/home-fill.svg";
import HomeStroke from "../../assets/home-stroke.svg";
import Kakao from "../../assets/kakao.svg";
import Location from "../../assets/location.svg";
import Minus from "../../assets/minus.svg";
import Mypage from "../../assets/mypage.svg";
import Naver from "../../assets/naver.svg";
import PencilFill from "../../assets/pencil-fill.svg";
import Plus from "../../assets/plus.svg";
import QuestionCircle from "../../assets/question-circle.svg";
import Search from "../../assets/search.svg";
import SendFill from "../../assets/send-fill.svg";
import SendStroke from "../../assets/send-stroke.svg";
import StarDefault from "../../assets/star-default.svg";
import StarFilled from "../../assets/star-filled.svg";
import StarHalf from "../../assets/star-half.svg";
import ThreeDot from "../../assets/three-dot.svg";
import ThumbFill from "../../assets/thumb-fill.svg";
import ThumbStroke from "../../assets/thumb-stroke.svg";
import ThumbsUpFill from "../../assets/thumbs-up-fill.svg";
import ThumbsUpStroke from "../../assets/thumbs-up-stroke.svg";
import XIcon from "../../assets/x-icon.svg";

// TODO: svg 파일 컴포넌트로 변환해서 사용할 수 있게 webpack 설정하기
export default function Icon({ icon, width, height, fill }) {
  const args = {
    width,
    height,
    fill,
  };
  switch (icon) {
    case "ArrowDown":
      return <img src={ArrowDown} {...args} />;
    case "ArrowLeft":
      return <img src={ArrowLeft} {...args} />;
    case "ArrowRight":
      return <img src={ArrowRight} {...args} />;
    case "ArrowUp":
      return <img src={ArrowUp} {...args} />;
    case "CheckCircle":
      return <img src={CheckCircle} {...args} />;
    case "Check":
      return <img src={Check} {...args} />;
    case "ExclamationCircle":
      return <img src={ExclamationCircle} {...args} />;
    case "FilterFill":
      return <img src={FilterFill} {...args} />;
    case "FilterStroke":
      return <img src={FilterStroke} {...args} />;
    case "Google":
      return <img src={Google} {...args} />;
    case "HeartFill":
      return <img src={HeartFill} {...args} />;
    case "HeartStroke":
      return <img src={HeartStroke} {...args} />;
    case "HomeFill":
      return <img src={HomeFill} {...args} />;
    case "HomeStroke":
      return <img src={HomeStroke} {...args} />;
    case "Kakao":
      return <img src={Kakao} {...args} />;
    case "Location":
      return <img src={Location} {...args} />;
    case "Minus":
      return <img src={Minus} {...args} />;
    case "Mypage":
      return <img src={Mypage} {...args} />;
    case "Naver":
      return <img src={Naver} {...args} />;
    case "PencilFill":
      return <img src={PencilFill} {...args} />;
    case "Plus":
      return <img src={Plus} {...args} />;
    case "QuestionCircle":
      return <img src={QuestionCircle} {...args} />;
    case "Search":
      return <img src={Search} {...args} />;
    case "SendFill":
      return <img src={SendFill} {...args} />;
    case "SendStroke":
      return <img src={SendStroke} {...args} />;
    case "StarDefault":
      return <img src={StarDefault} {...args} />;
    case "StarFilled":
      return <img src={StarFilled} {...args} />;
    case "StarHalf":
      return <img src={StarHalf} {...args} />;
    case "ThreeDot":
      return <img src={ThreeDot} {...args} />;
    case "ThumbFill":
      return <img src={ThumbFill} {...args} />;
    case "ThumbStroke":
      return <img src={ThumbStroke} {...args} />;
    case "ThumbsUpFill":
      return <img src={ThumbsUpFill} {...args} />;
    case "ThumbsUpStroke":
      return <img src={ThumbsUpStroke} {...args} />;
    case "XIcon":
      return <img src={XIcon} {...args} />;
    default:
      return;
  }
}

Icon.propTypes = {
  icon: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  fill: PropTypes.string,
};
