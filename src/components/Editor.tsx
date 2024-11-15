/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef } from "react";
import EditorJS, { OutputData } from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";

const Editor = ({
  onChange,
}: {
  onChange: React.Dispatch<React.SetStateAction<OutputData | undefined>>;
}) => {
  const editorRef = useRef<EditorJS | null>(null);
  useEffect(() => {
    const initializeEditor = () => {
      if (!editorRef.current) {
        editorRef.current = new EditorJS({
          holder: "editorjs",
          tools: {
            header: {
              class: Header as any,
              inlineToolbar: true,
              config: {
                placeholder: "Enter a header",
                levels: [1, 2, 3, 4, 5, 6],
                defaultLevel: 1,
              },
            },
            list: {
              class: List as any,
              inlineToolbar: true,
            },
          },
          onReady: () => {
            console.log("Editor.js is ready!");
          },
          onChange: async () => {
            const content = await editorRef.current?.save();
            if (content) {
              onChange(content); // Pass content to parent
            }
          },
          autofocus: true,
          placeholder: "Write what's on your mind....",
        });
      }
    };

    initializeEditor();

    return () => {
      if (
        editorRef.current &&
        typeof editorRef.current.destroy === "function"
      ) {
        editorRef.current.destroy();
        editorRef.current = null;
      }
    };
  }, [onChange]);

  return (
    <div
      id="editorjs"
      className="bg-gray-100 dark:bg-black dark:border-gray-700 dark:border p-4 w-full"
    ></div>
  );
};

export default Editor;
