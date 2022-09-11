import Popup from "../components/Popup";

export default {
  title: "components/Popup",
  component: Popup,
};

const Template = (args) => {
  return <Popup {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  title: "제목을 입력해주세요",
  subTitle: "보조 텍스트를 입력해주세요",
};
