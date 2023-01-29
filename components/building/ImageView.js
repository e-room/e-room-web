import styled from "@emotion/styled";
import { useSetRecoilState } from "recoil";
import { imageViewState } from "states/buidlingAtom";
import { Body1Bold } from "styles/typography";
import flower1 from "./dummyImg/1.jpg";
import flower2 from "./dummyImg/2.jpg";
import flower3 from "./dummyImg/3.jpg";
import flower4 from "./dummyImg/4.jpg";
import flower5 from "./dummyImg/5.jpg";
import flower6 from "./dummyImg/6.jpg";

export const dummyImages = [
  flower1,
  flower2,
  flower3,
  flower4,
  flower5,
  flower6,
];
export default function ImageView({ data }) {
  const setShowDetail = useSetRecoilState(imageViewState);

  const onDetailView = () => {
    setShowDetail(true);
  };

  return (
    <Container>
      <Title>사진 모아보기</Title>
      <ImgField>
        {data.map((value) => {
          return (
            <ImgCard src={value.url} key={value.uuid} onClick={onDetailView} />
          );
        })}
      </ImgField>
    </Container>
  );
}

const Container = styled.div`
  padding: 12px 0px 12px 20px;
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
