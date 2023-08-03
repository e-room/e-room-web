import Empty from "assets/illust/illust-empty_heart.svg";
import Button from "components/common/atoms/Button";
import { useRouter } from "next/router";

export default () => {
  const router = useRouter();

  const onBack = () => {
    router.push(`/`);
  };

  return (
    <div className="w-full h-full bg-white box-border flex flex-col justify-center items-center gap-[16px]">
      <Empty />
      <div className="text-title-2 text-black">찜한 자취방이 없어요</div>
      <div className="text-body-2 text-gray-1 text-center">
        지도에서 자취방 실제 거주 리뷰를 둘러보고
        <br />
        마음에 드는 방을 찜해보세요
      </div>
      <Button
        type={"primary"}
        label={"지도에서 둘러보기"}
        size={"md"}
        onClick={onBack}
      />
    </div>
  );
};
