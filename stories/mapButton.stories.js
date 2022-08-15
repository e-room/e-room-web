import MapButton from "../components/Button/MapButton";

export default {
  title: "components/Button/MapButton",
  component: MapButton,
};

const Template = (args) => {
  return <MapButton {...args} />;
};

export const FillMapButton = Template.bind({});
FillMapButton.args = {
  fill: true,
};
export const StrokeMapButton = Template.bind({});
StrokeMapButton.args = {
  fill: false,
};
