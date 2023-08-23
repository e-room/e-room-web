import { useSetRecoilState } from "recoil";
import { imageViewState } from "states/buidlingAtom";
import Image from "next/image";

export default ({ data }) => {
  const setShowDetail = useSetRecoilState(imageViewState);

  const onDetailView = (id) => {
    document.body.style.overflow = "hidden";
    setShowDetail({ visible: true, uuid: id });
  };

  return (
    <div className="py-[12px] pr-0 pl-[20px]">
      <div className="text-body-bold-1 text-black mb-[12px]">사진 모아보기</div>
      <div className="overflow-x-scroll	whitespace-nowrap	no-scrollbar flex">
        {data.map((value) => {
          return (
            <div className="mr-[8px]" key={value.uuid}>
              <Image
                src={`${process.env.NEXT_PUBLIC_PROTOCOL}://` + value.url}
                key={value.uuid}
                width={117}
                height={117}
                objectFit={"cover"}
                onClick={() => onDetailView(value.uuid)}
                className="rounded-[8px] cursor-pointer"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};
