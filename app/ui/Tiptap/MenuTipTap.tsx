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
    <>
      <div className="flex flex-row items-center justify-center">
        <Toggle
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editorState?.canBold}
          pressed={editorState?.isBold}
        >
          <Bold />
        </Toggle>
        <Toggle
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editorState?.canItalic}
          pressed={editorState?.isItalic}
        >
          <Italic />
        </Toggle>
        <Toggle
          onClick={() => editor.chain().focus().toggleStrike().run()}
          disabled={!editorState?.canStrike}
          pressed={editorState?.isStrike}
        >
          <Strikethrough />
        </Toggle>
        <Toggle
          onClick={() => editor.chain().focus().toggleCode().run()}
          disabled={!editorState?.canCode}
          pressed={editorState?.isCode}
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
          pressed={editorState?.isParagraph}
        >
          <Pilcrow />
        </Toggle>
        <Toggle
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          pressed={editorState?.isHeading1}
        >
          <Heading1 />
        </Toggle>
        <Toggle
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          pressed={editorState?.isHeading2}
        >
          <Heading2 />
        </Toggle>
        <Toggle
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          pressed={editorState?.isHeading3}
        >
          <Heading3 />
        </Toggle>
        <Toggle
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 4 }).run()
          }
          pressed={editorState?.isHeading4}
        >
          <Heading4 />
        </Toggle>
        <Toggle
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 5 }).run()
          }
          pressed={editorState?.isHeading5}
        >
          <Heading5 />
        </Toggle>
        <Toggle
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 6 }).run()
          }
          pressed={editorState?.isHeading6}
        >
          <Heading6 />
        </Toggle>
        <Toggle
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          pressed={editorState?.isBulletList}
        >
          <List />
        </Toggle>
        <Toggle
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          pressed={editorState?.isOrderedList}
        >
          <ListOrdered />
        </Toggle>
        <Toggle
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          pressed={editorState?.isCodeBlock}
        >
          <MessageSquareQuote />
        </Toggle>
        <Toggle
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          pressed={editorState?.isBlockquote}
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
      </div>
      <div className="flex flex-row items-center justify-center">
        <Button
          color="light"
          outline
          size="xs"
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editorState?.canUndo}
        >
          <Undo />
        </Button>
        <Button
          color="light"
          outline
          size="xs"
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editorState?.canRedo}
        >
          <Redo />
        </Button>
      </div>
    </>
  );
}

export default MenuTiptap;
