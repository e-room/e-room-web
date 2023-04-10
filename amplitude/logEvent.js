import amplitude from "amplitude-js";

export default ({ name = "", property = {} }) => {
  amplitude.getInstance().logEvent(name, property);
};
