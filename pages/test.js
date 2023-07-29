import Popup from "components/common/atoms/Popup copy";
import { useState } from "react";

export default () => {
  const [success, setSuccess] = useState(false);
  return (
    <div>
      <Popup />
    </div>
  );
};
