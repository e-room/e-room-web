import styled from "@emotion/styled";
import Image from "next/image";

export default ({ images, onDetailView }) => {
  if (!images) return;
  return (
    <ImgField>
      {images.map((value) => {
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
  );
};

const ImgField = styled.div`
  overflow-x: scroll;
  white-space: nowrap;

  scrollbar-width: none;
  -ms-overflow-style: none;

  display: flex;
  gap: 8px;

  ::-webkit-scrollbar {
    display: none;
  }
`;

const ImageBox = styled(Image)`
  border-radius: 8px;
`;
