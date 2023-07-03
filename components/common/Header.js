import Icon from "../common/atoms/Icon";
import { useRouter } from "next/router";

export default function Header({ pageTitle, additionalFunction, enabled }) {
  const router = useRouter();

  const onBack = () => {
    if (router.query?.returnType) {
      router.push(router.query.returnType);
    } else {
      router.back();
    }
  };

  const styleByBox = "flex justify-center items-center min-w-[24px]";
  if (!enabled) return;
  return (
    <header className="w-full h-[44px] fixed top-0 left-0 pr-[20px] pl-[16px] box-border bg-white z-10 flex justify-between items-center shadow-header backdrop-blur-[12px]">
      {router.pathname === "/mypage" || router.pathname === "/" ? (
        <div className={styleByBox}></div>
      ) : (
        <div className={`${styleByBox} cursor-pointer`} onClick={onBack}>
          <Icon icon={"arrow-left"} size="md" fill="fill-gray-2" />
        </div>
      )}
      <div className={styleByBox}>
        {pageTitle ? (
          <div className="text-subtitle-2 text-black break-words truncate">
            {pageTitle}
          </div>
        ) : (
          <>
            <Icon icon={"logo-default"} size="lg" />
            <div className="text-subtitle-2 text-primary-1">
              <span className="text-primary-3">e</span>room
            </div>
          </>
        )}
      </div>
      <div className={`${styleByBox} cursor-pointer`}>
        {additionalFunction ?? null}
      </div>
    </header>
  );
}
