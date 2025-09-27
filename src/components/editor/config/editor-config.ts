import { CharacterCount } from "@tiptap/extension-character-count";
import { Document } from "@tiptap/extension-document";
import { Image } from "@tiptap/extension-image";
import { Link } from "@tiptap/extension-link";
import { Placeholder } from "@tiptap/extension-placeholder";
import { TextAlign } from "@tiptap/extension-text-align";
import { FontSize, TextStyle } from "@tiptap/extension-text-style";
import { ReactRenderer, type UseEditorOptions } from "@tiptap/react";
import { StarterKit } from "@tiptap/starter-kit";
import { type SuggestionProps } from "@tiptap/suggestion";
import tippy, { type Instance as TippyInstance } from "tippy.js";

import { SlashCommand } from "@/components/editor/config/slash-menu/slash-command-config";
import { SlashMenu } from "@/components/editor/slash-menu";

export const EditorConfig: UseEditorOptions & {
  immediatelyRender: false;
} = {
  immediatelyRender: false,
  extensions: [
    Document,
    Image,
    CharacterCount,
    StarterKit.configure({
      document: false, // Disable StarterKit's Document to use our custom one
      bulletList: {
        HTMLAttributes: {
          class: "list-disc ml-2",
        },
      },
      orderedList: {
        HTMLAttributes: {
          class: "list-decimal ml-2",
        },
      },

      blockquote: {
        HTMLAttributes: {
          class: "prose text-primary",
        },
      },
    }),
    FontSize,
    TextStyle,
    TextAlign.configure({ types: ["heading", "paragraph"] }),
    Placeholder.configure({
      placeholder: "What moment from the past will you bring to light today?",
    }),
    Link.configure({
      HTMLAttributes: {
        class: "text-primary underline",
      },
      autolink: true,
      linkOnPaste: true,
      openOnClick: false,
      defaultProtocol: "https",
      protocols: ["http", "https"],
      isAllowedUri: (url, ctx) => {
        try {
          // construct URL
          const parsedUrl = url.includes(":") ? new URL(url) : new URL(`${ctx.defaultProtocol}://${url}`);

          // use default validation
          if (!ctx.defaultValidate(parsedUrl.href)) {
            return false;
          }

          // disallowed protocols
          const disallowedProtocols = ["ftp", "file", "mailto"];
          const protocol = parsedUrl.protocol.replace(":", "");

          if (disallowedProtocols.includes(protocol)) {
            return false;
          }

          // only allow protocols specified in ctx.protocols
          const allowedProtocols = ctx.protocols.map((p) => (typeof p === "string" ? p : p.scheme));

          if (!allowedProtocols.includes(protocol)) {
            return false;
          }

          // disallowed domains
          const disallowedDomains = ["example-phishing.com", "malicious-site.net"];
          const domain = parsedUrl.hostname;

          if (disallowedDomains.includes(domain)) {
            return false;
          }

          // all checks have passed
          return true;
        } catch {
          return false;
        }
      },
      shouldAutoLink: (url) => {
        try {
          // construct URL
          const parsedUrl = url.includes(":") ? new URL(url) : new URL(`https://${url}`);

          // only auto-link if the domain is not in the disallowed list
          const disallowedDomains = ["example-no-autolink.com", "another-no-autolink.com"];
          const domain = parsedUrl.hostname;

          return !disallowedDomains.includes(domain);
        } catch {
          return false;
        }
      },
    }),
    SlashCommand.configure({
      suggestion: {
        render: () => {
          let component: ReactRenderer | undefined;
          let popup: TippyInstance[] | undefined;

          return {
            onStart: (props: SuggestionProps) => {
              component = new ReactRenderer(SlashMenu, {
                props,
                editor: props.editor,
              });

              if (!props.clientRect) {
                return;
              }

              popup = tippy("body", {
                getReferenceClientRect: props.clientRect as () => DOMRect,
                appendTo: () => document.body,
                content: component.element,
                showOnCreate: true,
                interactive: true,
                trigger: "manual",
                placement: "bottom-start",
              });
            },

            onUpdate(props: SuggestionProps) {
              component?.updateProps(props);

              if (!props.clientRect || !popup) {
                return;
              }

              popup[0].setProps({
                getReferenceClientRect: props.clientRect as () => DOMRect,
              });
            },

            onKeyDown(props: { event: KeyboardEvent }) {
              if (props.event.key === "Escape") {
                popup?.[0].hide();

                return true;
              }

              //@ts-expect-error - TODO: fix this
              return component?.ref.onKeyDown(props) ?? false;
            },

            onExit() {
              popup?.[0].destroy();
              component?.destroy();
            },
          };
        },
      },
    }),
  ],

  editorProps: {
    attributes: {
      class: ["ProseMirror", "h-full", "p-4", "outline-none", "cursor-text", "block"].join(" "),
    },
  },
};
