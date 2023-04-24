import styled from "@emotion/styled";

import { animation_fadeInUp_view } from "styles/keyframes";
import { Body2, Body2Bold, Body3 } from "styles/typography";

import Images from "components/common/atoms/Images";

export default function ReviewForm4() {
  return (
    <FormWrapper>
      <TextLabel>
        자취방 사진<Sub>(선택)</Sub>
      </TextLabel>
      <Description>
        자취방이나 건물에 대한 사진을 올려주세요.
        <br />
        최대 5장까지 올릴 수 있어요.
      </Description>
      <ImageBox>
        <Images />
      </ImageBox>
    </FormWrapper>
  );
}

const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  background-color: var(--white);

  ${animation_fadeInUp_view}
`;
const TextLabel = styled.div`
  ${Body2Bold}

  margin-bottom: 4px;
  display: flex;
`;

const Sub = styled.div`
  ${Body2}
  color: var(--gray-2);
  margin-left: 4px;
`;

const Description = styled.div`
  ${Body3}
`;

const ImageBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 24px;
`;
