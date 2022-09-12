import PropTypes from "prop-types";
import styled from "@emotion/styled";
import Icon from "../Icon";
import { useRef } from "react";
import { Caption1Bold } from "../../styles/typography";

export default function Image({ multiple = false }) {
  const fileInputRef = useRef(null);

  const onClickHandler = () => {
    fileInputRef.current.click();
  };

  const onChangeHandler = (e) => {
    console.log("onFileChange handler", e);
  };

  return (
    <StyledImageButton onClick={onClickHandler}>
      <Icon icon="plus" size="md" fill={"var(--primary-1"} />
      <Title>사진 추가</Title>
      <input
        type="file"
        id="images"
        multiple={multiple}
        ref={fileInputRef}
        onChange={onChangeHandler}
      />
    </StyledImageButton>
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
