import styled from "@emotion/styled";

import { Body2Bold, Caption2, Caption2Bold } from "styles/typography";
import Img from "assets/img.png";

import Score from "components/common/atoms/Score";
import parseFloat from "utils/parseFloat";
import axios from "axios";
import { useEffect, useState } from "react";

export default ({ id }) => {
  console.log("id", id);
  const [building, setBuilding] = useState({
    name: "",
    score: 0,
    reviewCnt: 0,
  });
  const getBuilding = async () => {
    return await axios.get(`/apis/building/${id}`).then((response) => {
      const value = response.data;
      const name =
        value.name === ""
          ? `${value.address.roadName} ${value.address.buildingNumber}`
          : value.name;
      const score = value.buildingSummaries.RESIDENCESATISFACTION;

      setBuilding({ ...building, name, score });
    });
  };

  useEffect(() => {
    getBuilding();
  }, [id]);
  console.log("buildig, ", building);

  return (
    <Container>
      <img src={Img.src} width={72} height={72} style={{ borderRadius: 8 }} />
      <div className="wrapper">
        <div className="building-name">{building.name}</div>
        <ReviewArea>
          <div className="review-count">리뷰 0개</div>
          <StarArea>{parseFloat(building.score, 1)}</StarArea>
          <div style={{ marginTop: 3 }}>
            <Score
              size="sm"
              readOnly={true}
              value={building.score}
              allowFraction={true}
            />
          </div>
        </ReviewArea>
      </div>
    </Container>
  );
};

const Container = styled.div`
  width: calc(100vw - 40px);
  background-color: white;
  max-width: 320px;
  max-height: 88px;
  box-sizing: border-box;
  border-radius: 12px;
  padding: 8px;

  margin-top: 8px;

  gap: 12px;
  display: flex;

  .wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 4px;
  }

  .building-name {
    ${Body2Bold}
    color: var(--black);
    min-height: 24px;
  }
`;

const ReviewArea = styled.div`
  display: flex;
  align-items: center;
  max-height: 16px;
  .review-count {
    ${Caption2}

    opacity: 0.5;
    margin-right: 8px;
  }
`;
const StarArea = styled.div`
  ${Caption2Bold}
  color: var(--primary-1);
`;
