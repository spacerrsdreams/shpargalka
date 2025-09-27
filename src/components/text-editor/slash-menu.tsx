import React, { forwardRef, useEffect, useImperativeHandle, useState } from "react";

import { slashMenuItems, type MenuItem } from "@/components/text-editor/config/slash-menu/slash-menu-items";
import { Button } from "@/components/ui/button";

interface SlashMenuProps {
  query?: string;
  command: (item: MenuItem) => void;
}

interface SlashMenuRef {
  onKeyDown: ({ event }: { event: KeyboardEvent }) => boolean;
}

interface KeyDownProps {
  event: KeyboardEvent;
}

export const SlashMenu = forwardRef<SlashMenuRef, SlashMenuProps>((props, ref) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [filteredItems, setFilteredItems] = useState<MenuItem[]>(slashMenuItems);

  useImperativeHandle(ref, () => ({
    onKeyDown: ({ event }: KeyDownProps): boolean => {
      if (event.key === "ArrowUp") {
        event.preventDefault();
        setSelectedIndex((selectedIndex + filteredItems.length - 1) % filteredItems.length);

        return true;
      }

      if (event.key === "ArrowDown") {
        event.preventDefault();
        setSelectedIndex((selectedIndex + 1) % filteredItems.length);

        return true;
      }

      if (event.key === "Enter") {
        event.preventDefault();
        selectItem(selectedIndex);

        return true;
      }

      return false;
    },
  }));

  useEffect(() => {
    const query = props.query?.toLowerCase() ?? "";
    const filtered = slashMenuItems.filter((item) => item.title.toLowerCase().includes(query));

    setFilteredItems(filtered);
    setSelectedIndex(0);
  }, [props.query]);

  const selectItem = (index: number): void => {
    const item = filteredItems[index];

    if (item) {
      props.command(item);
    }
  };

  const noResults = filteredItems.length === 0;

  return (
    <div className="bg-background flex max-h-64 w-40 flex-col gap-2 overflow-y-auto rounded-lg border p-2 shadow-lg">
      {noResults && <div className="px-4 py-4 text-center text-sm text-gray-500">No results found</div>}

      {filteredItems.map((item, index) => (
        <Button key={item.title} variant="ghost" size="sm" className="text-left" onClick={() => selectItem(index)}>
          <div className="flex w-full items-center gap-2">
            <span>{item.icon}</span>
            <div className="mb-0.5 text-left text-xs font-medium">{item.title}</div>
          </div>
        </Button>
      ))}
    </div>
  );
});

SlashMenu.displayName = "SlashMenu";
