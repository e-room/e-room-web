import Image from "../components/common/atoms/Image";

export default {
  title: "components/Input/Image",
  component: Image,
};

const Template = (args) => {
  return <Image {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  label: "Label",
};
