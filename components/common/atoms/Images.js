import { useCallback, useMemo, useRef, useState } from "react";
import PropTypes from "prop-types";
import shortid from "shortid";
import Image from "next/image";
import Icon from "./Icon";
import XButton from "./XButton";
import { reviewImageListState } from "states/reviewAtom";
import { useRecoilState } from "recoil";
import Toast from "./Toast";

export default function Images() {
  const [reviewImageList, setReviewImageList] =
    useRecoilState(reviewImageListState);

  const [toastParam, setToastParam] = useState({ visible: false, type: null });
  const toast = useMemo(() => {
    const toastOptions = {
      max: {
        type: "success",
        text: "사진을 모두 등록했어요.",
      },
      over: {
        type: "danger",
        text: "사진은 최대 5장까지 등록할 수 있어요.",
      },
    };
    if (toastParam.visible) {
      return (
        <Toast
          type={toastOptions[toastParam.type]?.type}
          text={toastOptions[toastParam.type]?.text}
          visible={toastParam.visible}
        />
      );
    }
  }, [toastParam]);

  const fileInputRef = useRef(null);

  const onClickHandler = () => {
    if (reviewImageList.length >= 5) {
      return setToastParam({ visible: true, type: "over" });
    } else {
      fileInputRef.current.click();
    }
  };
  const onChangeHandler = (e) => {
    let fileArr = e.target.files;

    if (reviewImageList.length + fileArr.length === 5) {
      setToastParam({ visible: true, type: "max" });
    }

    if (
      reviewImageList.length > 5 ||
      reviewImageList.length + fileArr.length > 5
    ) {
      setToastParam({ visible: true, type: "over" });
    }

    const fileURLs = [];

    for (let i = 0; i < fileArr.length; i++) {
      if (i > 4 - reviewImageList.length) {
        return;
      }

      const file = fileArr[i];

      const reader = new FileReader();
      reader.onload = () => {
        fileURLs[i] = {
          key: shortid.generate(),
          view: reader.result,
          data: file,
        };
        setReviewImageList([...reviewImageList, ...fileURLs]);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImg = (id) => {
    const imgs = [...reviewImageList];
    const filterData = imgs.filter((v) => v.key !== id);
    setReviewImageList(filterData);
  };

  const Preview = useCallback(() => {
    if (!reviewImageList) return;
    return reviewImageList.map((val) => {
      if (!val) return;
      return (
        <div className="relative" key={val.key}>
          <div className="absolute right-[-9px] top-[-9px] z-[2]">
            <XButton onClick={() => removeImg(val.key)} />
          </div>
          <Image
            src={val.view}
            width={102}
            height={102}
            objectFit={"cover"}
            className="rounded-[4px]"
          />
        </div>
      );
    });
  }, [reviewImageList]);

  return (
    <>
      {toast}
      <div
        className="flex flex-col justify-center items-center w-[102px] h-[102px] bg-white border border-primary-1 rounded-[4px] cursor-pointer"
        onClick={onClickHandler}
      >
        <Icon icon="plus" size="md" fill="fill-primary-1" />
        <div className="text-caption-bold-1 text-primary-1 mt-[4px]">
          사진 추가
        </div>
        <input
          type="file"
          multiple={true}
          ref={fileInputRef}
          onChange={onChangeHandler}
          className={"hidden"}
        />
      </div>
      {Preview()}
    </>
  );
}

Images.propTypes = {
  multiple: PropTypes.bool,
};
