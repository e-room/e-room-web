import NavBar from "../components/NavBar";

export default {
  title: "components/NavBar",
  component: NavBar,
};

const Template = (args) => {
  return <NavBar {...args} />;
};

export const Default = Template.bind({});
Default.args = {};
