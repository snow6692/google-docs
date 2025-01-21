"use client";

import React from "react";

import { useLiveblocksExtension } from "@liveblocks/react-tiptap";
import { useEditor, EditorContent } from "@tiptap/react";
import TaskList from "@tiptap/extension-task-list";
import TaskItem from "@tiptap/extension-task-item";
import Table from "@tiptap/extension-table";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import TableRow from "@tiptap/extension-table-row";
import Image from "@tiptap/extension-image";
import ImageResize from "tiptap-extension-resize-image";
import UnderLine from "@tiptap/extension-underline";
import FontFamily from "@tiptap/extension-font-family";
import TextStyle from "@tiptap/extension-text-style";
import { Color } from "@tiptap/extension-color";
import Highlight from "@tiptap/extension-highlight";
import Link from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";
import { useEditorStore } from "@/store/useEditorStore";
import { FontSizeExtension } from "@/extensions/font-size";
import { LineHeightExtension } from "@/extensions/line-height";
import { useStorage } from "@liveblocks/react";

//table

import StarterKit from "@tiptap/starter-kit";
import Ruler from "./ruler/Ruler";
import { Threads } from "@/app/documents/[documentId]/Threads";
import { LEFT_MARGIN_DEFAULT, RIGHT_MARGIN_DEFAULT } from "@/constants/margins";

interface EditorProps {
  initialContent?: string | undefined;
}
function Editor({ initialContent }: EditorProps) {
  const leftMargin =
    useStorage((root) => root.leftMargin) ?? LEFT_MARGIN_DEFAULT;
  const rightMargin =
    useStorage((root) => root.rightMargin) ?? RIGHT_MARGIN_DEFAULT;

  const liveblocks = useLiveblocksExtension({
    initialContent,
    offlineSupport_experimental: true,
  });

  const { setEditor } = useEditorStore();
  const editor = useEditor({
    immediatelyRender: false,
    onCreate({ editor }) {
      setEditor(editor);
    },
    onDestroy() {
      setEditor(null);
    },
    onUpdate({ editor }) {
      setEditor(editor);
    },
    onSelectionUpdate({ editor }) {
      setEditor(editor);
    },
    onTransaction({ editor }) {
      setEditor(editor);
    },
    onFocus({ editor }) {
      setEditor(editor);
    },
    onBlur({ editor }) {
      setEditor(editor);
    },
    onContentError({ editor }) {
      setEditor(editor);
    },
    editorProps: {
      attributes: {
        style: `padding-left:${leftMargin}px; padding-right:${rightMargin}px;`,
        class: `focus:outline-none print:border-0 bg-white border border-[#c7c7c7] flex flex-col min-h-[1054px] w-[816px] pt-10 pb-10 cursor-text`,
      },
    },
    extensions: [
      StarterKit.configure({
        history: false,
      }),
      LineHeightExtension.configure({
        types: ["heading", "paragraph"],
        defaultLineHeight: "normal",
      }),
      liveblocks,
      FontSizeExtension,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Link.configure({
        openOnClick: false,
        autolink: true,
        defaultProtocol: "https",
      }),
      Color,
      Highlight.configure({ multicolor: true }),

      FontFamily,
      TextStyle,
      UnderLine,
      Image,
      ImageResize,
      TaskList,
      TaskItem.configure({ nested: true }),
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell,
    ],
  });
  return (
    <div className=" size-full    overflow-x-auto bg-[#f9fbfd] px-4 print:p-0 print:bg-white print:overflow-visible">
      <Ruler />
      <div
        className={` min-w-max flex  justify-center w-[816px] py-4 print:py-0 mx-auto print:w-full print:min-w-0`}
      >
        <EditorContent editor={editor} />
        <Threads editor={editor} />
      </div>
    </div>
  );
}

export default Editor;
