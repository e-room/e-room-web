import styled from "@emotion/styled";
import { Body3Bold, Caption2Bold, Display2 } from "styles/typography";
import parseFloat from "utils/parseFloat";

import Score from "components/common/atoms/Score";

export default ({ building }) => {
  const { buildingSummaries } = building;
  const {
    RESIDENCESATISFACTION,
    TRAFFIC,
    BUILDINGCOMPLEX,
    INTERNAL,
    SURROUNDING,
    LIVINGLOCATION,
  } = buildingSummaries;

  const totalScore = RESIDENCESATISFACTION;
  const DetailFields = [
    { title: "교통", score: TRAFFIC ?? 0 },
    { title: "건물/단지", score: BUILDINGCOMPLEX ?? 0 },
    { title: "내부", score: INTERNAL ?? 0 },
    { title: "주변/환경", score: SURROUNDING ?? 0 },
    { title: "생활/입지", score: LIVINGLOCATION ?? 0 },
  ];

  return (
    <Container>
      <FlexBox>
        <DetailScoreField>
          {DetailFields.map((value) => {
            return (
              <div className="field" key={value.title}>
                <div className="title">{value.title}</div>
                <ScoreField>
                  <div className="score">{parseFloat(value.score, 1)}</div>
                  <Score
                    size="sm"
                    readOnly={true}
                    value={parseFloat(value.score, 1)}
                    allowFraction={true}
                  />
                </ScoreField>
              </div>
            );
          })}
        </DetailScoreField>
        <TotalBox>
          <TotalTitle>총 만족도</TotalTitle>
          <TotalScore>{parseFloat(totalScore, 1)}</TotalScore>
        </TotalBox>
      </FlexBox>
    </Container>
  );
};

const TotalBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;

  border-left: 1px solid #e9e9e9;
`;

const TotalTitle = styled.div`
  ${Body3Bold}
  color: var(--black);
`;
const TotalScore = styled.div`
  ${Display2}
  color: var(--primary-1);
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 12px 20px;
  background-color: var(--white);
`;

const FlexBox = styled.div`
  display: flex;
  justify-content: space-between;
`;
const ScoreField = styled.div`
  display: flex;
  align-items: center;
  margin-right: 36px;

  .score {
    ${Caption2Bold}
    color: var(--primary-1);

    margin-right: 6px;
  }
  svg {
    fill: var(--primary-1);
  }
`;

const DetailScoreField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;

  .field {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .title {
      min-width: 84px;
      ${Body3Bold}
      color: var(--black);
    }
  }
`;
