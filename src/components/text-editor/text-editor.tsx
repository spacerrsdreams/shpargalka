"use client";

import "@/components/text-editor/text-editor.css";

import { EditorContent, useEditor } from "@tiptap/react";

import { BubbleMenu } from "@/components/text-editor/buble-menu";
import { EditorConfig } from "@/components/text-editor/config/editor-config";
import { FloatingMenu } from "@/components/text-editor/floating-menu";

export const TextEditor = () => {
  const editor = useEditor(EditorConfig);

  if (!editor) return null;

  return (
    <div className="mt-20 w-full py-4">
      <BubbleMenu editor={editor} />
      <FloatingMenu editor={editor} />
      <div className="mx-auto w-[712px]">
        <EditorContent editor={editor} className="h-full w-full font-sans focus:outline-none" />
      </div>
    </div>
  );
};
