import Link from "next/link";
import Icon from "../common/atoms/Icon";
import { useRouter } from "next/router";

const navItems = [
  {
    path: "/home",
    activePaths: ["/home", "/buildings", "/login"],
    icon: "home",
    title: "홈",
  },
  {
    path: "/map",
    activePaths: ["/map"],
    icon: "map-marked",
    title: "지도",
  },
  {
    path: "/review/write",
    activePaths: ["/review/write", "/review/write/[index]"],
    icon: "pencil",
    title: "리뷰쓰기",
  },
  {
    path: "/mypage",
    activePaths: ["/mypage"],
    icon: "mypage",
    title: "내정보",
  },
];

export default function Footer({ enabled }) {
  const router = useRouter();
  const { pathname } = router;
  if (!enabled) return;
  return (
    <footer className="shadow-footer rounded-t-[16px] w-full h-[56px] fixed bottom-0 bg-white z-[3] box-border">
      <div className="flex justify-center items-center overflow-hidden px-[16px] gap-[4px]">
        {navItems.map((value, index) => {
          const active = value.activePaths.includes(pathname);

          const stylesByActive = {
            true: {
              textColor: "text-primary-1",
              iconFill: "fill-primary-1",
              text: "text-caption-bold-2",
            },
            false: {
              textColor: "text-gray-3",
              iconFill: "fill-gray-3",
              text: "text-caption-2",
            },
          };

          return (
            <Link href={value.path} key={index}>
              <a>
                <div className="flex flex-col items-center gap-[4px] max-h-[56px] px-[24px] pt-[8px] pb-[4px]">
                  <Icon
                    icon={value.icon}
                    fill={stylesByActive[active].iconFill}
                    size="md"
                  />
                  <div
                    className={`${stylesByActive[active].text} ${stylesByActive[active].textColor}`}
                  >
                    {value.title}
                  </div>
                </div>
              </a>
            </Link>
          );
        })}
      </div>
    </footer>
  );
}
