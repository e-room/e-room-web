import XButton from "../components/common/atoms/XButton";

export default {
  title: "components/Button/XButton",
  component: XButton,
};

const Template = (args) => {
  return <XButton {...args} />;
};

export const Default = Template.bind({});
Default.args = {};
