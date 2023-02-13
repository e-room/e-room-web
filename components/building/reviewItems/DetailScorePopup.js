import styled from "@emotion/styled";
import Popup from "components/common/atoms/Popup";
import Score from "components/common/atoms/Score";
import { Body3Bold, Caption2Bold } from "styles/typography";
import parseFloat from "utils/parseFloat";

export default ({ value, showTotalScore, setShowTotalScore }) => {
  const { traffic, buildingComplex, internal, surrounding, livingLocation } =
    value.reviewScoreDto;
  const DetailFields = [
    { title: "교통", score: traffic ?? 0 },
    { title: "건물/단지", score: buildingComplex ?? 0 },
    { title: "내부", score: internal ?? 0 },
    { title: "주변/환경", score: surrounding ?? 0 },
    { title: "생활/입지", score: livingLocation ?? 0 },
  ];

  return (
    <Popup
      title={`${value.authorDto.name}님의 세부 점수`}
      visible={showTotalScore}
      buttonType={"confirm"}
      confirmText={"닫기"}
      onConfirmClick={() => setShowTotalScore(false)}
    >
      <DetailScoreField>
        {DetailFields.map((val) => {
          return (
            <div className="field" key={val.title}>
              <div className="title">{val.title}</div>
              <ScoreField>
                <div className="score">{parseFloat(val.score, 1)}</div>
                <Score
                  size="sm"
                  readOnly={true}
                  value={parseFloat(val.score, 1)}
                  allowFraction={true}
                />
              </ScoreField>
            </div>
          );
        })}
      </DetailScoreField>
    </Popup>
  );
};

const DetailScoreField = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  gap: 8px;

  .field {
    display: flex;
    align-items: center;

    .title {
      min-width: 84px;
      ${Body3Bold}
      color: var(--black);
    }
  }
`;
const ScoreField = styled.div`
  display: flex;
  align-items: center;

  .score {
    ${Caption2Bold}
    color: var(--primary-1);

    margin-right: 6px;
  }
  svg {
    fill: var(--primary-1);
  }
`;
