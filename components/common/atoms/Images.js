import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import PropTypes from "prop-types";
import shortid from "shortid";
import Image from "next/image";
import styled from "@emotion/styled";
import { Caption1Bold } from "styles/typography";
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
    if (!toastParam.visible) return;
    const toastOptions = {
      max: {
        icon: "check-circle",
        iconColor: "success",
        text: "사진을 모두 등록했어요.",
      },
      over: {
        icon: "exclamation-circle",
        iconColor: "caution",
        text: "사진은 최대 5장까지 등록할 수 있어요.",
      },
    };
    return (
      <Toast
        icon={toastOptions[toastParam.type]?.icon}
        iconColor={toastOptions[toastParam.type]?.iconColor}
        text={toastOptions[toastParam.type]?.text}
        visible={toastParam.visible}
      />
    );
  }, [toastParam]);

  const fileInputRef = useRef(null);

  const onClickHandler = () => {
    if (reviewImageList.length > 5) {
      return setToastParam({ visible: true, type: "over" });
    }
    fileInputRef.current.click();
  };
  const onChangeHandler = (e) => {
    let fileArr = e.target.files;
    console.log("real", fileArr);
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

    console.log("fileArr", fileArr);

    for (let i = 0; i < fileArr.length; i++) {
      if (i > 4) return;
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
        <Box key={val.key}>
          <ButtonBox>
            <XButton onClick={() => removeImg(val.key)} />
          </ButtonBox>
          <ImageBox
            src={val.view}
            width={102}
            height={102}
            objectFit={"cover"}
          />
        </Box>
      );
    });
  }, [reviewImageList]);

  useEffect(() => {
    if (toastParam.visible) {
      setTimeout(() => {
        setToastParam({ visible: false, type: null });
      }, 3000);
    }
  }, [toastParam.visible]);

  return (
    <>
      {toast}
      <StyledImageButton onClick={onClickHandler}>
        <Icon icon="plus" size="md" fill={"var(--primary-1"} />
        <Title>사진 추가</Title>
        <input
          type="file"
          multiple={true}
          ref={fileInputRef}
          onChange={onChangeHandler}
          className={"d-none"}
        />
      </StyledImageButton>
      {Preview()}
    </>
  );
}

Images.propTypes = {
  multiple: PropTypes.bool,
};

const Box = styled.div`
  position: relative;
`;

const ButtonBox = styled.div`
  position: absolute;
  right: -9px;
  top: -9px;
  z-index: 2;
`;

const StyledImageButton = styled.button`
  width: 102px;
  height: 102px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  background: var(--white);

  border: 1px solid var(--primary-1);
  border-radius: 4px;

  .d-none {
    display: none;
  }
`;

const Title = styled.div`
  ${Caption1Bold}

  color: var(--primary-1);

  margin-top: 4px;
`;

const ImageBox = styled(Image)`
  border-radius: 4px;
`;
