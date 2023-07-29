import { KEYWORD_STATES } from "codes/codeType";
import Avatar from "components/common/atoms/Avatar";
import Chip from "components/common/atoms/Chip";
import Icon from "components/common/atoms/Icon";
import parseFloat from "utils/parseFloat";

export default function BestReview({ data }) {
  console.log("data", data);
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

  return (
    <div className="flex flex-col gap-[16px] rounded-[12px] bg-white shadow-quicklink p-[16px] min-w-[calc(100vw-56px)] md:min-w-[667px]">
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
