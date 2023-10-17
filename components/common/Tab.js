import { useState, useCallback } from "react";
import TabOption from "./atoms/TabOption";

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
