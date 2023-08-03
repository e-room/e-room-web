import PropTypes from "prop-types";
import Button from "./Button";
import { useEffect, useState } from "react";

export default function BottomSheet({
  title,
  visible = false,
  buttonType = "default",
  onSubmit,
  submitLabel,
  children,
}) {
  const ButtonType = () => {
    switch (buttonType) {
      case "confirm":
        return (
          <Button
            label={submitLabel}
            size="lg"
            width={"100%"}
            type={"primary"}
            onClick={onSubmit}
          />
        );
      case "default":
        return (
          <div style={{ display: "flex", gap: 8 }}>
            <Button
              label={"Label"}
              size="lg"
              width={"100%"}
              type={"secondary"}
            />
            <Button label={"Label"} size="lg" width={"100%"} type={"primary"} />
          </div>
        );
      case "warning":
        return (
          <div style={{ display: "flex", gap: 8 }}>
            <Button
              label={"Label"}
              size="lg"
              width={"100%"}
              type={"secondary"}
            />
            <Button label={"Label"} size="lg" width={"100%"} type={"warning"} />
          </div>
        );
      default:
        return;
    }
  };

  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    let timeoutId;
    if (visible) {
      setIsOpen(true);
    } else {
      timeoutId = setTimeout(() => setIsOpen(false), 300);
    }

    return () => {
      if (timeoutId !== undefined) {
        clearTimeout(timeoutId);
      }
    };
  }, [visible]);

  if (!isOpen) return null;
  return (
    <div className="bg-overlay w-screen h-screen fixed top-0 left-0 overflow-hidden z-[11]">
      <div
        className={`${
          visible ? "animate-toast-visible" : "animate-toast-hidden"
        } fixed bottom-0 w-full`}
      >
        <div className="flex flex-col items-center pt-[32px] px-[20px] pb-[20px] gap-[16px] isolate bg-white rounded-t-[32px]">
          <div className="text-subtitle-1 text-black w-full text-center">
            {title}
          </div>
          {children}
          <div className="w-full">{ButtonType()}</div>
        </div>
      </div>
    </div>
  );
}

BottomSheet.propTypes = {
  title: PropTypes.string,
  subTitle: PropTypes.string,
  visible: PropTypes.bool,
  buttonType: PropTypes.oneOf(["confirm", "default", "warning"]),
  onHideClick: PropTypes.func,
  onSubmit: PropTypes.func,
};
