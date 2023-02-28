import dayjs from "dayjs";
import styled from "@emotion/styled";
import { Caption1Bold, Caption2, Caption2Bold } from "styles/typography";
import Avatar from "components/common/atoms/Avatar";
import Score from "components/common/atoms/Score";
import parseFloat from "utils/parseFloat";

export default ({ value, onScorePopup, onDeletePopup, profile }) => {
  const showDelete = profile?.id && profile.id === value.authorDto.id;
  const { residenceSatisfaction } = value.reviewScoreDto;
  return (
    <Container>
      <Avatar
        size={"md"}
        img={value.authorDto.picture}
        style={{ marginRight: 6 }}
      />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
        }}
      >
        <ScoreArea>
          <Score
            size="sm"
            readOnly={true}
            value={parseFloat(residenceSatisfaction, 1)}
            allowFraction={true}
          />
          <div className="score">{parseFloat(residenceSatisfaction, 1)}</div>
        </ScoreArea>
        <UserInfo>
          {value.authorDto.name} |{" "}
          {dayjs(value.reviewBaseDto.createdAt).format("YY.MM.DD.")} |{" "}
          <span onClick={() => onScorePopup(value)}>세부점수 보기</span>
        </UserInfo>
      </div>
      <div>
        {showDelete && (
          <DeleteButton onClick={() => onDeletePopup(value)}>삭제</DeleteButton>
        )}
      </div>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
`;

const ScoreArea = styled.div`
  ${Caption2Bold}

  color: var(--primary-1);
  display: flex;
  align-items: flex-start;

  .score {
    margin-left: 6px;
  }

  svg {
    fill: var(--primary-1);
  }
`;

const UserInfo = styled.div`
  ${Caption2}
  color: var(--gray-1);

  span {
    border-bottom: 1px solid var(--gray-1);
    cursor: pointer;
  }
`;

const DeleteButton = styled.div`
  ${Caption1Bold}

  color: var(--danger-1);
  width: 25px;
  cursor: pointer;
`;
