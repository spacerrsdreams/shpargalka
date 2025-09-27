import type { Editor } from "@tiptap/core";
import { useEditorState } from "@tiptap/react";
import { BubbleMenu as BubbleMenuComponent } from "@tiptap/react/menus";
import {
  BoldIcon,
  ItalicIcon,
  LinkIcon,
  ListOrderedIcon,
  ListTodo,
  QuoteIcon,
  StrikethroughIcon,
  UnderlineIcon,
  Unlink,
} from "lucide-react";
import { useCallback } from "react";
import { toast } from "sonner";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export const BubbleMenu = ({ editor }: { editor: Editor }) => {
  const editorState = useEditorState({
    editor,
    selector: (ctx) => ({
      isLink: ctx.editor.isActive("link"),
      isBold: ctx.editor.isActive("bold"),
      isStrike: ctx.editor.isActive("strike"),
      isItalic: ctx.editor.isActive("italic"),
      isUnderline: ctx.editor.isActive("underline"),
      isBulletList: ctx.editor.isActive("bulletList"),
      isBlockquote: ctx.editor.isActive("blockquote"),
      isOrderedList: ctx.editor.isActive("orderedList"),
    }),
  });

  const setLink = useCallback(() => {
    const previousUrl = editor.getAttributes("link").href;
    const url = window.prompt("URL", previousUrl);

    // cancelled
    if (url === null) {
      return;
    }

    // empty
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();

      return;
    }

    // update link
    try {
      editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
    } catch (e: unknown) {
      const message =
        typeof e === "object" && e !== null && "message" in e ? e.message : "Unknown error occured, please try again";

      toast.error(message as string);
    }
  }, [editor]);

  return (
    <BubbleMenuComponent
      editor={editor}
      options={{}}
      shouldShow={({ editor, state, view }) => {
        return !state.selection.empty && view.hasFocus() && editor.isEditable;
      }}
      className="bg-background flex items-center gap-0.5 rounded-lg border px-2 py-0.5 shadow-sm"
    >
      <Button variant="ghost" size="icon" onClick={() => editor.chain().focus().toggleBold().run()}>
        <BoldIcon className={cn("size-4", editorState.isBold && "text-primary")} />
      </Button>
      <Button variant="ghost" size="icon" onClick={() => editor.chain().focus().toggleItalic().run()}>
        <ItalicIcon className={cn("size-4", editorState.isItalic && "text-primary")} />
      </Button>
      <Button variant="ghost" size="icon" onClick={() => editor.chain().focus().toggleUnderline().run()}>
        <UnderlineIcon className={cn("size-4", editorState.isUnderline && "text-primary")} />
      </Button>
      <Button variant="ghost" size="icon" onClick={() => editor.chain().focus().toggleBlockquote().run()}>
        <QuoteIcon className={cn("size-4", editorState.isBlockquote && "text-primary")} />
      </Button>
      <Button variant="ghost" size="icon" className="!font-sans" onClick={setLink}>
        <LinkIcon className={cn("size-4", editorState.isLink && "text-primary")} />
      </Button>

      {editorState.isLink && (
        <Button variant="ghost" size="icon" onClick={() => editor.chain().focus().unsetLink().run()}>
          <Unlink className="size-4" />
        </Button>
      )}
      <Button variant="ghost" size="icon" onClick={() => editor.chain().focus().toggleStrike().run()}>
        <StrikethroughIcon className={cn("size-4", editorState.isStrike && "text-primary")} />
      </Button>

      <div className="bg-sidebar h-4 w-0.5" />

      <Button variant="ghost" size="icon" onClick={() => editor.chain().focus().toggleBulletList().run()}>
        <ListTodo className={cn("size-4", editorState.isBulletList && "text-primary")} />
      </Button>
      <Button variant="ghost" size="icon" onClick={() => editor.chain().focus().toggleOrderedList().run()}>
        <ListOrderedIcon className={cn("size-4", editorState.isOrderedList && "text-primary")} />
      </Button>
    </BubbleMenuComponent>
  );
};
