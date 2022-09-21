import Score from "../components/common/atoms//Score";

export default {
  title: "components/Input/Score",
  component: Score,
};

const Template = (args) => {
  return <Score {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  size: "xl",
};
