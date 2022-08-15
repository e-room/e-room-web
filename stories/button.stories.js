import Button from "../components/Button/Button";

export default {
  title: "components/Button/Button",
  component: Button,
};

const Template = (args) => {
  return <Button {...args} />;
};

export const PrimaryButton = Template.bind({});
PrimaryButton.args = {
  type: "primary",
  size: "sm",
  label: "Label",
  disabled: false,
};

export const SecondaryButton = Template.bind({});
SecondaryButton.args = {
  type: "secondary",
  size: "sm",
  label: "Label",
  disabled: false,
};
