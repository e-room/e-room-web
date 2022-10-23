import BottomSheet from "../components/common/atoms/BottomSheet";

export default {
  title: "components/Popup/BottomSheet",
  component: BottomSheet,
};

const Template = (args) => {
  return <BottomSheet {...args} />;
};

export const Confirm = Template.bind({});
Confirm.args = {
  title: "제목을 입력해주세요",
  subTitle: "보조 텍스트를 입력해주세요",
  buttonType: "confirm",
};
export const Default = Template.bind({});
Default.args = {
  title: "제목을 입력해주세요",
  subTitle: "보조 텍스트를 입력해주세요",
  buttonType: "default",
};
export const Warning = Template.bind({});
Warning.args = {
  title: "제목을 입력해주세요",
  subTitle: "보조 텍스트를 입력해주세요",
  buttonType: "warning",
};
