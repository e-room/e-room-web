import GroupButton from "../components/common/atoms/GroupButton";

export default {
  title: "components/Button/GroupButton",
  component: GroupButton,
};

const Template = (args) => {
  return <GroupButton {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  items: [
    {
      icon: "plus",
      onClick: () => {},
    },
    {
      icon: "minus",
      onClick: () => {},
    },
  ],
};
