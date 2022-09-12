import Text from "../components/Input/Text";
import Select from "../components/Input/Select";
import styled from "@emotion/styled";
import DaumPostCode from "./DaumPostCode";
import { useState } from "react";
import { Body2Bold } from "../styles/typography";

export default function ReviewForm1() {
  const [postCodeOpen, setPostCodeOpen] = useState(false);
  const onHandleComplete = (data) => {
    console.log("data", data);
  };

  return (
    <FormWrapper>
      <FormItem>
        <TextLabel>주소</TextLabel>
        <Text
          placeholder="도로명 주소로 입력해주세요"
          onClick={() => setPostCodeOpen(true)}
        />
        {postCodeOpen ? <DaumPostCode onComplete={onHandleComplete} /> : ""}
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
        <Select
          items={[
            { value: 2022, label: "2022년" },
            { value: 2021, label: "2021년" },
            { value: 2020, label: "2020년" },
            { value: 2019, label: "2019년" },
            { value: 2018, label: "2018년" },
          ]}
        />
      </FormItem>
      <FormItem>
        <TextLabel>거주층</TextLabel>
        <Select
          items={[
            { value: "low", label: "저층" },
            { value: "middle", label: "중층" },
            { value: "high", label: "고층" },
          ]}
        />
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
  ${Body2Bold}

  margin-bottom: 4px;
`;
const FormItem = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 24px;
`;
