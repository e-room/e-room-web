import styled from "@emotion/styled";
import { Body2Bold } from "styles/typography";
import Image from "components/common/atoms/Image";

export default function ReviewForm4() {
  return (
    <FormWrapper>
      <TextLabel>
        자취방 사진 <span>(선택)</span>
      </TextLabel>
      <div className="body-3">
        자취방이나 건물에 대한 사진을 올려주세요.
        <br />
        최대 5장까지 올릴 수 있어요.
      </div>
      <ImageBox>
        <Image />
      </ImageBox>
    </FormWrapper>
  );
}

const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
`;
const TextLabel = styled.div`
  ${Body2Bold}

  margin-bottom: 4px;

  span {
    color: var(--gray-2);
  }
`;

const ImageBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 24px;
`;
