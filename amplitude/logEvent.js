import amplitude from "amplitude-js";

export default ({ name }) => {
  amplitude.getInstance().logEvent(name);
};
