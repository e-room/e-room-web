import Icon from "components/common/atoms/Icon";

export default function MenuItem({ titleIcon, title, onClick }) {
  return (
    <div
      className="flex justify-between bg-white py-[16px] px-[20px] cursor-pointer"
      onClick={onClick}
    >
      <div className="text-body-bold-2 text-black flex gap-[16px] items-center">
        {titleIcon && <Icon icon={titleIcon} size="sm" fill="fill-gray-3" />}
        {title}
      </div>
      <Icon icon={"arrow-right"} size={"md"} fill="fill-gray-3" />
    </div>
  );
}
