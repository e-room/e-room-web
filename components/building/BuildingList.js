import styled from "@emotion/styled";
import Link from "next/link";
import Chip from "components/common/atoms/Chip";
import Score from "components/common/atoms/Score";
import { Body2Bold, Caption2, Caption2Bold } from "styles/typography";
import Image from "next/image";
import testImg from "assets/marker4.png";
export default function BuildingList({ data }) {
  return data.content.map((value) => {
    return (
      <Link href={`/building/${value.buildingId}`} key={value.buildingId}>
        <BuildingContainer>
          <Image src={testImg} width={122} height={122} objectFit={"cover"} />
          <BuildingContent>
            <div className="building-name">{value.name}</div>
            <AddressArea>
              {value.address.siDo} {value.address.siGunGu} {value.address.roadName}{" "}
              {value.address.buildingNumber}
            </AddressArea>
            <Chips>
              {value.directDeal && <Chip label={"직거래가능"} />}
              <Chip label={"교통 편리"} type={"secondary"} />
            </Chips>
            <ReviewArea>
              <div className="review-count" style={{ opacity: 0.5, marginRight: 8 }}>
                리뷰 {value.reviewCnt}개
              </div>
              <StarArea>
                {/* util 화 시키기 */}
                {value.scoreAvg ? Number.parseFloat(value.scoreAvg).toFixed(1) : 0}
              </StarArea>
              <Score size="sm" readOnly={true} />
            </ReviewArea>
          </BuildingContent>
        </BuildingContainer>
      </Link>
    );
  });
}
const BuildingContainer = styled.div`
  height: 140px;
  display: flex;
  border-top: 1px solid var(--gray-4);

  background: var(--white);
  img {
    background: var(--gray-1);
    width: 122px;
  }
`;
const BuildingContent = styled.div`
  padding: 12px 20px;
  .building-name {
    ${Body2Bold}
  }
`;

const Chips = styled.div`
  display: flex;
  gap: 4px;
  margin: 9px 0;
`;
const ReviewArea = styled.div`
  display: flex;
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
