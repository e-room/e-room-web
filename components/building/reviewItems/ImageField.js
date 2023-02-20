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
            onClick={() => onDetailView(value.uuid, images)}
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

  ::-webkit-scrollbar {
    display: none;
  }

  > span {
    margin-right: 8px !important;
  }
`;

const ImageBox = styled(Image)`
  border-radius: 8px;
`;
