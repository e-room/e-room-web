import Avatar from "../components/Avatar";
import Img from "../assets/avatar/64.png";

export default {
  title: "components/Avatar",
  component: Avatar,
};

const Template = (args) => {
  return <Avatar {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  size: "lg",
  img: <img src={Img} />,
};