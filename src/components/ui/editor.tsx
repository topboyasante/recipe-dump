import React, { useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";

type Props = {
  onChange: (richtext: string) => void;
};


function RTEditor({ ...props }: Props) {
  const editorRef = useRef<any>(null); // Adjust type based on your needs
  return (
    <>
      <Editor
        id="Editor"
        tinymceScriptSrc="/tinymce/tinymce.min.js"
        apiKey={`${process.env.NEXT_PUBLIC_TINY_MCE_KEY}`}
        onInit={(evt, editor) => (editorRef.current = editor)}
        onChange={() => props.onChange(editorRef.current.getContent())}
        init={{
          height: 500,
          menubar: true,
          plugins: [
            "advlist",
            "autolink",
            "lists",
            "link",
            "image",
            "charmap",
            "preview",
            "anchor",
            "searchreplace",
            "visualblocks",
            "code",
            "fullscreen",
            "insertdatetime",
            "media",
            "table",
            "code",
            "help",
            "wordcount",
          ],
          toolbar:
            "undo redo | blocks | " +
            "bold italic forecolor | alignleft aligncenter " +
            "alignright alignjustify | bullist numlist outdent indent | " +
            "removeformat | help",
          //   content_style:
          //     "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
        }}
      />
    </>
  );
}

export default RTEditor;
