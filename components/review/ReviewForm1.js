import { useCallback, useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import dayjs from "dayjs";
import styled from "@emotion/styled";

import { animation_fadeInUp_view } from "styles/keyframes";
import { reviewFormState } from "states/reviewAtom";

import Text from "components/common/atoms/Text";
import Select from "components/common/atoms/Select";
import DaumPostCode from "components/common/atoms/DaumPostCode";
import { Body2Bold, Body3 } from "styles/typography";
import { useRouter } from "next/router";

export default function ReviewForm1() {
  const router = useRouter();
  const { addressQuery, nameQuery } = router.query;

  const [formValue, setFormValue] = useRecoilState(reviewFormState);
  useEffect(() => {
    if (!addressQuery) return;
    setFormValue({
      ...formValue,
      address: {
        ...formValue.address,
        ...JSON.parse(decodeURI(addressQuery)),
      },
      buildingOptionalDto: {
        ...formValue.buildingOptionalDto,
        buildingName: decodeURI(nameQuery) ?? "",
      },
    });
  }, [addressQuery, nameQuery]);

  const [postCodeOpen, setPostCodeOpen] = useState(false);
  const [yearOptions, setYearOptions] = useState([]);
  const now = dayjs().get("year");
  const regex = new RegExp(/^[0-9]+$/);

  const newYear = useCallback(() => {
    const copy = [...yearOptions];
    for (let i = now; i >= 1990; i--) {
      copy.push({ value: i, label: `${i}년` });
    }
    setYearOptions(copy);
  }, []);

  const [residenceStartYear, setResidenceStartYear] = useState({
    value: now,
    label: `${now}년`,
  });

  const onYearChange = (e) => {
    setResidenceStartYear(e);
    setFormValue({
      ...formValue,
      reviewResidencePeriodDto: {
        ...formValue.reviewResidencePeriodDto,
        residenceStartYear: e.value,
      },
    });
  };

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
  };

  const { siDo, siGunGu, roadName, buildingNumber } = formValue.address;
  const { buildingName } = formValue.buildingOptionalDto;
  const addressValue = siDo
    ? buildingName
      ? `${siDo} ${siGunGu} ${roadName} ${buildingNumber} (${buildingName})`
      : `${siDo} ${siGunGu} ${roadName} ${buildingNumber}`
    : "";

  useEffect(() => {
    newYear();
  }, []);

  console.log("plx,,,", formValue.reviewBaseDto.netLeasableArea);

  return (
    <FormWrapper
      onTouchStart={() => {
        if (postCodeOpen) setPostCodeOpen(false);
      }}
      onClick={() => {
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
        <div style={{ display: "flex", flexDirection: "column" }}>
          <TextLabel>거주 시작</TextLabel>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Select
              size={"lg"}
              value={residenceStartYear}
              onChange={onYearChange}
              options={yearOptions}
            />
            <TextUnit>부터</TextUnit>
          </div>
        </div>
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
          type={"text"}
          placeholder={"예: 6"}
          label={"집 크기"}
          unit={"평"}
          width={"100%"}
          onChange={(e) => {
            console.log("wlq zmrl", e.target.value, regex.test(e.target.value));
            // if (!regex.test(e.target.value)) return false;
            setFormValue({
              ...formValue,
              reviewBaseDto: {
                ...formValue.reviewBaseDto,
                netLeasableArea: regex.test(e.target.value)
                  ? e.target.value
                  : "",
              },
            });
          }}
          value={formValue.reviewBaseDto.netLeasableArea}
        />
      </FormItem>
    </FormWrapper>
  );
}

const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  padding-bottom: 80px;

  ${animation_fadeInUp_view}
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
const TextLabel = styled.div`
  ${Body2Bold}

  margin-bottom: 4px;
`;

const TextUnit = styled.div`
  ${Body3}
  white-space: nowrap;
  margin-left: 8px;
  width: 30px;
  min-width: 30px;
`;
