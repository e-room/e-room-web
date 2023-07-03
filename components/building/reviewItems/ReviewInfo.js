import styled from "@emotion/styled";
import { KEYWORD_STATES } from "codes/codeType";
import Chip from "components/common/atoms/Chip";
import { Body3, Caption2Bold } from "styles/typography";
import parseFloat from "utils/parseFloat";

export default ({ value }) => {
  const {
    netLeasableArea,
    residenceStartYear,
    residenceDuration,
    deposit,
    monthlyRent,
    managementFee,
    advantage,
    advantageDescription,
    disadvantage,
    disadvantageDescription,
  } = value.reviewBaseDto;

  const m2 = parseFloat(netLeasableArea * 3.3058, 1);
  const Infos = [
    {
      title: "거주시작",
      content: `${residenceStartYear}년~`,
    },
    {
      title: "거주기간",
      content: `${residenceDuration}개월`,
    },
    {
      title: "집 크기",
      content: `${netLeasableArea}평 (${m2}m²)`,
    },
    {
      title: "보증금",
      content: `${deposit}만원`,
    },
    {
      title: "월세",
      content: `${monthlyRent}만원`,
    },
    {
      title: "관리비",
      content: `${managementFee}만원`,
    },
  ];

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
    <>
      <Info>
        {Infos.map((v) => {
          return (
            <div key={v.title}>
              <div className="text-caption-bold-2 text-gray-2 mb-[4px]">
                {v.title}
              </div>
              <div className="text-body-3 text-black">{v.content}</div>
            </div>
          );
        })}
      </Info>
      {advantages.map((v) => {
        return (
          <div className="mt-[20px]" key={v.title}>
            <div className="text-caption-bold-2 text-black">{v.title}</div>
            <div className="flex gap-[3px] my-[12px] flex-wrap">
              {v.chips.map((v) => {
                return (
                  <Chip label={KEYWORD_STATES[v]} key={v} type={"tertiary"} />
                );
              })}
            </div>
            <div className="text-body-3 text-black break-words">
              {v.content}
            </div>
          </div>
        );
      })}
    </>
  );
};

const Info = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(33%, auto));

  row-gap: 20px;
`;
