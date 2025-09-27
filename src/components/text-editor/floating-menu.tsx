"use client";

import { type Editor } from "@tiptap/react";
import { FloatingMenu as FloatingMenuComponent } from "@tiptap/react/menus";
import { ImageIcon, PlusIcon, VideoIcon } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export const FloatingMenu = ({ editor }: { editor: Editor }) => {
  const [open, setOpen] = useState(false);

  return (
    <FloatingMenuComponent
      editor={editor}
      shouldShow={({ editor }) => {
        const { $from } = editor.state.selection;

        setOpen(false);

        return $from.parent.type.name === "paragraph" && $from.parent.content.size === 0;
      }}
    >
      <div className="flex gap-7">
        <Button variant="ghost" onClick={() => setOpen(!open)} className="-ml-16 !p-1 shadow" size="icon">
          <PlusIcon className={cn("size-4 transition-transform duration-200 ease-in-out", open && "hidden")} />
        </Button>

        <AnimatePresence>
          {open && (
            <motion.div
              key="floating-toolbar"
              initial={{ opacity: 0, y: 6, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 6, scale: 0.95 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              className="bg-background flex items-center gap-0.5 rounded-lg border px-2 py-0.5 shadow-sm"
            >
              <motion.div
                initial={{ opacity: 0, y: 4, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 4, scale: 0.95 }}
                transition={{ duration: 0.16, delay: 0.02 }}
              >
                <Button variant="ghost" size="icon" onClick={() => {}} aria-label="Insert image">
                  <ImageIcon className="size-4" />
                </Button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 4, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 4, scale: 0.95 }}
                transition={{ duration: 0.16, delay: 0.06 }}
              >
                <Button variant="ghost" size="icon" onClick={() => {}} aria-label="Insert video">
                  <VideoIcon className="size-4" />
                </Button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </FloatingMenuComponent>
  );
};
