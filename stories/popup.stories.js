import Popup from "../components/common/atoms/Popup";

export default {
  title: "components/Popup/Popup",
  component: Popup,
};

const Template = (args) => {
  return <Popup {...args} />;
};

export const Confirm = Template.bind({});
Confirm.args = {
  title: "제목을 입력해주세요",
  subTitle: "보조 텍스트를 입력해주세요",
  titleAlign: "center",
  buttonType: "confirm",
};

export const Default = Template.bind({});
Default.args = {
  title: "제목을 입력해주세요",
  subTitle: "보조 텍스트를 입력해주세요",
  titleAlign: "center",
  buttonType: "default",
};

export const Warning = Template.bind({});
Warning.args = {
  title: "제목을 입력해주세요",
  subTitle: "보조 텍스트를 입력해주세요",
  titleAlign: "center",
  buttonType: "warning",
};
