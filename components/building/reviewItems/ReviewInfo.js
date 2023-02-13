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
  } = value.baseReviewDto;

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
              <div className="title">{v.title}</div>
              <div className="content">{v.content}</div>
            </div>
          );
        })}
      </Info>
      {advantages.map((v) => {
        return (
          <AdvantageField key={v.title}>
            <div className="title">{v.title}</div>
            <div className="badge">
              {v.chips.map((v) => {
                return (
                  <Chip label={KEYWORD_STATES[v]} key={v} type={"tertiary"} />
                );
              })}
            </div>
            <div className="description">{v.content}</div>
            {/* //TODO: 더 보기 기능 */}
            {/* <div className="more">
              더보기 <Icon icon={"arrow-down"} size={"sm"} />
            </div> */}
          </AdvantageField>
        );
      })}
    </>
  );
};

const Info = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(33%, auto));

  row-gap: 20px;

  .title {
    ${Caption2Bold}
    color: var(--gray-2);
    margin-bottom: 4px;
  }
  .content {
    ${Body3}
    color: var(--black);
  }
`;

const AdvantageField = styled.div`
  margin-top: 20px;
  .title {
    ${Caption2Bold}
    color: var(--black);
  }
  .badge {
    display: flex;
    flex-wrap: wrap;
    gap: 3px;
    margin: 12px 0;
  }
  .description {
    ${Body3}

    color: var(--black);
    word-break: break-word;
    /* text-overflow: ellipsis;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical; */
  }

  .more {
    ${Body3}

    margin-top: 12px;
    color: var(--gray-1);
    display: flex;
    align-items: center;
    gap: 4px;
    svg {
      fill: var(--gray-1);
    }
  }
`;
