import PropTypes from "prop-types";
import styled from "@emotion/styled";
import Icon from "../Icon";
import { useState } from "react";

// 반별 없애기
// TODO: drag로 선택기능
export default function Score({ size = "md" }) {
  const [starValue, setStarValue] = useState([false, false, false, false, false]);
  const onStarChange = (idx) => {
    let stars = [...starValue];

    for (let i = 0; i < 5; i++) {
      stars[i] = i <= idx ? true : false;
    }

    setStarValue(stars);
  };

  return (
    <StyledScore>
      {starValue.map((value, index) => {
        return (
          <StyledIcon key={index} onClick={() => onStarChange(index)}>
            <Icon icon={value ? `star-filled` : `star-default`} size={size} />
          </StyledIcon>
        );
      })}
    </StyledScore>
  );
}

Score.propTypes = {
  size: PropTypes.string,
};

const StyledScore = styled.div`
  display: flex;
`;

const StyledIcon = styled.div`
  cursor: pointer;
  display: flex;
`;
