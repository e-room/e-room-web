import Router from "next/router";
import logEvent from "amplitude/logEvent";
import Button from "components/common/atoms/Button";

export default function PleaseReviewWrite() {
  return (
    <div className="flex flex-col justify-center items-center rounded-[8px] p-[16px] mb-[12px] h-[679px] bg-review_card bg-cover">
      <div
        className="flex flex-col pt-[32px] px-[16px] pb-[16px] gap-[24px] isolate box-border rounded-[24px] bg-white border border-primary-6 max-w-[320px]"
        style={{ width: "calc(100vw - 40px)" }}
      >
        <div className="text-subtitle-1 text-black text-center">
          리뷰를 작성해주세요!
                  </div>
        <div className="text-caption-bold-1 text-black text-center">
          리부를 작성하고 실거주자가 들려주는
          <br />
          자취방 이야기를 들어보세요!
        </div>
        <Button
          label={"리뷰쓰기"}
          size="md"
          width={"100%"}
          type={"primary"}
          onClick={() => {
            // logEvent({ name: "click-login_popup-login" });
            Router.push(`/review/write`);
            // Router.push(`/login?redirect_uri=${Router.router.asPath}`);
          }}
        />
      </div>
    </div>
  );
}
