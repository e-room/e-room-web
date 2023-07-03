import PropTypes from "prop-types";
import Button from "./Button";
import { useEffect, useState } from "react";

export default function Popup({
  title,
  titleAlign = "center", // left, center, right
  visible = false,
  buttonType = "default",
  onCancelClick,
  onConfirmClick,
  children,
  confirmText = "label",
  cancelText = "cancel",
  submitText = "submit",
}) {
  const stylesByTextAlign = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  };

  const ButtonType = () => {
    switch (buttonType) {
      case "confirm":
        return (
          <Button
            label={confirmText}
            size="md"
            width={"100%"}
            type={"primary"}
            onClick={onConfirmClick}
          />
        );
      case "default":
        return (
          <div className="flex gap-[8px]">
            <Button
              label={cancelText}
              size="md"
              width={"100%"}
              type={"secondary"}
              onClick={onCancelClick}
            />
            <Button
              label={submitText}
              size="md"
              width={"100%"}
              type={"primary"}
              onClick={onConfirmClick}
            />
          </div>
        );
      case "warning":
        return (
          <div className="flex gap-[8px]">
            <Button
              label={cancelText}
              size="md"
              width={"100%"}
              type={"secondary"}
              onClick={onCancelClick}
            />
            <Button
              label={submitText}
              size="md"
              width={"100%"}
              type={"warning"}
              onClick={onConfirmClick}
            />
          </div>
        );
      default:
        return;
    }
  };

  useEffect(() => {
    if (visible) {
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [visible]);

  return (
    <div className="w-full h-full fixed top-0 left-0 overflow-hidden touch-none z-20 bg-overlay">
      <div
        className={`h-full flex justify-center items-center ${
          visible ? "animate-popup-visible" : "animate-popup-hidden delay-300"
        }`}
      >
        <div
          className="flex flex-col pt-[32px] px-[16px] pb-[16px] gap-[24px] isolate max-w-[320px] box-border bg-white rounded-[24px]"
          style={{ width: "calc(100vw - 40px)" }}
        >
          <div
            className={`text-subtitle-1 text-black ${stylesByTextAlign[titleAlign]}`}
          >
            {title}
          </div>
          {children}
          <div className="w-full">{ButtonType()}</div>
        </div>
      </div>
    </div>
  );
}

Popup.propTypes = {
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  titleAlign: PropTypes.oneOf(["center", "left", "right"]),
  visible: PropTypes.bool,
  buttonType: PropTypes.oneOf(["confirm", "default", "warning"]),
  onCancelClick: PropTypes.func,
  onConfirmClick: PropTypes.func,
  confirmText: PropTypes.string,
  cancelText: PropTypes.string,
  submitText: PropTypes.string,
};
