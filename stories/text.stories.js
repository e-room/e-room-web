import Text from "../components/common/atoms/Text";

export default {
  title: "components/Input/Text",
  component: Text,
};

const Template = (args) => {
  return <Text {...args} />;
};

export const Default = Template.bind({});
Default.args = {};
