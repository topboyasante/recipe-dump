"use client";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import "../../styles/tiptap.scss";
import ToolBar from "./rich-text-toolbar";
import LineBreak from "@tiptap/extension-hard-break"


type Props = {
  onChange: (richtext: string) => void;
};

function TipTap({ ...props }: Props) {
  const editor = useEditor({
    extensions: [StarterKit.configure({}),LineBreak.extend({
      addKeyboardShortcuts() {
        return{
        'Enter': () => this.editor.commands.setHardBreak(),
        }
      },
    })],
    onUpdate({ editor }) {
      props.onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: "border rounded-md min-h-[250px] bg-transparent p-2",
      },
    },
  });
  return (
    <div>
      <ToolBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
}

export default TipTap;
