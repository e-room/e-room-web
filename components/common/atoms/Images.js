import { useCallback, useMemo, useRef } from "react";
import PropTypes from "prop-types";
import shortid from "shortid";
import Image from "next/image";
import styled from "@emotion/styled";
import { Caption1Bold } from "styles/typography";
import Icon from "./Icon";
import XButton from "./XButton";
import { reviewFormState } from "states/reviewAtom";
import { useRecoilState } from "recoil";

export default function Images() {
  const [formValue, setFormValue] = useRecoilState(reviewFormState);
  const { reviewImageList } = formValue;
  console.log(reviewImageList);

  const fileInputRef = useRef(null);

  const onClickHandler = () => {
    fileInputRef.current.click();
  };
  const onChangeHandler = (e) => {
    const fileArr = e.target.files;

    if (reviewImageList.length > 5 || reviewImageList.length + fileArr.length > 5) {
      alert("사진은 최대 5장까지 등록이 가능합니다.");
      return;
    }

    const fileURLs = [];

    for (let i = 0; i < fileArr.length; i++) {
      const file = fileArr[i];
      const reader = new FileReader();
      reader.onload = () => {
        fileURLs[i] = { key: shortid.generate(), view: reader.result, data: file };
        setFormValue({
          ...formValue,
          reviewImageList: [...reviewImageList, ...fileURLs],
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImg = (id) => {
    const imgs = [...reviewImageList];
    const filterData = imgs.filter((v) => v.key !== id);
    setFormValue({
      ...formValue,
      reviewImageList: filterData,
    });
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
          <ImageBox src={val.view} width={102} height={102} objectFit={"cover"} />
        </Box>
      );
    });
  }, [reviewImageList]);

  return (
    <>
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
