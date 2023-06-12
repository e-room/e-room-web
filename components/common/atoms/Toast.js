import { useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import Icon from "./Icon";

// type : success || danger
export default ({ text, type = "success" }) => {
  const notify = () => {
    return toast.custom(
      (t) => {
        return (
          <div
            className={`${
              t.visible ? "animate-toast-visible" : "animate-toast-hidden"
            } w-full flex items-center py-[16px] px-[20px] gap-[12px] bg-white rounded-[12px] text-black text-body-2 shadow-toast`}
          >
            <Icon
              icon={type === "success" ? "check-circle" : "exclamation-circle"}
              size="md"
              fill={type === "success" ? "fill-success" : "fill-danger-1"}
            />
            {text}
          </div>
        );
      },
      {
        pauseDuration: 1000,
        duration: 1000,
      }
    );
  };

  useEffect(() => {
    notify();
  }, []);
  return <Toaster />;
};
