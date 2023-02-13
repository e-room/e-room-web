import styled from "@emotion/styled";

export default ({ images, onDetailView }) => {
  return (
    <ImgField>
      {images.map((value) => {
        return (
          <ImgCard src={value.src} key={value.src} onClick={onDetailView} />
        );
      })}
    </ImgField>
  );
};

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
