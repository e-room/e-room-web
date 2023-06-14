import { useRecoilState } from "recoil";

import { reviewFormState } from "states/reviewAtom";
import { KEYWORD_STATES } from "codes/codeType";

import TextArea from "components/common/atoms/TextArea";
import Toggle from "components/common/atoms/Toggle";

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
    <div className="animate-page-up flex flex-col px-[20px] pt-[20px] pb-[144px] bg-white">
      <div className="text-body-bold-2 mb-[4px] flex">장점 키워드</div>
      <div className="flex flex-wrap">
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
      </div>
      <div className="text-body-bold-2 mb-[4px] flex mt-[20px]">
        장점 설명
        <div className="text-body-2 text-gray-2 ml-[4px]">(50자 이상)</div>
      </div>

      <TextArea
        placeholder="장점 키워드에 대한 설명을 적어주세요!"
        height={168}
        caption={"50자 이상 입력해주세요."}
        count={50}
        countUnit={"자"}
        onChange={(e) => {
          setFormValue({
            ...formValue,
            advantageDescription: e.target.value,
          });
        }}
        value={formValue.advantageDescription}
      />
      <div className="text-body-bold-2 mb-[4px] flex mt-[32px]">
        단점 키워드
      </div>
      <div className="flex flex-wrap">
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
      </div>
      <div className="text-body-bold-2 mb-[4px] flex mt-[20px]">
        단점 설명
        <div className="text-body-2 text-gray-2 ml-[4px]">(50자 이상)</div>
      </div>
      <TextArea
        placeholder="단점 키워드에 대한 설명을 적어주세요!"
        height={168}
        caption={"50자 이상 입력해주세요."}
        count={50}
        countUnit={"자"}
        onChange={(e) => {
          setFormValue({
            ...formValue,
            disadvantageDescription: e.target.value,
          });
        }}
        value={formValue.disadvantageDescription}
      />
    </div>
  );
}
