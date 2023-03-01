import styled from "@emotion/styled";
import Link from "next/link";
import Chip from "components/common/atoms/Chip";
import Score from "components/common/atoms/Score";
import { Body2Bold, Caption2, Caption2Bold } from "styles/typography";
import Logo from "assets/img_room_default.svg";
import parseFloat from "utils/parseFloat";
import { SCORE_CHIP } from "codes/codeType";

export default (props) => {
  const { item } = props;

  return item.map((value) => {
    return (
      <div key={value.buildingId} className="cursor-pointer">
        <Link href={`/building/${value.buildingId}`}>
          <BuildingContainer>
            <div style={{ width: 122, height: 122 }}>
              <Logo width={122} height={122} />
            </div>
            <BuildingContent>
              <div className="building-name">
                {value.name === ""
                  ? `${value.address.roadName} ${value.address.buildingNumber}`
                  : value.name}
              </div>
              <AddressArea>
                {value.address.siDo} {value.address.siGunGu}{" "}
                {value.address.roadName} {value.address.buildingNumber}
              </AddressArea>
              <Chips>
                {value.directDeal && <Chip label={"직거래가능"} />}
                <Chip
                  label={SCORE_CHIP[value.bestCategory]}
                  type={"secondary"}
                />
              </Chips>
              <ReviewArea>
                <div
                  className="review-count"
                  style={{ opacity: 0.5, marginRight: 8 }}
                >
                  리뷰 {value.reviewCnt}개
                </div>
                <StarArea>{parseFloat(value.avgScore, 1)}</StarArea>
                <div style={{ marginTop: 3 }}>
                  <Score
                    size="sm"
                    readOnly={true}
                    value={value.avgScore}
                    allowFraction={true}
                  />
                </div>
              </ReviewArea>
            </BuildingContent>
          </BuildingContainer>
        </Link>
      </div>
    );
  });
};

const BuildingContainer = styled.div`
  display: flex;
  border-top: 1px solid var(--gray-4);

  background: var(--white);
  img {
    background: var(--gray-1);
  }
`;
const BuildingContent = styled.div`
  padding: 12px 20px;
  .building-name {
    ${Body2Bold}

    word-break: break-word;
    text-overflow: ellipsis;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
  }
`;

const Chips = styled.div`
  display: flex;
  gap: 4px;
  margin: 9px 0;
`;
const ReviewArea = styled.div`
  display: flex;
  align-items: center;
  max-height: 16px;
  .review-count {
    ${Caption2}
  }
`;
const StarArea = styled.div`
  ${Caption2Bold}
  color: var(--primary-1);
`;

const AddressArea = styled.div`
  ${Caption2}
  opacity: 0.5;

  width: calc(100vw - 162px);

  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;
