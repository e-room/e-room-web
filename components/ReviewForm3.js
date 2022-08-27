import styled from "@emotion/styled";
import { useState } from "react";
import TextArea from "./Input/TextArea";
import Toggle from "./Input/Toggle";

export default function ReviewForm3() {
  const initialMyKeywords = [
    "parking",
    "security",
    "building",
    "bug",
    "elevator",
    "hill",
    "store",
  ];

  const [goodKeywords, setGoodKeywords] = useState([...initialMyKeywords]);
  const onKeyWordClick = (type, keyword, isActive) => {
    if (isActive) {
      const Keywords = [...goodKeywords];
      const removeKeywords = Keywords.filter((key) => key !== keyword);
      setGoodKeywords([...removeKeywords]);
    } else if (!isActive) {
      setGoodKeywords([...goodKeywords, keyword]);
    }
  };

  return (
    <FormWrapper>
      <TextLabel>장점 키워드</TextLabel>
      <Box>
        {keywords.map((value) => {
          const active = goodKeywords.some((keyword) => keyword === value.key);
          return (
            <Toggle
              label={value.text}
              key={value.key}
              style={{ margin: "6px 2px" }}
              active={active}
              onClick={() => onKeyWordClick("good", value.key, active)}
            />
          );
        })}
      </Box>
      <TextLabel>장점 설명</TextLabel>
      <TextArea placeholder="장점 키워드에 대한 설명을 적어주세요!" height={168} />
      <TextLabel>단점 키워드</TextLabel>
      <Box>
        {keywords.map((value) => {
          return (
            <Toggle
              label={value.text}
              key={value.key}
              style={{ margin: "6px 2px" }}
              active={value.key === "parking"}
            />
          );
        })}
      </Box>
      <TextLabel>단점 설명</TextLabel>
      <TextArea placeholder="장점 키워드에 대한 설명을 적어주세요!" height={168} />
    </FormWrapper>
  );
}

const Box = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
`;
const TextLabel = styled.div`
  font-family: "Pretendard";
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 24px;

  margin-bottom: 4px;
`;

const keywords = [
  { key: "parking", text: "🚘 주차" },
  { key: "transport", text: "🚌 대중교통" },
  { key: "park", text: "🏞 공원 산책" },
  { key: "safety", text: "🚔 치안" },
  { key: "security", text: "👮 경비실" },
  { key: "building", text: "🏠 건물관리" },
  { key: "separate", text: "🗑 분리수거" },
  { key: "ventilation", text: "💨 환기" },
  { key: "moisture", text: "💧 방습" },
  { key: "insulation", text: "♨️ 단열" },
  { key: "mining", text: "🌤 채광" },
  { key: "pet", text: "🐈 반려동물 키우기" },
  { key: "bug", text: "🦋 벌레" },
  { key: "floorNoise", text: "🔊 층간소음" },
  { key: "elevator", text: "🛗 엘레베이터" },
  { key: "noise", text: "📣 동네소음" },
  { key: "hill", text: "⛰ 언덕" },
  { key: "mart", text: "🏪 마트/편의점" },
  { key: "store", text: "🏫 상가" },
  { key: "school", text: "🎓 학교/학원" },
];
