import styled from "@emotion/styled";
import { KEYWORD_STATES } from "codes/codeType";
import { Body2Bold } from "styles/typography";
import TextArea from "components/common/atoms/TextArea";
import Toggle from "components/common/atoms/Toggle";
import { reviewFormState } from "states/reviewAtom";
import { useRecoilState } from "recoil";
import { keyframes } from "@emotion/react";

export default function ReviewForm3() {
  const [formValue, setFormValue] = useRecoilState(reviewFormState);

  const onKeyWordClick = (type, keyword, isActive) => {
    if (isActive) {
      const Keywords = [...formValue[type]];
      const removeKeywords = Keywords.filter((key) => key !== keyword);
      setFormValue({
        ...formValue,
        [type]: [...removeKeywords],
      });
    } else if (!isActive) {
      const Keywords = [...formValue[type], keyword];
      setFormValue({
        ...formValue,
        [type]: [...Keywords],
      });
    }
  };

  return (
    <FormWrapper>
      <TextLabel>장점 키워드</TextLabel>
      <Box>
        {Object.entries(KEYWORD_STATES).map((item) => {
          const active = formValue.advantageKeywordList.some(
            (keyword) => keyword === item[0]
          );
          const hasDisadvantiage = formValue.disadvantageKeywordList.includes(
            item[0]
          );
          return (
            <Toggle
              label={item[1]}
              key={item[0]}
              style={{ margin: "6px 2px" }}
              active={active}
              disabled={hasDisadvantiage}
              onClick={() => {
                if (!hasDisadvantiage)
                  onKeyWordClick("advantageKeywordList", item[0], active);
              }}
            />
          );
        })}
      </Box>
      <TextLabel style={{ marginTop: 20 }}>장점 설명</TextLabel>
      <TextArea
        placeholder="장점 키워드에 대한 설명을 적어주세요!"
        height={168}
        onChange={(e) => {
          setFormValue({
            ...formValue,
            advantageDescription: e.target.value,
          });
        }}
        value={formValue.advantageDescription}
      />
      <TextLabel style={{ marginTop: 32 }}>단점 키워드</TextLabel>
      <Box>
        {Object.entries(KEYWORD_STATES).map((item) => {
          const active = formValue.disadvantageKeywordList.some(
            (keyword) => keyword === item[0]
          );
          const hasAdvantiage = formValue.advantageKeywordList.includes(
            item[0]
          );
          return (
            <Toggle
              label={item[1]}
              key={item[0]}
              style={{ margin: "6px 2px" }}
              active={active}
              disabled={hasAdvantiage}
              onClick={() => {
                if (!hasAdvantiage)
                  onKeyWordClick("disadvantageKeywordList", item[0], active);
              }}
            />
          );
        })}
      </Box>
      <TextLabel style={{ marginTop: 20 }}>단점 설명</TextLabel>
      <TextArea
        placeholder="장점 키워드에 대한 설명을 적어주세요!"
        height={168}
        onChange={(e) => {
          setFormValue({
            ...formValue,
            disadvantageDescription: e.target.value,
          });
        }}
        value={formValue.disadvantageDescription}
      />
    </FormWrapper>
  );
}
const fadeInUp = keyframes`
from {
  opacity: 0;
  transform: translateY(40px);
}
to {
  opacity: 1;
  transform: translateY(0);
}
`;
const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  margin-bottom: 150px;

  overflow: scroll;
  animation: ${fadeInUp} 0.56s ease-in-out;
`;
const TextLabel = styled.div`
  ${Body2Bold}

  margin-bottom: 4px;
`;
const Box = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
