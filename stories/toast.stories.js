import Toast from "../components/Toast";

export default {
  title: "components/Toast",
  component: Toast,
};

const Template = (args) => {
  return <Toast {...args} />;
};

export const Normal = Template.bind({});
Normal.args = {
  type: "normal",
  message: "일반 토스트 메시지가 이 곳에 뜹니다.",
};

export const Success = Template.bind({});
Success.args = {
  type: "success",
  message: "성공 토스트 메시지가 이 곳에 뜹니다.",
};

export const Danger = Template.bind({});
Danger.args = {
  type: "danger",
  message: "경고 토스트 메시지가 이 곳에 뜹니다.",
};
