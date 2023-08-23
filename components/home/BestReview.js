import { KEYWORD_STATES } from "constants/codeType";
import Avatar from "components/common/atoms/Avatar";
import Chip from "components/common/atoms/Chip";
import Icon from "components/common/atoms/Icon";
import parseFloat from "utils/parseFloat";
import ImageList from "components/building/ImageList";
import { useState } from "react";
import Slider from "components/building/Slider";

export default function BestReview({ data }) {
  console.log("data", data.reviewImageListDto.reviewImageList);
  const {
    score,
    advantage,
    advantageDescription,
    disadvantage,
    disadvantageDescription,
  } = data.reviewBaseDto;
  const advantages = [
    {
      title: "👍🏻 장점",
      chips: advantage,
      content: advantageDescription,
    },
    {
      title: "👎🏻 단점",
      chips: disadvantage,
      content: disadvantageDescription,
    },
  ];

  const images = data.reviewImageListDto.reviewImageList;
  const image = data.reviewImageListDto.reviewImageList[0];
  const [showImages, setShowImages] = useState(false);

  return (
    <div className="flex flex-col gap-[16px] rounded-[12px] bg-white shadow-quicklink p-[16px] min-w-[calc(100vw-56px)] md:min-w-[667px]">
      <div className="justify-between flex gap-[16px]">
        <div>
          <div className="text-body-bold-2 text-black mb-[4px]">
            {data.buildingName === ""
              ? `${data.address.roadName} ${data.address.buildingNumber}`
              : data.buildingName}
          </div>
          <div className="flex gap-[6px] items-center">
            <Avatar size={"md"} img={data.authorDto.picture} />
            <div className="text-caption-2 text-gray-1">
              {data.authorDto.name}
            </div>
            <div className="flex gap-[4px]">
              <Icon icon="star-filled" size="sm" fill="fill-primary-1" />
              <div className="text-caption-bold-2 text-primary-1">
                {parseFloat(score, 1)}
              </div>
            </div>
          </div>
        </div>
        <div>
          <img
            src={image.url}
            width={52}
            height={52}
            className="rounded-[8px] cursor-pointer object-cover min-w-[52px] min-h-[52px] max-w-[52px] max-h-[52px]"
            onClick={() => setShowImages(true)}
          />
        </div>
      </div>
      {images.length > 0 && showImages && (
        <Slider
          data={images}
          onClose={() => setShowImages(false)}
          // defaultId={showImgDetail.uuid}
        />
      )}

      {advantages.map((v) => {
        return (
          <div className="mt-[16px]" key={v.title}>
            <div className="text-caption-bold-2 text-black">{v.title}</div>
            <div className="flex gap-[3px] my-[12px] flex-wrap">
              {v.chips.map((v) => {
                return (
                  <Chip label={KEYWORD_STATES[v]} key={v} type={"tertiary"} />
                );
              })}
            </div>
            <div className="text-body-3 text-black  line-clamp-2 text-ellipsis	">
              {v.content}
            </div>
          </div>
        );
      })}
    </div>
  );
}
