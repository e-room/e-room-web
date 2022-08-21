import Text from "../components/Input/Text";
import styled from "@emotion/styled";

export default function ReviewForm1() {
  return (
    <FormWrapper>
      <FormItem>
        <TextLabel>주소</TextLabel>
        <Text placeholder="도로명 주소로 입력해주세요" />
      </FormItem>
      <FormItem>
        <TextLabel>상세주소(호실)</TextLabel>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <Text placeholder="예: 101" width="100px" />
            <div className="body-3" style={{ margin: "0 8px" }}>
              동
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <Text placeholder="예: 301" width="100px" />
            <div className="body-3" style={{ margin: "0 8px" }}>
              호
            </div>
          </div>
        </div>
      </FormItem>
      <FormItem>
        <TextLabel>거주기간</TextLabel>
        <Text />
      </FormItem>
      <FormItem>
        <TextLabel>거주층</TextLabel>
        <Text />
      </FormItem>
      <FormItem>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div>
            <TextLabel>월세</TextLabel>
            <div style={{ display: "flex", alignItems: "center" }}>
              <Text placeholder="예: 50" width="100px" />
              <div className="body-3" style={{ margin: "0 6px" }}>
                만원
              </div>
            </div>
          </div>
          <div>
            <TextLabel>관리비</TextLabel>
            <div style={{ display: "flex", alignItems: "center" }}>
              <Text placeholder="예: 20" width="100px" />
              <div className="body-3" style={{ margin: "0 6px" }}>
                만원
              </div>
            </div>
          </div>
        </div>
      </FormItem>
      <FormItem>
        <TextLabel>집 크기</TextLabel>
        <Text placeholder="예: 6" />
      </FormItem>
    </FormWrapper>
  );
}

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
const FormItem = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 24px;
`;
