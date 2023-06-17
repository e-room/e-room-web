import Toast from "components/common/atoms/Toast";
import { useState } from "react";

export default () => {
  const [success, setSuccess] = useState(false);
  return (
    <div>
      {success && <Toast text="이 건물을 찜목록에 담았어요." type="danger" />}
      <button onClick={() => setSuccess((v) => !v)}>click me!</button>
    </div>
  );
};
