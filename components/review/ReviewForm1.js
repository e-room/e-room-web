import Text from "components/common/atoms/Text";
import Select from "components/common/atoms/Select";
import styled from "@emotion/styled";
import DaumPostCode from "components/common/atoms/DaumPostCode";
import { useState } from "react";
import { Body2Bold } from "styles/typography";

export default function ReviewForm1() {
  const [postCodeOpen, setPostCodeOpen] = useState(false);
  const onHandleComplete = (data) => {
    console.log("data", data);
  };

  const TextField = (props) => {
    const { placeholder, width, label } = props;
    return (
      <div style={{ display: "flex", alignItems: "center" }}>
        <Text placeholder={placeholder} width={width} />
        <div className="body-3" style={{ margin: "0 8px" }}>
          {label}
        </div>
      </div>
    );
  };

  const SelectField = (props) => {
    const { items, width, label } = props;
    return (
      <div style={{ display: "flex", alignItems: "center" }}>
        <Select items={items} defaultValue={"2022"} width={100} />
        <div className="body-3" style={{ margin: "0 8px" }}>
          {label}
        </div>
      </div>
    );
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
          <TextField placeholder={"예: 101"} width="100px" label={"동"} />
          <TextField placeholder={"예: 301"} width="100px" label={"호"} />
        </div>
      </FormItem>
      <FormItem>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div>
            <TextLabel>거주 시작</TextLabel>
            <SelectField
              items={[
                { value: 2022, label: "2022년" },
                { value: 2021, label: "2021년" },
                { value: 2020, label: "2020년" },
                { value: 2019, label: "2019년" },
                { value: 2018, label: "2018년" },
              ]}
              label={"부터"}
            />
          </div>
          <div>
            <TextLabel>거주기간</TextLabel>
            <TextField placeholder={"예: 20"} width="100px" label={"개월"} />
          </div>
        </div>
      </FormItem>
      <FormItem>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div>
            <TextLabel>월세</TextLabel>
            <TextField placeholder={"예: 50"} width="100px" label={"만원"} />
          </div>
          <div>
            <TextLabel>관리비</TextLabel>
            <TextField placeholder={"예: 20"} width="100px" label={"만원"} />
          </div>
        </div>
      </FormItem>
      <FormItem>
        <TextLabel>보증금</TextLabel>
        {/* <Text placeholder="예: 500" /> */}
        <TextField placeholder={"예: 500"} width="250px" label={"만원"} />
      </FormItem>
      <FormItem>
        <TextLabel>집 크기</TextLabel>
        <TextField placeholder={"예: 6"} width="250px" label={"평"} />
      </FormItem>
    </FormWrapper>
  );
}

const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  margin-bottom: 40px;
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
