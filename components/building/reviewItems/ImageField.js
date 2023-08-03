import Image from "next/image";

export default ({ images, onDetailView, authorName }) => {
  if (!images) return;
  //
  // > span {
  //   margin-right: 8px !important;
  // }
  return (
    <div className="overflow-x-scroll whitespace-nowrap no-scrollbar gap-[8px]">
      {images.map((value) => {
        return (
          <Image
            src={value.url}
            key={value.uuid}
            width={117}
            height={117}
            className="rounded-[8px] cursor-pointer"
            objectFit={"cover"}
            onClick={() => onDetailView(value.uuid, images, authorName)}
          />
        );
      })}
    </div>
  );
};
