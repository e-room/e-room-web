import Chip from "../components/Chip";

export default {
  title: "components/Chip",
  component: Chip,
};

const Template = (args) => {
  return <Chip {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  label: "Label",
};
