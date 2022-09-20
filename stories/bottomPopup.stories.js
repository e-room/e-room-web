import BottomPopup from "../components/Popup/BottomPopup";

export default {
  title: "components/Popup/BottomPopup",
  component: BottomPopup,
};

const Template = (args) => {
  return <BottomPopup {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  title: "제목을 입력해주세요", /* 안녕하세요! */
  subTitle: "보조 텍스트를 입력해주세요",
};
