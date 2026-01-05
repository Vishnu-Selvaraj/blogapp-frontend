"use client";
import React, { useRef, useEffect } from "react";

const QuillEditor = ({ onChange, value }) => {
  const editorRef = useRef(null);
  const quillRef = useRef(null);
  const isInitialMount = useRef(true);

  useEffect(() => {
    const loadQuill = async () => {
      if (quillRef.current) return;

      const Quill = (await import("quill")).default;
      await import("quill/dist/quill.snow.css");

      if (editorRef.current) {
        // Clear any existing content
        editorRef.current.innerHTML = "";

        quillRef.current = new Quill(editorRef.current, {
          theme: "snow",
          placeholder: "Write some description",
        });

        // Force LTR after initialization
        setTimeout(() => {
          if (quillRef.current) {
            const editor = quillRef.current.root;
            const container = quillRef.current.container;

            // Set on editor
            editor.setAttribute("dir", "ltr");
            editor.style.setProperty("direction", "ltr", "important");
            editor.style.setProperty("text-align", "left", "important");

            // Set on container
            container.setAttribute("dir", "ltr");
            container.style.setProperty("direction", "ltr", "important");

            // Set on parent
            if (editorRef.current) {
              editorRef.current.setAttribute("dir", "ltr");
              editorRef.current.style.setProperty(
                "direction",
                "ltr",
                "important"
              );
            }
          }
        }, 0);

        quillRef.current.on("text-change", () => {
          const html = quillRef.current.root.innerHTML;
          onChange(html);
        });
      }
    };

    loadQuill();

    return () => {
      if (quillRef.current) {
        quillRef.current.off("text-change");
        quillRef.current = null;
      }
      if (editorRef.current) {
        editorRef.current.innerHTML = "";
      }
    };
  }, [onChange]);

  useEffect(() => {
    if (!quillRef.current) return;

    const currentContent = quillRef.current.root.innerHTML;

    // clear editor when value is empty
    if (!value) {
      quillRef.current.setText("");
      return;
    }

    // Only update if content is different
    if (currentContent !== value) {
      const selection = quillRef.current.getSelection();
      quillRef.current.clipboard.dangerouslyPasteHTML(value);

      if (selection) {
        quillRef.current.setSelection(selection);
      }

      setTimeout(() => {
        if (quillRef.current) {
          quillRef.current.root.setAttribute("dir", "ltr");
          quillRef.current.root.style.setProperty(
            "direction",
            "ltr",
            "important"
          );
        }
      }, 0);
    }
  }, [value]);

  return (
    <div style={{ direction: "ltr" }}>
      <div
        ref={editorRef}
        className="border border-gray-300 rounded"
        dir="ltr"
        style={{
          direction: "ltr",
          textAlign: "left",
          height: "250px",
        }}
      />
      <style jsx global>{`
        .ql-container {
          direction: ltr !important;
          text-align: left !important;
        }

        .ql-editor {
          direction: ltr !important;
          text-align: left !important;
          unicode-bidi: normal !important;
        }

        .ql-editor p,
        .ql-editor div,
        .ql-editor span,
        .ql-editor * {
          direction: ltr !important;
          text-align: left !important;
        }

        .ql-editor.ql-blank::before {
          left: 15px;
          right: auto;
        }
      `}</style>
    </div>
  );
};

export default QuillEditor;
