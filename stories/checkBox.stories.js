import CheckBox from "../components/common/atoms/CheckBox";

export default {
  title: "components/Input/CheckBox",
  component: CheckBox,
};

const Template = (args) => {
  return <CheckBox {...args} />;
};

export const Default = Template.bind({});
Default.args = {};
