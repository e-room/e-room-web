import { useCallback, useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import dayjs from "dayjs";

import { reviewFormState } from "states/reviewAtom";

import Text from "components/common/atoms/Text";
import Select from "components/common/atoms/Select";
import DaumPostCode from "components/common/atoms/DaumPostCode";
import logEvent from "amplitude/logEvent";

export default function ReviewForm1() {
  const [formValue, setFormValue] = useRecoilState(reviewFormState);
  useEffect(() => {
    const address = JSON.parse(sessionStorage.getItem("buildingQuery"));
    if (!address) return;
    setFormValue({
      ...formValue,
      address: {
        ...formValue.address,
        ...JSON.parse(decodeURI(address.address)),
      },
      buildingOptionalDto: {
        ...formValue.buildingOptionalDto,
        buildingName: decodeURI(address.name) ?? "",
      },
    });
  }, []);

  const regex = new RegExp(/^[0-9]+$/);
  const now = dayjs().get("year");

  const [postCodeOpen, setPostCodeOpen] = useState(false);
  const [yearOptions, setYearOptions] = useState([]);
  const newYear = useCallback(() => {
    const copy = [...yearOptions];
    for (let i = now; i >= 1990; i--) {
      copy.push({ value: i });
    }
    setYearOptions(copy);
  }, []);

  const onYearChange = (e) => {
    setFormValue({
      ...formValue,
      reviewResidencePeriodDto: {
        ...formValue.reviewResidencePeriodDto,
        residenceStartYear: e.value,
      },
    });
  };

  useEffect(() => {
    logEvent({ name: "view-review_write" });
    newYear();
  }, []);

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

  const formItemClassName = "mb-[24px] relative";
  const gridItemClassName =
    "grid grid-cols-2 gap-x-[16px] items-end mb-[24px] relative";

  return (
    <div
      className="animate-page-up flex flex-col px-[20px] pt-[20px] pb-[80px] bg-white"
      onTouchStart={() => {
        if (postCodeOpen) setPostCodeOpen(false);
      }}
      onClick={() => {
        if (postCodeOpen) setPostCodeOpen(false);
      }}
    >
      <div className={formItemClassName}>
        <Text
          placeholder="도로명 주소로 입력해주세요"
          label={"주소"}
          onClick={() => setPostCodeOpen(true)}
          readOnly={true}
          value={addressValue}
          width={"100%"}
        />
        {postCodeOpen && (
          <div className="absolute z-[9] w-full top-[84px]">
            <DaumPostCode onComplete={onHandleComplete} />
          </div>
        )}
      </div>
      <div className={gridItemClassName}>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div className="text-body-bold-2 mb-[4px]">거주 시작</div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Select
              size={"lg"}
              value={formValue.reviewResidencePeriodDto.residenceStartYear}
              onChange={onYearChange}
              options={yearOptions}
            />
            <div className="text-body-3 ml-[8px] w-[30px] min-w-[30px] whitespace-nowrap">
              부터
            </div>
          </div>
        </div>
        <Text
          type={"text"}
          placeholder={"예: 20"}
          label={"거주 기간"}
          unit={"개월"}
          width={"100%"}
          onChange={(e) => {
            setFormValue({
              ...formValue,
              reviewResidencePeriodDto: {
                ...formValue.reviewResidencePeriodDto,
                residenceDuration: regex.test(e.target.value)
                  ? Number(e.target.value)
                  : "",
              },
            });
          }}
          value={formValue.reviewResidencePeriodDto.residenceDuration}
          name={"residenceDuration"}
        />
      </div>
      <div className={gridItemClassName}>
        <Text
          type={"text"}
          placeholder={"예: 50"}
          label={"월세"}
          unit={"만원"}
          width={"100%"}
          onChange={(e) => {
            setFormValue({
              ...formValue,
              reviewBaseDto: {
                ...formValue.reviewBaseDto,
                monthlyRent: regex.test(e.target.value)
                  ? Number(e.target.value)
                  : "",
              },
            });
          }}
          value={formValue.reviewBaseDto.monthlyRent}
        />
        <Text
          type={"text"}
          placeholder={"예: 20"}
          label={"관리비"}
          unit={"만원"}
          width={"100%"}
          onChange={(e) => {
            setFormValue({
              ...formValue,
              reviewBaseDto: {
                ...formValue.reviewBaseDto,
                managementFee: regex.test(e.target.value)
                  ? Number(e.target.value)
                  : "",
              },
            });
          }}
          value={formValue.reviewBaseDto.managementFee}
        />
      </div>
      <div className={formItemClassName}>
        <Text
          type={"text"}
          placeholder={"예: 500"}
          label={"보증금"}
          unit={"만원"}
          width={"100%"}
          onChange={(e) => {
            setFormValue({
              ...formValue,
              reviewBaseDto: {
                ...formValue.reviewBaseDto,
                deposit: regex.test(e.target.value)
                  ? Number(e.target.value)
                  : "",
              },
            });
          }}
          value={formValue.reviewBaseDto.deposit}
        />
      </div>
      <div className={formItemClassName}>
        <Text
          type={"text"}
          placeholder={"예: 6"}
          label={"집 크기"}
          unit={"평"}
          width={"100%"}
          onChange={(e) => {
            setFormValue({
              ...formValue,
              reviewBaseDto: {
                ...formValue.reviewBaseDto,
                netLeasableArea: regex.test(e.target.value)
                  ? Number(e.target.value)
                  : "",
              },
            });
          }}
          value={formValue.reviewBaseDto.netLeasableArea}
        />
      </div>
    </div>
  );
}
