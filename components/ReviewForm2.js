import styled from "@emotion/styled";
import Score from "./Input/Score";

export default function ReviewForm2() {
  return (
    <FormWrapper>
      <FormItem>
        <TextLabel>교통점수</TextLabel>
        <div className="body-3">버스, 지하철 등 교통수단 이용이 편리한가요?</div>
        <Score size="xl" />
      </FormItem>
      <FormItem>
        <TextLabel>건물 및 단지 점수</TextLabel>
        <div className="body-3">주차나 보안, 부대시설 등에 만족하시나요?</div>
        <Score size="xl" />
      </FormItem>
      <FormItem>
        <TextLabel>내부 점수</TextLabel>
        <div className="body-3">채광, 환기, 수납, 방음 등에 만족하시나요?</div>
        <Score size="xl" />
      </FormItem>
      <FormItem>
        <TextLabel>주변 및 환경 점수</TextLabel>
        <div className="body-3">치안, 공원 및 자연환경 등에 만족하시나요?</div>
        <Score size="xl" />
      </FormItem>
      <FormItem>
        <TextLabel>생활 및 입지 점수</TextLabel>
        <div className="body-3">
          학군, 식당, 카페, 마트 등 인프라가 잘 갖추어져 있나요?
        </div>
        <Score size="xl" />
      </FormItem>
    </FormWrapper>
  );
}

const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  text-align: center;
`;
const TextLabel = styled.div`
  font-family: "Pretendard";
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 24px;

  margin-bottom: 4px;
`;
const FormItem = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 50px;
`;
