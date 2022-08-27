import Toggle from "../components/Input/Toggle";

export default {
  title: "components/Input/Toggle",
  component: Toggle,
};

const Template = (args) => {
  return <Toggle {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  label: "Label",
};
