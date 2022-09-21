import SocialButton from "../components/common/atoms/SocialButton";

export default {
  title: "components/Button/SocialButton",
  component: SocialButton,
};

const Template = (args) => {
  return <SocialButton {...args} />;
};

export const KakaoButton = Template.bind({});
KakaoButton.args = {
  type: "kakao",
};
export const GoogleButton = Template.bind({});
GoogleButton.args = {
  type: "google",
};
export const NaverButton = Template.bind({});
NaverButton.args = {
  type: "naver",
};
