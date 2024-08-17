import React, { useRef, useEffect, useState, useCallback } from "react";

interface ScrollPickerProps {
  list: string[];
  onSelectedChange?: (selected: string) => void;
  ScrollPickerLayout?: React.ElementType;
  ScrollPickerCenter?: React.ElementType;
  ScrollPickerItem?: React.ElementType;
}

const ScrollPicker = ({
  list,
  onSelectedChange,
  ScrollPickerLayout = "ul",
  ScrollPickerCenter = "div",
  ScrollPickerItem = "li",
}: ScrollPickerProps) => {
  const SCROLL_DEBOUNCE_TIME = 100;
  const newList = ["", ...list, ""];
  const ref = useRef<HTMLUListElement>(null);
  const [selected, setSelected] = useState(1);
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const ITEM_HEIGHT = 50;

  const handleScroll = useCallback(() => {
    if (ref.current) {
      clearTimeout(timerRef.current!);
      if (ref.current.scrollTop < ITEM_HEIGHT) {
        ref.current.scrollTop = ITEM_HEIGHT;
      }
      timerRef.current = setTimeout(() => {
        const index = Math.floor(
          (ref.current!.scrollTop + ITEM_HEIGHT / 2) / ITEM_HEIGHT
        );
        if (list[index] !== "") {
          setSelected(index);
          itemRefs.current[index]?.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
          onSelectedChange && onSelectedChange(newList[index]);
        }
      }, SCROLL_DEBOUNCE_TIME);
    }
  }, [onSelectedChange, newList]);

  useEffect(() => {
    if (ref.current) {
      ref.current.scrollTop = selected * ITEM_HEIGHT;
    }
  }, []);

  return (
    <ScrollPickerLayout ref={ref} onScroll={handleScroll}>
      <ScrollPickerCenter />
      {newList.map((item, index) => (
        <ScrollPickerItem
          key={index}
          isSelected={index === selected}
          ref={(el: HTMLLIElement | null) => (itemRefs.current[index] = el)}
        >
          {item}
        </ScrollPickerItem>
      ))}
    </ScrollPickerLayout>
  );
};

export default ScrollPicker;
