import AppLayout from "components/common/AppLayout";
import Icon from "components/common/atoms/Icon";
import LogoHWhite from "assets/logo/logo-horizontal-white.svg";

export default function home() {
  return (
    <AppLayout
      pageTitle={
        "동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리나라 만세"
      }
      additionalFunction={
        <Icon icon={"filter-fill"} size={"md"} fill={"var(--primary-1)"} />
      }
      enabledHeader={false}
    >
      <div className="flex flex-col bg-primary-1 h-full px-[20px] pt-[16px] pb-[40px] gap-[12px]">
        <LogoHWhite />
        <div className="bg-white py-[14px] px-[16px] rounded-[12px]">
          도로명 주소로 검색해보세요
        </div>
      </div>
      <div className="bg-body rounded-t-[24px] h-full px-[20px] py-[28px]">
        <div className="text-black text-subtitle-2">인기 지역 바로가기</div>
      </div>
    </AppLayout>
  );
}
