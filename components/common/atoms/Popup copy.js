import ReactPopup from "reactjs-popup";
import Button from "./Button";

export default function Popup() {
  return (
    <ReactPopup
      trigger={
        <button className="rounded-md text-white p-5 bg-primary-1 ">
          Click Me!
        </button>
      }
      modal={true}
      lockScroll={true}
      closeOnDocumentClick={false}
      overlayStyle={""}
    >
      {(close) => (
        <div className="flex flex-col pt-[32px] px-[16px] pb-[16px] gap-[24px] isolate max-w-[320px] box-border bg-white rounded-[24px] border">
          Contents
          <Button
            label={"닫기"}
            size="md"
            width={"100%"}
            type={"primary"}
            onClick={close}
          />
        </div>
      )}
    </ReactPopup>
  );
}
