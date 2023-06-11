import AppLayout from "components/common/AppLayout";
import Icon from "components/common/atoms/Icon";
import LogoHWhite from "assets/logo/logo-horizontal-white.svg";
import Button from "components/common/atoms/Button";
import { useRouter } from "next/router";

export default function home() {
  const router = useRouter();
  const quickLinks = [
    { icon: "khu", title: "경희대서울" },
    { icon: "khu", title: "경희대국제" },
    { icon: "kaist", title: "카이스트" },
    { icon: "my-location", title: "내 주변" },
  ];

  const goMap = () => {
    router.push(`/map`);
  };
  const goReviewWrite = () => {
    router.push(`/review/write`);
  };

  return (
    <AppLayout enabledHeader={false}>
      <div className="flex flex-col bg-primary-1 h-full w-full px-[20px] pt-[16px] pb-[40px] gap-[12px]">
        <LogoHWhite />
        <div className="bg-white py-[14px] px-[16px] rounded-[12px]">
          도로명 주소로 검색해보세요
        </div>
      </div>
      <div className="bg-body rounded-t-[24px] w-full h-full px-[20px] py-[28px] fixed top-[124px] flex flex-col">
        {/* 인기 지역 바로가기 */}
        <div className="text-black text-subtitle-2 mb-[12px]">
          인기 지역 바로가기
        </div>
        <div className="grid grid-cols-2 gap-[8px]">
          {quickLinks.map((item) => {
            return (
              <div
                className="p-[12px] rounded-[12px] bg-white flex items-center gap-[8px] justify-between shadow-quicklink"
                key={item.title}
              >
                <div className="flex items-center gap-[8px]">
                  <Icon icon={item.icon} size={"lg"} fill={"fill-gray-3"} />
                  <div className="text-body-2 text-black">{item.title}</div>
                </div>
                <Icon icon={"arrow-right"} size={"sm"} fill={"fill-gray-4"} />
              </div>
            );
          })}
        </div>
        {/* 베스트 리뷰 */}
        <div className="text-black text-subtitle-2 mb-[12px] mt-[36px]">
          베스트 리뷰
        </div>
        <div className="grid grid-cols-2 gap-[8px]"></div>
        {/* 버튼들 */}
        <div className="flex flex-col gap-[8px] mt-[24px]">
          <Button
            size={"md"}
            label="리뷰 지도 둘러보기"
            type="secondary"
            icon="map-marked"
            onClick={goMap}
            className={"w-full"}
          />
          <Button
            size={"md"}
            label="새 리뷰 쓰기"
            type="primary"
            icon="pencil"
            onClick={goReviewWrite}
            className={"w-full"}
          />
        </div>
      </div>
    </AppLayout>
  );
}
