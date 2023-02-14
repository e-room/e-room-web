import styled from "@emotion/styled";
import { useSetRecoilState } from "recoil";
import { imageViewState } from "states/buidlingAtom";
import { Body1Bold } from "styles/typography";
import Image from "next/image";

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
            <ImageBox
              src={value.url}
              key={value.uuid}
              width={117}
              height={117}
              objectFit={"cover"}
              onClick={onDetailView}
            />
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

  // TODO: 사진 가로 스크롤 기능...
  /* display: flex; */
  /* gap: 8px; */

  ::-webkit-scrollbar {
    display: none;
  }
`;

const ImageBox = styled(Image)`
  border-radius: 8px;
  margin-right: 8px !important;
`;
