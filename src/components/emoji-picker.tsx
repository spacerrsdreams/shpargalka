"use client";

import { EmojiPicker as EmojiPickerComponent } from "frimousse";

import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

export const EmojiPicker = () => {
  return (
    <>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">Open popover</Button>
        </PopoverTrigger>
        <PopoverContent className="w-80">
          <EmojiPickerComponent.Root>
            <EmojiPickerComponent.Search />
            <EmojiPickerComponent.Viewport>
              <EmojiPickerComponent.Loading>Loading…</EmojiPickerComponent.Loading>
              <EmojiPickerComponent.Empty>No emoji found.</EmojiPickerComponent.Empty>
              <EmojiPickerComponent.List />
            </EmojiPickerComponent.Viewport>
          </EmojiPickerComponent.Root>
        </PopoverContent>
      </Popover>
    </>
  );
};
