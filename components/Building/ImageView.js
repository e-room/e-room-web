import styled from "@emotion/styled";
import { Body1Bold } from "../../styles/typography";
import flower1 from "./1.jpg";
import flower2 from "./2.jpg";
import flower3 from "./3.jpg";
import flower4 from "./4.jpg";
import flower5 from "./5.jpg";
import flower6 from "./6.jpg";

export default function ImageView() {
  const images = [flower1, flower2, flower3, flower4, flower5, flower6];
  return (
    <Container>
      <Title>사진 모아보기</Title>
      <ImgField>
        {images.map((value) => {
          return <ImgCard src={value.src} key={value.src} />;
        })}
      </ImgField>
    </Container>
  );
}

const Container = styled.div`
  padding: 12px 20px;
  background: #fafafa;
`;

const Title = styled.div`
  ${Body1Bold}

  color: var(--black);
  margin-bottom: 12px;
`;

const ImgField = styled.div`
  overflow-x: scroll;
  white-space: nowrap;

  scrollbar-width: none;
  -ms-overflow-style: none;

  ::-webkit-scrollbar {
    display: none;
  }
`;

const ImgCard = styled.img`
  width: 117px;
  height: 117px;
  border-radius: 8px;
  margin-right: 8px;
`;
