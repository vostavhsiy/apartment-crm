// --- Icons ---
import { getLCItem, setLCItem } from "@/shared/lib/helpers/local-storage";
import { useCursorVisibility } from "@/shared/lib/hooks/use-cursor-visibility";
// --- Hooks ---
import { useIsMobile } from "@/shared/lib/hooks/use-mobile";
// --- Lib ---
import { handleImageUpload, MAX_FILE_SIZE } from "@/shared/lib/tiptap-utils";
import { TIPTAP_EMPTY_DOC } from "@/shared/lib/utils";
// --- Styles ---
import "@/shared/ui/tiptap-templates/simple/simple-editor.scss";
import "@/shared/ui/tiptap-templates/simple/tiptap-node/blockquote-node/blockquote-node.scss";
import "@/shared/ui/tiptap-templates/simple/tiptap-node/code-block-node/code-block-node.scss";
import "@/shared/ui/tiptap-templates/simple/tiptap-node/heading-node/heading-node.scss";
import { HorizontalRule } from "@/shared/ui/tiptap-templates/simple/tiptap-node/horizontal-rule-node/horizontal-rule-node-extension";
import "@/shared/ui/tiptap-templates/simple/tiptap-node/horizontal-rule-node/horizontal-rule-node.scss";
import "@/shared/ui/tiptap-templates/simple/tiptap-node/image-node/image-node.scss";
// --- Tiptap Node ---
import { ImageUploadNode } from "@/shared/ui/tiptap-templates/simple/tiptap-node/image-upload-node/image-upload-node-extension";
import "@/shared/ui/tiptap-templates/simple/tiptap-node/list-node/list-node.scss";
import "@/shared/ui/tiptap-templates/simple/tiptap-node/paragraph-node/paragraph-node.scss";
// --- UI Primitives ---
import { Button } from "@/shared/ui/tiptap-templates/simple/tiptap-ui-primitive/button";
import { Spacer } from "@/shared/ui/tiptap-templates/simple/tiptap-ui-primitive/spacer";
import {
  Toolbar,
  ToolbarGroup,
  ToolbarSeparator,
} from "@/shared/ui/tiptap-templates/simple/tiptap-ui-primitive/toolbar";
import { BlockquoteButton } from "@/shared/ui/tiptap-templates/simple/tiptap-ui/blockquote-button";
import { CodeBlockButton } from "@/shared/ui/tiptap-templates/simple/tiptap-ui/code-block-button";
import {
  ColorHighlightPopover,
  ColorHighlightPopoverButton,
  ColorHighlightPopoverContent,
} from "@/shared/ui/tiptap-templates/simple/tiptap-ui/color-highlight-popover";
// --- Tiptap UI ---
import { HeadingDropdownMenu } from "@/shared/ui/tiptap-templates/simple/tiptap-ui/heading-dropdown-menu";
import {
  LinkContent,
  LinkPopover,
} from "@/shared/ui/tiptap-templates/simple/tiptap-ui/link-popover";
import { MarkButton } from "@/shared/ui/tiptap-templates/simple/tiptap-ui/mark-button";
import { TextAlignButton } from "@/shared/ui/tiptap-templates/simple/tiptap-ui/text-align-button";
import { UndoRedoButton } from "@/shared/ui/tiptap-templates/simple/tiptap-ui/undo-redo-button";
// --- Components ---
import { Highlight } from "@tiptap/extension-highlight";
import { Image } from "@tiptap/extension-image";
import { TaskItem, TaskList } from "@tiptap/extension-list";
import { Subscript } from "@tiptap/extension-subscript";
import { Superscript } from "@tiptap/extension-superscript";
import { TextAlign } from "@tiptap/extension-text-align";
import { Typography } from "@tiptap/extension-typography";
import { Selection } from "@tiptap/extensions";
import { EditorContent, EditorContext, useEditor } from "@tiptap/react";
// --- Tiptap Core Extensions ---
import { StarterKit } from "@tiptap/starter-kit";

import * as React from "react";

import { ArrowLeftIcon } from "./tiptap-icons/arrow-left-icon";
import { HighlighterIcon } from "./tiptap-icons/highlighter-icon";
import { LinkIcon } from "./tiptap-icons/link-icon";
import { ListDropdownMenu } from "./tiptap-ui/list-dropdown-menu";

export const LC_EDITOR_NAME = "LC_EDITOR_CONTENT";

const MainToolbarContent = ({
  onHighlighterClick,
  onLinkClick,
  isMobile,
}: {
  onHighlighterClick: () => void;
  onLinkClick: () => void;
  isMobile: boolean;
}) => {
  return (
    <>
      <Spacer />

      <ToolbarGroup>
        <UndoRedoButton action="undo" />
        <UndoRedoButton action="redo" />
      </ToolbarGroup>

      <ToolbarSeparator />

      <ToolbarGroup>
        <HeadingDropdownMenu levels={[1, 2, 3, 4]} portal={isMobile} />
        <ListDropdownMenu
          types={["bulletList", "orderedList", "taskList"]}
          portal={isMobile}
        />
        <BlockquoteButton />
        <CodeBlockButton />
      </ToolbarGroup>

      <ToolbarSeparator />

      <ToolbarGroup>
        <MarkButton lang="ru" type="bold" />
        <MarkButton type="italic" />
        <MarkButton type="strike" />
        <MarkButton type="code" />
        <MarkButton type="underline" />
        {!isMobile ? (
          <ColorHighlightPopover />
        ) : (
          <ColorHighlightPopoverButton onClick={onHighlighterClick} />
        )}
        <LinkPopover />
      </ToolbarGroup>

      <ToolbarSeparator />

      <ToolbarGroup>
        <TextAlignButton align="left" />
        <TextAlignButton align="center" />
        <TextAlignButton align="right" />
        <TextAlignButton align="justify" />
      </ToolbarGroup>

      <Spacer />

      {isMobile && <ToolbarSeparator />}
    </>
  );
};

const MobileToolbarContent = ({
  type,
  onBack,
}: {
  type: "highlighter" | "link";
  onBack: () => void;
}) => (
  <>
    <ToolbarGroup>
      <Button data-style="ghost" onClick={onBack}>
        <ArrowLeftIcon className="tiptap-button-icon" />
        {type === "highlighter" ? (
          <HighlighterIcon className="tiptap-button-icon" />
        ) : (
          <LinkIcon className="tiptap-button-icon" />
        )}
      </Button>
    </ToolbarGroup>

    <ToolbarSeparator />

    {type === "highlighter" ? (
      <ColorHighlightPopoverContent />
    ) : (
      <LinkContent />
    )}
  </>
);

interface Props {
  name: string;
  value?: string;
  onChange?: (value: string) => void;
  onBlur?: () => void;
  error?: string;
  disabled?: boolean;
}

export function SimpleEditor(props: Props) {
  const isMobile = useIsMobile();
  const [mobileView, setMobileView] = React.useState<
    "main" | "highlighter" | "link"
  >("main");
  const toolbarRef = React.useRef<HTMLDivElement>(null);

  const editor = useEditor({
    immediatelyRender: false,
    shouldRerenderOnTransaction: false,
    editorProps: {
      attributes: {
        autocomplete: "off",
        autocorrect: "off",
        autocapitalize: "off",
        "aria-label": "Main content area, start typing to enter text.",
        class: "simple-editor",
      },
    },
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
      ImageUploadNode.configure({
        accept: "image/*",
        maxSize: MAX_FILE_SIZE,
        limit: 3,
        upload: handleImageUpload,
        onError: (error) => console.error("Upload failed:", error),
      }),
    ],
    onCreate(data) {
      const content = getLCItem(LC_EDITOR_NAME);
      try {
        const value = props.value ? JSON.parse(props.value) : null;
        data.editor.commands.setContent(content || value);
      } catch {
        data.editor.commands.setContent(content || props.value);
      }
    },
    onUpdate(data) {
      const content = data.editor.getJSON();
      setLCItem(
        LC_EDITOR_NAME,
        JSON.stringify(content) === TIPTAP_EMPTY_DOC ? "" : content,
      );
      props.onChange?.(JSON.stringify(content));
    },
  });

  React.useEffect(() => {
    const content = getLCItem(LC_EDITOR_NAME);
    try {
      const value = props.value ? JSON.parse(props.value) : null;
      editor?.commands.setContent(content || value);
    } catch {
      editor?.commands.setContent(content || props.value);
    }
  }, [props.value]);

  const rect = useCursorVisibility({
    editor,
    overlayHeight: toolbarRef.current?.getBoundingClientRect().height ?? 0,
  });

  React.useEffect(() => {
    if (!isMobile && mobileView !== "main") {
      setMobileView("main");
    }
  }, [isMobile, mobileView]);

  return (
    <div className="simple-editor-wrapper border rounded-md">
      <EditorContext.Provider value={{ editor }}>
        <Toolbar
          ref={toolbarRef}
          className="max-w-full"
          style={{
            scrollbarWidth: "thin",
          }}
        >
          {mobileView === "main" ? (
            <MainToolbarContent
              onHighlighterClick={() => setMobileView("highlighter")}
              onLinkClick={() => setMobileView("link")}
              isMobile={isMobile}
            />
          ) : (
            <MobileToolbarContent
              type={mobileView === "highlighter" ? "highlighter" : "link"}
              onBack={() => setMobileView("main")}
            />
          )}
        </Toolbar>

        <EditorContent
          editor={editor}
          role="presentation"
          className="simple-editor-content"
        />
      </EditorContext.Provider>
    </div>
  );
}
