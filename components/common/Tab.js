import TabOption from "./atoms/TabOption";

//TODO: 옵션 여러개일 때 스크롤 + 그림자 생기도록 만들기
/**
 * style = "primary" 또는 "secondary"
 *
 * size = "large" 또는 "medium"
 */
export default function Tab({
  options,
  index = 0,
  style = "primary",
  size = "large",
  onIndexChange,
}) {
  return (
    <div className="sticky top-[44px] z-10 flex bg-white px-5 justify-between gap-2">
      {options.map((option, i) => (
        <TabOption
          key={i}
          label={option.label}
          value={option.value}
          status={index === i ? style + "_select" : "default"}
          size={size}
          onClick={() => onIndexChange(i)}
        />
      ))}
    </div>
  );
}
