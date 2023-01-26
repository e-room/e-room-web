import Text from "components/common/atoms/Text";
import Select from "components/common/atoms/Select";
import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";
import DaumPostCode from "components/common/atoms/DaumPostCode";
import { useState } from "react";
import { reviewFormState } from "states/reviewAtom";
import { useRecoilState } from "recoil";

export default function ReviewForm1() {
  const [formValue, setFormValue] = useRecoilState(reviewFormState);
  const [postCodeOpen, setPostCodeOpen] = useState(false);

  const onHandleComplete = (data) => {
    const roadAddressArray = data.roadAddress.split(" ");
    const buildingNumber = roadAddressArray[roadAddressArray.length - 1];
    setFormValue({
      ...formValue,
      address: {
        ...formValue.address,
        siDo: data.sido,
        siGunGu: data.sigungu,
        eupMyeon: data.bname,
        roadName: data.roadname,
        buildingNumber: buildingNumber,
      },
      buildingOptionalDto: {
        ...formValue.buildingOptionalDto,
        buildingName: data.buildingName,
      },
    });
    // setPostCodeOpen(false);
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
        <Text
          placeholder="도로명 주소로 입력해주세요"
          label={"주소"}
          onClick={() => setPostCodeOpen(true)}
          readOnly={true}
          value={addressValue}
          width={"100%"}
        />
        {postCodeOpen && (
          <AddressFrame>
            <DaumPostCode onComplete={onHandleComplete} />
          </AddressFrame>
        )}
      </FormItem>
      <GridItem>
        <Text
          type={"number"}
          placeholder={"예: 101"}
          label={"상세주소(호실)"}
          unit={"동"}
          width={"100%"}
          onChange={(e) => {
            setFormValue({
              ...formValue,
              roomBaseDto: {
                ...formValue.roomBaseDto,
                lineNumber: Number(e.target.value),
              },
            });
          }}
          value={formValue.roomBaseDto.lineNumber}
          name={"lineNumber"}
        />
        <Text
          type={"number"}
          placeholder={"예: 301"}
          unit={"호"}
          width={"100%"}
          onChange={(e) => {
            setFormValue({
              ...formValue,
              roomBaseDto: {
                ...formValue.roomBaseDto,
                roomNumber: Number(e.target.value),
              },
            });
          }}
          value={formValue.roomBaseDto.roomNumber}
          name={"roomNumber"}
        />
      </GridItem>
      <GridItem>
        {/* TODO: select onblur시 옵션 숨김 */}
        <Select
          placeholder={"예: 2022"}
          label={"거주 시작"}
          unit={"부터"}
          width={"100%"}
          value={formValue.reviewResidencePeriodDto.residenceStartYear}
          onChange={(e) => {
            setFormValue({
              ...formValue,
              reviewResidencePeriodDto: {
                ...formValue.reviewResidencePeriodDto,
                residenceStartYear: e.value,
              },
            });
          }}
          items={[
            { value: 2022, label: "2022년" },
            { value: 2021, label: "2021년" },
            { value: 2020, label: "2020년" },
            { value: 2019, label: "2019년" },
            { value: 2018, label: "2018년" },
          ]}
        />
        <Text
          type={"number"}
          placeholder={"예: 20"}
          label={"거주 기간"}
          unit={"개월"}
          width={"100%"}
          onChange={(e) => {
            setFormValue({
              ...formValue,
              reviewResidencePeriodDto: {
                ...formValue.reviewResidencePeriodDto,
                residenceDuration: Number(e.target.value),
              },
            });
          }}
          value={formValue.reviewResidencePeriodDto.residenceDuration}
          name={"residenceDuration"}
        />
      </GridItem>
      <GridItem>
        <Text
          type={"number"}
          placeholder={"예: 50"}
          label={"월세"}
          unit={"만원"}
          width={"100%"}
          onChange={(e) => {
            setFormValue({
              ...formValue,
              reviewBaseDto: {
                ...formValue.reviewBaseDto,
                monthlyRent: Number(e.target.value),
              },
            });
          }}
          value={formValue.reviewBaseDto.monthlyRent}
        />
        <Text
          type={"number"}
          placeholder={"예: 20"}
          label={"관리비"}
          unit={"만원"}
          width={"100%"}
          onChange={(e) => {
            setFormValue({
              ...formValue,
              reviewBaseDto: {
                ...formValue.reviewBaseDto,
                managementFee: Number(e.target.value),
              },
            });
          }}
          value={formValue.reviewBaseDto.managementFee}
        />
      </GridItem>
      <FormItem>
        <Text
          type={"number"}
          placeholder={"예: 500"}
          label={"보증금"}
          unit={"만원"}
          width={"100%"}
          onChange={(e) => {
            setFormValue({
              ...formValue,
              reviewBaseDto: {
                ...formValue.reviewBaseDto,
                deposit: Number(e.target.value),
              },
            });
          }}
          value={formValue.reviewBaseDto.deposit}
        />
      </FormItem>
      <FormItem>
        <Text
          type={"number"}
          placeholder={"예: 6"}
          label={"집 크기"}
          unit={"평"}
          width={"100%"}
          onChange={(e) => {
            setFormValue({
              ...formValue,
              reviewBaseDto: {
                ...formValue.reviewBaseDto,
                netLeasableArea: Number(e.target.value),
              },
            });
          }}
          value={formValue.reviewBaseDto.netLeasableArea}
        />
      </FormItem>
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
  margin-bottom: 40px;
  animation: ${fadeInUp} 0.56s ease-in-out;
`;

const FormItem = styled.div`
  margin-bottom: 24px;
  position: relative;
`;

const AddressFrame = styled.div`
  position: absolute;
  z-index: 9;
  width: 100%;
  top: 84px;
`;

const GridItem = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 16px;
  align-items: end;

  margin-bottom: 24px;
  position: relative;
`;
