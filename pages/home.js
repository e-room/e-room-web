import AppLayout from "components/common/AppLayout";
import Icon from "components/common/atoms/Icon";
import LogoHWhite from "assets/logo/logo-horizontal-white.svg";
import Button from "components/common/atoms/Button";
import { useRouter } from "next/router";
import axios from "axios";
import { useEffect, useState } from "react";
import BestReview from "components/home/BestReview";

export default function home() {
  const router = useRouter();
  const quickLinks = [
    { icon: "khu", title: "경희대서울", lat: 37.5965661, lng: 127.0517503 },
    { icon: "khu", title: "경희대국제", lat: 37.2429616, lng: 127.0800525 },
    { icon: "kaist", title: "카이스트", lat: 36.3721427, lng: 127.36039 },
    { icon: "my-location", title: "내 주변" },
  ];

  const [bestReviews, setBestReviews] = useState([]);
  const getBestReviews = async () => {
    const response = await axios.get(`/apis/building/room/review/bests`);
    setBestReviews(response.data.reviewDtoList);
  };

  console.log("bestReviews", bestReviews);

  const goMap = () => {
    router.push(`/map`);
  };
  const goReviewWrite = () => {
    router.push(`/review/write`);
  };
  const goSearch = () => {
    router.push(`/search`);
  };

  useEffect(() => {
    getBestReviews();
  }, []);

  return (
    <AppLayout enabledHeader={false}>
      <div className="flex flex-col bg-primary-1 h-full w-full px-[20px] pt-[16px] pb-[40px] gap-[12px]">
        <LogoHWhite />
        <div
          className="bg-white py-[14px] px-[16px] rounded-[12px] flex items-center gap-[10px] shadow-search-bar cursor-pointer"
          onClick={goSearch}
        >
          <Icon icon="search" size="sm" fill="fill-primary-1" />
          <input
            type="text"
            placeholder="도로명 주소로 검색해보세요"
            disabled={true}
            className="w-full placeholder:text-gray-3 placeholder:text-body-2 focus:outline-none disabled:bg-white cursor-pointer"
          />
        </div>
      </div>
      <div className="mb-[120px] bg-body rounded-t-[24px] w-full h-full py-[28px] fixed top-[124px] flex flex-col">
        {/* 인기 지역 바로가기 */}
        <div className="text-black text-subtitle-2 mb-[12px] px-[20px]">
          인기 지역 바로가기
        </div>
        <div className="grid grid-cols-2 gap-[8px] px-[20px]">
          {quickLinks.map((item) => {
            return (
              <div
                className="p-[12px] rounded-[12px] bg-white flex items-center gap-[8px] justify-between shadow-quicklink cursor-pointer"
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
        <div className="text-black text-subtitle-2 mt-[36px] px-[20px]">
          베스트 리뷰
        </div>
        <div className="flex gap-[16px] overflow-x-auto no-scrollbar px-[20px] pt-[12px] pb-[24px]">
          {bestReviews.map((item) => {
            return <BestReview data={item} />;
          })}
        </div>
        {/* 버튼들 */}
        <div className="flex flex-col gap-[8px] px-[20px]">
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
