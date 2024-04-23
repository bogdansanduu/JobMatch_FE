import { ForwardedRef, forwardRef } from "react";
import StarterKit from "@tiptap/starter-kit";
import {
  LinkBubbleMenu,
  RichTextEditor,
  type RichTextEditorRef,
} from "mui-tiptap";
import EditorMenuControls from "./EditorMenuControls";
import Link from "@tiptap/extension-link";
import TextStyle from "@tiptap/extension-text-style";

import { FontSize, LinkBubbleMenuHandler, ResizableImage } from "mui-tiptap";
import { Placeholder } from "@tiptap/extension-placeholder";

interface TextEditorProps {
  editorRef?: ForwardedRef<RichTextEditorRef>;
}

const TextEditor = ({ editorRef }: TextEditorProps) => {
  return (
    <RichTextEditor
      ref={editorRef}
      extensions={[
        StarterKit,
        TextStyle,
        LinkBubbleMenuHandler,
        Link,
        FontSize,
        ResizableImage.configure({
          allowBase64: true,
        }),
        Placeholder.configure({
          placeholder: "Write here...",
        }),
      ]} // Or any Tiptap extensions you wish!
      // content="<p>Write here</p>" // Initial content for the editor
      // Optionally include `renderControls` for a menu-bar atop the editor:
      renderControls={EditorMenuControls}
    >
      {() => (
        <>
          <LinkBubbleMenu />
        </>
      )}
    </RichTextEditor>
  );
};

export default forwardRef<RichTextEditorRef, TextEditorProps>((props, ref) => (
  <TextEditor editorRef={ref} />
));
