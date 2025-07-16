"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import MenuTiptap from "./MenuTipTap";
import { TextStyleKit } from "@tiptap/extension-text-style";

const extensions = [TextStyleKit, StarterKit];

const Tiptap = ({ content }: { content: string }) => {
  const editor = useEditor({
    extensions,
    content: content,
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class:
          "p-2 min-h-[500px] rounded-l bg-gray-100 border-1 focus:outline-none",
      },
    },
  });

  return (
    <>
      <MenuTiptap editor={editor} />
      <EditorContent editor={editor} />
    </>
  );
};

export default Tiptap;
