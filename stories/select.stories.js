import Select from "../components/common/atoms//Select";

export default {
  title: "components/Input/Select",
  component: Select,
};

const Template = (args) => {
  return <Select {...args} />;
};

export const Default = Template.bind({});
Default.args = {};
