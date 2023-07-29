import Button from "components/common/atoms/Button";

export default ({ goReviewWrite }) => {
  return (
    <div className="flex flex-col items-center pt-[40px] bg-body grow">
      <div className="text-subtitle-1 text-black mb-[12px]">
        아직 리뷰가 없어요
      </div>
      <div className="text-caption-bold-1 text-gray-3 mb-[20px] text-center">
        이 집에 살았던 경험이 있다면 리뷰를 써주세요!
        <br />
        회원님의 소중한 리뷰가 모두에게 큰 도움이 됩니다.
      </div>
      <Button
        type={"primary"}
        size={"md"}
        icon={"plus"}
        onClick={goReviewWrite}
        label="이 자취방 리뷰 쓰기"
      />
    </div>
  );
};
