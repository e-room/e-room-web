import PropTypes from "prop-types";
import styled from "@emotion/styled";
import Icon from "../atoms/Icon";
import { useRef, useState } from "react";
import { Caption1Bold } from "../../../styles/typography";

export default function Image({ multiple = false }) {
  const fileInputRef = useRef(null);

  const [previewImgs, setPreviewImgs] = useState([]);

  const onClickHandler = () => {
    fileInputRef.current.click();
  };

  const onChangeHandler = (e) => {
    const fileArr = e.target.files; //  사용자가 선택한 파일들
    // setPostImages(Array.from(fileArr)); //
    const fileURLs = [];
    const filesLength = fileArr.length > 5 ? 5 : fileArr.length; // 최대 5개

    for (let i = 0; i < filesLength; i++) {
      const file = fileArr[i];
      const reader = new FileReader();
      reader.onload = () => {
        fileURLs[i] = reader.result;
        setPreviewImgs([...fileURLs]);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <StyledImageButton onClick={onClickHandler}>
        <Icon icon="plus" size="md" fill={"var(--primary-1"} />
        <Title>사진 추가</Title>
        <input
          type="file"
          id="images"
          multiple={true}
          ref={fileInputRef}
          onChange={onChangeHandler}
        />
      </StyledImageButton>
      {previewImgs &&
        previewImgs.map((val) => {
          return <ImageBox src={val} key={val} />;
        })}
    </>
  );
}

Image.propTypes = {
  multiple: PropTypes.bool,
};

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
