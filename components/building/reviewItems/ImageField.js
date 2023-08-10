import Image from "next/image";

export default ({ images, onDetailView, authorName }) => {
  if (!images) return;

  return (
    <div className="overflow-x-scroll whitespace-nowrap no-scrollbar gap-[8px]">
      {images.map((value) => {
        return (
          <div className="mr-[8px]">
            <Image
              src={`${process.env.NEXT_PUBLIC_PROTOCOL}://` + value.url}
              key={value.uuid}
              width={117}
              height={117}
              className="rounded-[8px] cursor-pointer"
              objectFit={"cover"}
              onClick={() => onDetailView(value.uuid, images, authorName)}
            />
          </div>
        );
      })}
    </div>
  );
};
