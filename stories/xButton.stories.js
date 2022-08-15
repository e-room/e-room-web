import XButton from "../components/Button/XButton";

export default {
  title: "components/Button/XButton",
  component: XButton,
};

const Template = (args) => {
  return <XButton {...args} />;
};

export const Default = Template.bind({});
Default.args = {};
