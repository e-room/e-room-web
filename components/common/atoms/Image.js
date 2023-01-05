import PropTypes from "prop-types";
import styled from "@emotion/styled";
import Icon from "../atoms/Icon";
import { useMemo, useRef, useState } from "react";
import { Caption1Bold } from "styles/typography";
import XButton from "./XButton";
import shortid from "shortid";

export default function Image(props) {
  const { multiple = false, setFiles, files } = props;

  const fileInputRef = useRef(null);

  const [previewImgs, setPreviewImgs] = useState([]);
  const onClickHandler = () => {
    fileInputRef.current.click();
  };

  const onChangeHandler = (e) => {
    const fileArr = e.target.files;

    if (previewImgs.length > 5 || previewImgs.length + fileArr.length > 5) {
      alert("사진은 최대 5장까지 등록이 가능합니다.");
      return;
    }

    console.log(fileArr);
    setFiles([...files, ...fileArr]);

    const fileURLs = [];

    for (let i = 0; i < fileArr.length; i++) {
      const file = fileArr[i];
      const reader = new FileReader();
      reader.onload = () => {
        fileURLs[i] = { key: shortid.generate(), data: reader.result };
        setPreviewImgs([...previewImgs, ...fileURLs]);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImg = (id) => {
    const imgs = [...previewImgs];
    const filterData = imgs.filter((v) => v.key !== id);
    setPreviewImgs(filterData);
    const list = [...files];
    const filterList = list.filter((v) => v.name);
  };

  const Preview = useMemo(() => {
    if (!previewImgs) return;
    return previewImgs.map((val) => {
      return (
        <Box key={val.key}>
          <ButtonBox>
            <XButton onClick={() => removeImg(val.key)} />
          </ButtonBox>
          <ImageBox src={val.data} />
        </Box>
      );
    });
  }, [previewImgs]);

  // TODO: 모바일 화면일 때 xButton 클릭 시 영역범위가 이상함..?
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
        />
      </StyledImageButton>
      {Preview}
    </>
  );
}

Image.propTypes = {
  multiple: PropTypes.bool,
};

const Box = styled.div`
  position: relative;
`;

const ButtonBox = styled.div`
  position: absolute;
  right: -9px;
  top: -9px;
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

  input {
    display: none;
  }
`;

const Title = styled.div`
  ${Caption1Bold}

  color: var(--primary-1);

  margin-top: 4px;
`;

const ImageBox = styled.img`
  width: 102px;
  height: 102px;
  border-radius: 4px;
`;
