"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import MenuTiptap from "./MenuTipTap";
import { TextStyleKit } from "@tiptap/extension-text-style";

const extensions = [TextStyleKit, StarterKit];

const Tiptap = ({
  initialContent,
  onChange,
}: {
  initialContent: string;
  onChange: (value: string) => void;
}) => {
  const editor = useEditor({
    extensions,
    content: initialContent,
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class:
          "p-2 min-h-[500px] rounded-l bg-gray-100 border-1 focus:outline-none",
      },
    },
    onUpdate: ({ editor }) => {
      const htmlString = editor.getHTML();
      onChange(htmlString);
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
