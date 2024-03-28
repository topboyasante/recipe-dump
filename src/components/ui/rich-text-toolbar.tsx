"use client";
import { type Editor } from "@tiptap/react";
import {
  Bold,
  Heading,
  Italic,
  List,
  ListOrdered,
  Strikethrough,
} from "lucide-react";
import { Toggle } from "./toggle";

type Props = {
  editor: Editor | null;
};

function ToolBar({ editor }: Props) {
  if (!editor) return null;
  return (
    <div className="border rounded-md mb-5 p-3 flex items-center gap-3">
      <Toggle
        size={"sm"}
        pressed={editor.isActive("heading", { level: 4 })}
        onPressedChange={() => {
          editor.chain().focus().toggleHeading({ level: 4 }).run();
        }}
      >
        <Heading className="h-4 w-4" />
      </Toggle>
      <Toggle
        size={"sm"}
        pressed={editor.isActive("bold")}
        onPressedChange={() => {
          editor.chain().focus().toggleBold().run();
        }}
      >
        <Bold className="h-4 w-4" />
      </Toggle>
      <Toggle
        size={"sm"}
        pressed={editor.isActive("italic")}
        onPressedChange={() => {
          editor.chain().focus().toggleItalic().run();
        }}
      >
        <Italic className="h-4 w-4" />
      </Toggle>
      <Toggle
        size={"sm"}
        pressed={editor.isActive("italic")}
        onPressedChange={() => {
          editor.chain().focus().toggleStrike().run();
        }}
      >
        <Strikethrough className="h-4 w-4" />
      </Toggle>
      <Toggle
        size={"sm"}
        pressed={editor.isActive("bulletList")}
        onPressedChange={() => {
          editor.chain().focus().toggleBulletList().run();
        }}
      >
        <List className="h-4 w-4" />
      </Toggle>
      <Toggle
        size={"sm"}
        pressed={editor.isActive("orderedList")}
        onPressedChange={() => {
          editor.chain().focus().toggleOrderedList().run();
        }}
      >
        <ListOrdered className="h-4 w-4" />
      </Toggle>
    </div>
  );
}

export default ToolBar;
