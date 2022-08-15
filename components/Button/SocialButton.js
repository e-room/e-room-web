import PropTypes from "prop-types";
import styled from "@emotion/styled";
import Icon from "../Icon";

const Button = styled.button`
  min-width: 335px;
  height: 52px;
  border-radius: 12px;
  padding: 0px 20px;

  background: ${(props) => `var(--${props.type})`};
  border: ${(props) =>
    props.type === "google"
      ? `1px solid var(--gray-4)`
      : `1px solid var(--${props.type})`};

  display: flex;
  align-items: center;

  div {
    width: 100%;
    font-style: normal;
    font-weight: 700;
    font-size: 16px;
    line-height: 24px;
    letter-spacing: 0em;

    color: ${(props) => (props.type === "naver" ? `var(--white)` : `var(--black)`)};
  }
`;

export default function SocialButton({ type, onClick, children }) {
  const TEXTS = {
    kakao: "카카오 계정으로 로그인",
    google: "구글 아이디로 로그인",
    naver: "네이버 아이디로 로그인",
  };

  return (
    <Button onClick={onClick} type={type}>
      <Icon icon={type} size="md" />
      <div>{children ?? TEXTS[type]}</div>
    </Button>
  );
}

SocialButton.propTypes = {
  type: PropTypes.oneOf(["kakao", "google", "naver"]),
  onClick: PropTypes.func,
};