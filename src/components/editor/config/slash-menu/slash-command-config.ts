import { Extension, type Editor, type Range } from "@tiptap/core";
import { Suggestion } from "@tiptap/suggestion";

export interface MenuItem {
  title: string;
  description: string;
  icon: string;
  command: ({ editor, range }: { editor: Editor; range: Range }) => void;
}

export interface SlashCommandProps {
  editor: Editor;
  range: Range;
  query: string;
  text: string;
  items: MenuItem[];
  command: (item: MenuItem) => void;
  decorationNode: Element | null;
  clientRect: (() => DOMRect) | null;
}

export interface CommandProps extends Pick<SlashCommandProps, "editor" | "range"> {
  item?: MenuItem;
}

export const SlashCommand = Extension.create({
  name: "slashCommand",

  addOptions() {
    return {
      suggestion: {
        char: "/",
        command: ({ editor, range, props }: { editor: Editor; range: Range; props: MenuItem }) => {
          props.command({ editor, range });
        },
      },
    };
  },

  addProseMirrorPlugins() {
    return [
      Suggestion({
        editor: this.editor,
        ...this.options.suggestion,
      }),
    ];
  },
});

export const SlashCommandExplicit = Extension.create<{
  suggestion: {
    char: string;
    command: ({ editor, range, props }: { editor: Editor; range: Range; props: MenuItem }) => void;
  };
}>({
  name: "slashCommand",

  addOptions() {
    return {
      suggestion: {
        char: "/",
        command: ({ editor, range, props }) => {
          props.command({ editor, range });
        },
      },
    };
  },

  addProseMirrorPlugins() {
    return [
      Suggestion({
        editor: this.editor,
        ...this.options.suggestion,
      }),
    ];
  },
});
