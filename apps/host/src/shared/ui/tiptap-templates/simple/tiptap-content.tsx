"use client";

// --- Icons ---
import { cn } from "@/shared/lib/utils";
// --- Icons ---
// --- Hooks ---
// --- Lib ---
// --- Styles ---
import "@/shared/ui/tiptap-templates/simple/simple-editor.scss";
import "@/shared/ui/tiptap-templates/simple/tiptap-node/blockquote-node/blockquote-node.scss";
import "@/shared/ui/tiptap-templates/simple/tiptap-node/code-block-node/code-block-node.scss";
import "@/shared/ui/tiptap-templates/simple/tiptap-node/heading-node/heading-node.scss";
import { HorizontalRule } from "@/shared/ui/tiptap-templates/simple/tiptap-node/horizontal-rule-node/horizontal-rule-node-extension";
import "@/shared/ui/tiptap-templates/simple/tiptap-node/horizontal-rule-node/horizontal-rule-node.scss";
import "@/shared/ui/tiptap-templates/simple/tiptap-node/image-node/image-node.scss";
// --- Tiptap Node ---
import "@/shared/ui/tiptap-templates/simple/tiptap-node/list-node/list-node.scss";
import "@/shared/ui/tiptap-templates/simple/tiptap-node/paragraph-node/paragraph-node.scss";
// --- UI Primitives ---
// --- Tiptap UI ---
// --- Components ---
import { Highlight } from "@tiptap/extension-highlight";
import { Image } from "@tiptap/extension-image";
import { TaskItem, TaskList } from "@tiptap/extension-list";
import { Subscript } from "@tiptap/extension-subscript";
import { Superscript } from "@tiptap/extension-superscript";
import { TextAlign } from "@tiptap/extension-text-align";
import { Typography } from "@tiptap/extension-typography";
import { Selection } from "@tiptap/extensions";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { ControllerRenderProps, UseFormReturn } from "react-hook-form";

import { ChangeEventHandler, forwardRef } from "react";

// --- Tiptap Core Extensions ---

export type ITipTapEditableProps = {
  value: string;
  name: string;
  form: UseFormReturn<any>;
  placeholder?: string;
  className?: string;
  editable: boolean;
  field: ControllerRenderProps<any, string>;
  onChange?: ChangeEventHandler<any>;
};

export type ITipTapContentProps = {
  value: string;
  className?: string;
};

export type ITipTapProps = ITipTapEditableProps | ITipTapContentProps;

export const TipTapContent = forwardRef<HTMLDivElement, ITipTapContentProps>(
  (props: ITipTapContentProps, ref) => {
    const editor = useEditor({
      extensions: [
        StarterKit.configure({
          horizontalRule: false,
          link: {
            openOnClick: false,
            enableClickSelection: true,
          },
        }),
        HorizontalRule,
        TextAlign.configure({ types: ["heading", "paragraph"] }),
        TaskList,
        TaskItem.configure({ nested: true }),
        Highlight.configure({ multicolor: true }),
        Image,
        Typography,
        Superscript,
        Subscript,
        Selection,
      ],
      content: props.value,
      editorProps: {
        attributes: {
          class: cn("w-full prose mx-auto focus:outline-none", props.className),
        },
      },
      editable: false,
      immediatelyRender: false,
    });

    if (!editor) {
      return;
    }

    return <EditorContent editor={editor} />;
  },
);

export const TipTap = forwardRef<HTMLInputElement, ITipTapProps>(
  (props: ITipTapProps, ref) => {
    try {
      typeof props.value === "string" && props.value !== ""
        ? JSON.parse(props.value)
        : props.value;
    } catch (error) {
      console.log(
        "TipTap editor was replaced by text input, because of error:",
        error,
      );
      if (typeof props.value === "string") {
        return <p>{props.value}</p>;
      }

      return null;
    }

    return (
      <TipTapContent
        {...props}
        value={
          typeof props.value === "string" && props.value !== ""
            ? JSON.parse(props.value)
            : props.value
        }
        ref={ref}
      />
    );
  },
);
