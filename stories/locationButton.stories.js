import LocationButton from "../components/common/atoms/LocationButton";

export default {
  title: "components/Button/LocationButton",
  component: LocationButton,
};

const Template = (args) => {
  return <LocationButton {...args} />;
};

export const Default = Template.bind({});
Default.args = {};
