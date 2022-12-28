import Text from "components/common/atoms/Text";
import Select from "components/common/atoms/Select";
import styled from "@emotion/styled";
import DaumPostCode from "components/common/atoms/DaumPostCode";
import { useCallback, useState } from "react";
import { Body2Bold } from "styles/typography";
import { reviewFormState } from "states/reviewAtom";
import { useRecoilState } from "recoil";

export default function ReviewForm1() {
  const [formValue, setFormValue] = useRecoilState(reviewFormState);
  const [postCodeOpen, setPostCodeOpen] = useState(false);

  const onHandleComplete = (data) => {
    setFormValue({
      ...formValue,
      address: {
        ...formValue.address,
        siDo: data.sido,
        siGunGu: data.sigungu,
        eupMyeon: data.bname,
        roadName: data.roadname,
        // buildingNumber: data.,
        buildingOptionalDto: {
          ...formValue.buildingOptionalDto,
          buildingName: data.buildingName,
        },
      },
    });
    // setPostCodeOpen(false);
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

  const addressValue = formValue.address.siDo
    ? `${formValue.address.siDo} ${formValue.address.siGunGu} ${formValue.address.roadName} ${formValue.address.buildingNumber}`
    : "";

  return (
    <FormWrapper
      onTouchStart={() => {
        if (postCodeOpen) setPostCodeOpen(false);
      }}
    >
      <FormItem>
        <TextLabel>주소</TextLabel>
        <Text
          placeholder="도로명 주소로 입력해주세요"
          onClick={() => setPostCodeOpen(true)}
          readOnly={Boolean(formValue.address.siDo)}
          value={addressValue}
        />
        {postCodeOpen && (
          <AddressFrame>
            <DaumPostCode onComplete={onHandleComplete} />
          </AddressFrame>
        )}
      </FormItem>
      {/* 
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      */}
      <FormItem>
        <TextLabel>상세주소(호실)</TextLabel>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <Text
              placeholder={"예: 101"}
              width={100}
              onChange={(e) => {
                setFormValue({
                  ...formValue,
                  roomBaseDto: {
                    ...formValue.roomBaseDto,
                    lineNumber: e.target.value,
                  },
                });
              }}
              value={formValue.roomBaseDto.lineNumber}
              name={"lineNumber"}
            />
            <div className="body-3" style={{ margin: "0 8px" }}>
              동
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center" }}>
            <Text
              placeholder={"예: 301"}
              width={100}
              onChange={(e) => {
                setFormValue({
                  ...formValue,
                  roomBaseDto: {
                    ...formValue.roomBaseDto,
                    roomNumber: e.target.value,
                  },
                });
              }}
              value={formValue.roomBaseDto.roomNumber}
              name={"roomNumber"}
            />
            <div className="body-3" style={{ margin: "0 8px" }}>
              호
            </div>
          </div>
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
            <div style={{ display: "flex", alignItems: "center" }}>
              <Text
                placeholder={"예: 20"}
                width={100}
                onChange={(e) => {
                  setFormValue({
                    ...formValue,
                    reviewResidencePeriodDto: {
                      ...formValue.reviewResidencePeriodDto,
                      residenceDuration: e.target.value,
                    },
                  });
                }}
                value={formValue.reviewResidencePeriodDto.residenceDuration}
                name={"residenceDuration"}
              />
              <div className="body-3" style={{ margin: "0 8px" }}>
                개월
              </div>
            </div>
          </div>
        </div>
      </FormItem>
      <FormItem>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div>
            <TextLabel>월세</TextLabel>
            <div style={{ display: "flex", alignItems: "center" }}>
              <Text
                placeholder={"예: 50"}
                width={100}
                // onChange={onChange}
                // value={value}
                // name={name}
              />
              <div className="body-3" style={{ margin: "0 8px" }}>
                만원
              </div>
            </div>
          </div>
          <div>
            <TextLabel>관리비</TextLabel>
            <div style={{ display: "flex", alignItems: "center" }}>
              <Text
                placeholder={"예: 20"}
                width={100}
                // onChange={onChange}
                // value={value}
                // name={name}
              />
              <div className="body-3" style={{ margin: "0 8px" }}>
                만원
              </div>
            </div>
          </div>
        </div>
      </FormItem>
      <FormItem>
        <TextLabel>보증금</TextLabel>
        {/* <Text placeholder="예: 500" /> */}
        <div style={{ display: "flex", alignItems: "center" }}>
          <Text
            placeholder={"예: 500"}
            width={250}
            // onChange={onChange}
            // value={value}
            // name={name}
          />
          <div className="body-3" style={{ margin: "0 8px" }}>
            만원
          </div>
        </div>
      </FormItem>
      <FormItem>
        <TextLabel>집 크기</TextLabel>
        <div style={{ display: "flex", alignItems: "center" }}>
          <Text
            placeholder={"예: 6"}
            width={250}
            // onChange={onChange}
            // value={value}
            // name={name}
          />
          <div className="body-3" style={{ margin: "0 8px" }}>
            평
          </div>
        </div>
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
  position: relative;
`;

const AddressFrame = styled.div`
  position: absolute;
  z-index: 9;
  width: 100%;
  top: 84px;
`;
