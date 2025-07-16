"use client";

import React from "react";
import { Editor, useEditorState } from "@tiptap/react";
import { Button, ButtonGroup } from "flowbite-react";
import { Toggle } from "@/components/ui/toggle";
import {
  Bold,
  Code,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Heading6,
  Italic,
  List,
  ListOrdered,
  MessageSquareQuote,
  Pilcrow,
  Quote,
  Redo,
  RemoveFormatting,
  Ruler,
  Strikethrough,
  Undo,
  WrapText,
} from "lucide-react";

function MenuTiptap({ editor }: { editor: Editor | null }) {
  // Read the current editor's state, and re-render the component when it changes

  const editorState = useEditorState({
    editor,
    selector: (ctx) => {
      return ctx.editor
        ? {
            isBold: ctx.editor.isActive("bold"),
            canBold: ctx.editor.can().chain().focus().toggleBold().run(),
            isItalic: ctx.editor.isActive("italic"),
            canItalic: ctx.editor.can().chain().focus().toggleItalic().run(),
            isStrike: ctx.editor.isActive("strike"),
            canStrike: ctx.editor.can().chain().focus().toggleStrike().run(),
            isCode: ctx.editor.isActive("code"),
            canCode: ctx.editor.can().chain().focus().toggleCode().run(),
            canClearMarks: ctx.editor
              .can()
              .chain()
              .focus()
              .unsetAllMarks()
              .run(),
            isParagraph: ctx.editor.isActive("paragraph"),
            isHeading1: ctx.editor.isActive("heading", { level: 1 }),
            isHeading2: ctx.editor.isActive("heading", { level: 2 }),
            isHeading3: ctx.editor.isActive("heading", { level: 3 }),
            isHeading4: ctx.editor.isActive("heading", { level: 4 }),
            isHeading5: ctx.editor.isActive("heading", { level: 5 }),
            isHeading6: ctx.editor.isActive("heading", { level: 6 }),
            isBulletList: ctx.editor.isActive("bulletList"),
            isOrderedList: ctx.editor.isActive("orderedList"),
            isCodeBlock: ctx.editor.isActive("codeBlock"),
            isBlockquote: ctx.editor.isActive("blockquote"),
            canUndo: ctx.editor.can().chain().focus().undo().run(),
            canRedo: ctx.editor.can().chain().focus().redo().run(),
          }
        : {
            isBold: false,
            canBold: false,
            isItalic: false,
            canItalic: false,
            isStrike: false,
            canStrike: false,
            isCode: false,
            canCode: false,
            canClearMarks: false,
            isParagraph: false,
            isHeading1: false,
            isHeading2: false,
            isHeading3: false,
            isHeading4: false,
            isHeading5: false,
            isHeading6: false,
            isBulletList: false,
            isOrderedList: false,
            isCodeBlock: false,
            isBlockquote: false,
            canUndo: false,
            canRedo: false,
          };
    },
  });
  if (!editor) return null;
  return (
    <div className="control-group">
      <div className="button-group">
        <Toggle
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editorState?.canBold}
          className={editorState?.isBold ? "is-active" : ""}
        >
          <Bold />
        </Toggle>
        <Toggle
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editorState?.canItalic}
          className={editorState?.isItalic ? "is-active" : ""}
        >
          <Italic />
        </Toggle>
        <Toggle
          onClick={() => editor.chain().focus().toggleStrike().run()}
          disabled={!editorState?.canStrike}
          className={editorState?.isStrike ? "is-active" : ""}
        >
          <Strikethrough />
        </Toggle>
        <Toggle
          onClick={() => editor.chain().focus().toggleCode().run()}
          disabled={!editorState?.canCode}
          className={editorState?.isCode ? "is-active" : ""}
        >
          <Code />
        </Toggle>
        <Toggle onClick={() => editor.chain().focus().unsetAllMarks().run()}>
          <RemoveFormatting />
        </Toggle>
        {/* <Toggle onClick={() => editor.chain().focus().clearNodes().run()}>
          Clear nodes
        </Toggle> */}
        <Toggle
          onClick={() => editor.chain().focus().setParagraph().run()}
          className={editorState?.isParagraph ? "is-active" : ""}
        >
          <Pilcrow />
        </Toggle>
        <Toggle
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          className={editorState?.isHeading1 ? "is-active" : ""}
        >
          <Heading1 />
        </Toggle>
        <Toggle
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className={editorState?.isHeading2 ? "is-active" : ""}
        >
          <Heading2 />
        </Toggle>
        <Toggle
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          className={editorState?.isHeading3 ? "is-active" : ""}
        >
          <Heading3 />
        </Toggle>
        <Toggle
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 4 }).run()
          }
          className={editorState?.isHeading4 ? "is-active" : ""}
        >
          <Heading4 />
        </Toggle>
        <Toggle
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 5 }).run()
          }
          className={editorState?.isHeading5 ? "is-active" : ""}
        >
          <Heading5 />
        </Toggle>
        <Toggle
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 6 }).run()
          }
          className={editorState?.isHeading6 ? "is-active" : ""}
        >
          <Heading6 />
        </Toggle>
        <Toggle
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editorState?.isBulletList ? "is-active" : ""}
        >
          <List />
        </Toggle>
        <Toggle
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={editorState?.isOrderedList ? "is-active" : ""}
        >
          <ListOrdered />
        </Toggle>
        <Toggle
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={editorState?.isCodeBlock ? "is-active" : ""}
        >
          <MessageSquareQuote />
        </Toggle>
        <Toggle
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={editorState?.isBlockquote ? "is-active" : ""}
        >
          <Quote />
        </Toggle>
        <Toggle
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
        >
          <Ruler />
        </Toggle>
        <Toggle onClick={() => editor.chain().focus().setHardBreak().run()}>
          <WrapText />
        </Toggle>
        <Toggle
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editorState?.canUndo}
        >
          <Undo />
        </Toggle>
        <Toggle
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editorState?.canRedo}
        >
          <Redo />
        </Toggle>
      </div>
    </div>
  );
}

export default MenuTiptap;
