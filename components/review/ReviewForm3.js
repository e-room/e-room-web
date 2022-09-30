import styled from "@emotion/styled";
import { useState } from "react";
import { KEYWORD_STATES } from "codes/codeType";
import { Body2Bold } from "styles/typography";
import TextArea from "components/common/atoms/TextArea";
import Toggle from "components/common/atoms/Toggle";

export default function ReviewForm3() {
  const [myKeywords, setMyKeywords] = useState({
    good: ["PARKING", "SECURITY", "BUILDING_MANAGEMENT", "INSECT", "ELEVATOR"],
    bad: ["HILL", "STORE"],
  });

  const onKeyWordClick = (type, keyword, isActive) => {
    if (isActive) {
      const Keywords = [...myKeywords[type]];
      const removeKeywords = Keywords.filter((key) => key !== keyword);
      setMyKeywords({
        ...myKeywords,
        [type]: [...removeKeywords],
      });
    } else if (!isActive) {
      const Keywords = [...myKeywords[type], keyword];
      setMyKeywords({
        ...myKeywords,
        [type]: [...Keywords],
      });
    }
  };

  return (
    <FormWrapper>
      <TextLabel>장점 키워드</TextLabel>
      <Box>
        {Object.entries(KEYWORD_STATES).map((item) => {
          const active = myKeywords["good"].some((keyword) => keyword === item[0]);
          return (
            <Toggle
              label={item[1]}
              key={item[0]}
              style={{ margin: "6px 2px" }}
              active={active}
              onClick={() => onKeyWordClick("good", item[0], active)}
            />
          );
        })}
      </Box>
      <TextLabel>장점 설명</TextLabel>
      <TextArea placeholder="장점 키워드에 대한 설명을 적어주세요!" height={168} />
      <TextLabel>단점 키워드</TextLabel>
      <Box>
        {Object.entries(KEYWORD_STATES).map((item) => {
          const active = myKeywords["bad"].some((keyword) => keyword === item[0]);
          return (
            <Toggle
              label={item[1]}
              key={item[0]}
              style={{ margin: "6px 2px" }}
              active={active}
              onClick={() => onKeyWordClick("bad", item[0], active)}
            />
          );
        })}
      </Box>
      <TextLabel>단점 설명</TextLabel>
      <TextArea placeholder="장점 키워드에 대한 설명을 적어주세요!" height={168} />
    </FormWrapper>
  );
}

const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  margin-bottom: 150px;

  overflow: scroll;
`;
const TextLabel = styled.div`
  ${Body2Bold}

  margin-bottom: 4px;
`;
const Box = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
