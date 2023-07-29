import Logo from "assets/logo/Rectangle.svg";
import Button from "components/common/atoms/Button";
import { useRouter } from "next/router";

export default () => {
  const router = useRouter();

  const onBack = () => {
    router.back();
  };

  return (
    <div className="w-full h-full bg-primary-1 flex flex-col absolute items-center justify-center gap-[16px] box-border">
      <Logo />
      <div className="text-title-2 text-white">오류가 발생했습니다</div>
      <div className="text-body-2 text-white text-center">
        불편을 드려 죄송합니다.
        <br />
        잠시 후에 다시 시도해주세요.
      </div>
      <Button
        type={"secondary"}
        label={"돌아가기"}
        size={"md"}
        onClick={onBack}
      />
    </div>
  );
};
