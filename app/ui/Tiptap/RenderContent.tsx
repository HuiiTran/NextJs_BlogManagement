"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { TextStyleKit } from "@tiptap/extension-text-style";

const extensions = [TextStyleKit, StarterKit];

const Tiptap = ({ initialContent }: { initialContent: string }) => {
  const editor = useEditor({
    extensions,
    content: initialContent,
    immediatelyRender: false,
    editable: false,
    editorProps: {
      attributes: {
        class: "p-2",
      },
    },
  });

  return (
    <>
      <EditorContent editor={editor} />
    </>
  );
};

export default Tiptap;
