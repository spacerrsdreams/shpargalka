"use client";

import "@/components/editor/editor.css";

import { EditorContent, useEditor } from "@tiptap/react";

import { BubbleMenu } from "@/components/editor/buble-menu";
import { EditorConfig } from "@/components/editor/config/editor-config";
import { FloatingMenu } from "@/components/editor/floating-menu";

export const TextEditor = () => {
  const editor = useEditor(EditorConfig);

  // useEffect(() => {
  //   if (!editor) return;

  //   const savedPosition = localStorage.getItem("cursorPosition");

  //   if (savedPosition) {
  //     const { documentPosition } = JSON.parse(savedPosition);

  //     console.log("restoring cursor position", { documentPosition });

  //     // Use setTimeout to ensure the editor is fully initialized
  //     setTimeout(() => {
  //       const docSize = editor.state.doc.content.size;
  //       // Ensure position is within document bounds
  //       const safePosition = Math.min(Math.max(documentPosition, 0), docSize);

  //       editor.chain().focus().setTextSelection(safePosition).run();
  //     }, 100);
  //   }
  // }, [editor]);

  // const updateCursorPosition = useCallback((currentEditor: Editor) => {
  //   const { state } = currentEditor;
  //   const { from } = state.selection;

  //   const textBeforeCursor = state.doc.textBetween(0, from, "\n");

  //   const lines = textBeforeCursor.split("\n");
  //   const line = lines.length;

  //   const column = lines[lines.length - 1].length + 1;

  //   console.log("updating cursor position", { line, column, documentPosition: from });

  //   // Save both line/column for display AND document position for restoration
  //   localStorage.setItem(
  //     "cursorPosition",
  //     JSON.stringify({
  //       line,
  //       column,
  //       documentPosition: from,
  //     }),
  //   );
  //   setCursorPosition({ line, column });
  // }, []);

  // useEffect(() => {
  //   if (!editor) return;

  //   const handleSelectionUpdate = () => updateCursorPosition(editor);

  //   editor.on("selectionUpdate", handleSelectionUpdate);
  //   updateCursorPosition(editor);

  //   return () => {
  //     editor.off("selectionUpdate", handleSelectionUpdate);
  //   };
  // }, [updateCursorPosition, editor]);

  if (!editor) return null;

  return (
    <div className="mt-20 w-full py-4">
      <div className="bg-sidebar mx-auto h-full max-w-4xl rounded-xl px-2 py-4">
        <BubbleMenu editor={editor} />
        <FloatingMenu editor={editor} />
        <EditorContent editor={editor} className="h-full font-sans focus:outline-none" />
      </div>
    </div>
  );
};
