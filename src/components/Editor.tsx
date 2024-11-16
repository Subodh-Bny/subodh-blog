/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {
  useEffect,
  useRef,
  forwardRef,
  useImperativeHandle,
} from "react";
import EditorJS, { OutputData } from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";

const Editor = forwardRef(
  (
    {
      onChange,
      data,
    }: {
      onChange: React.Dispatch<React.SetStateAction<OutputData | undefined>>;
      data: OutputData | undefined;
    },
    ref
  ) => {
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
                onChange(content);
              }
            },
            autofocus: true,
            placeholder: "Write what's on your mind....",
            data: data,
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

    useImperativeHandle(ref, () => ({
      clear: () => {
        editorRef.current?.clear();
      },
    }));

    return (
      <div
        id="editorjs"
        className="bg-gray-100 dark:bg-black dark:border-gray-700 dark:border p-4 w-full"
      ></div>
    );
  }
);

Editor.displayName = "Editor";

export default Editor;
