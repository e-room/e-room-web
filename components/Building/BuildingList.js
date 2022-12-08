import styled from "@emotion/styled";
import Link from "next/link";
import Chip from "components/common/atoms/Chip";
import Score from "components/common/atoms/Score";

export default function BuildingList({ data }) {
  return data.content.map((value) => {
    return (
      <Link href={`/building/${value.buildingId}`} key={value.buildingId}>
        <BuildingContainer>
          <img src="https://bookthumb-phinf.pstatic.net/cover/137/995/13799585.jpg?update=20180726" />
          <BuildingContent>
            <div className="body-bold-2">{value.name}</div>
            <AddressArea className="caption-2">
              {value.address.siDo} {value.address.siGunGu}{" "}
              {value.address.roadName} {value.address.buildingNumber}
            </AddressArea>
            <Chips>
              {value.directDeal && <Chip label={"직거래가능"} />}
              <Chip label={"교통 편리"} />
            </Chips>
            <ReviewArea>
              <div
                className="caption-2"
                style={{ opacity: 0.5, marginRight: 8 }}
              >
                리뷰 {value.reviewCnt}개
              </div>
              <StarArea className="caption-bold-2">
                {/* util 화 시키기 */}
                {value.scoreAvg
                  ? Number.parseFloat(value.scoreAvg).toFixed(1)
                  : 0}
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
`;

const Chips = styled.div`
  display: flex;
  gap: 4px;
  margin: 9px 0;
`;
const ReviewArea = styled.div`
  display: flex;
`;
const StarArea = styled.div`
  color: var(--primary-1);
`;

const AddressArea = styled.div`
  opacity: 0.5;

  width: calc(100vw - 162px);

  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;
