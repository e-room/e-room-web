import { useRouter } from "next/router";
import Button from "components/common/atoms/Button";

export default () => {
  const router = useRouter();

  const goBack = () => {
    router.back();
  };

  return (
    <div className="flex justify-center items-center flex-col gap-[16px] h-[calc(100vh-250px)]">
      <div className="text-subtitle-1 text-gray-1">이 지역에 건물이 없어요</div>
      <Button
        type={"secondary"}
        size={"md"}
        label={"돌아가기"}
        onClick={goBack}
      />
    </div>
  );
};
