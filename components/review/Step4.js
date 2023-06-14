import Images from "components/common/atoms/Images";

export default function ReviewForm4() {
  return (
    <div className="animate-page-up flex flex-col p-[20px] bg-white">
      <div className="text-body-bold-2 mb-[4px] flex">
        자취방 사진
        <div className="text-body-2 text-gray-2 ml-[4px]">(선택)</div>
      </div>
      <div className="text-body-3">
        자취방이나 건물에 대한 사진을 올려주세요.
        <br />
        최대 5장까지 올릴 수 있어요.
      </div>
      <div className="flex flex-wrap gap-[12px] mt-[24px]">
        <Images />
      </div>
    </div>
  );
}
