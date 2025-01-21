"use client";
import React, { useState } from "react";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarTrigger,
  MenubarSubTrigger,
  MenubarMenu,
} from "../ui/menubar";
import {
  BoldIcon,
  FileIcon,
  FileJsonIcon,
  FilePlusIcon,
  FileTextIcon,
  GlobeIcon,
  ItalicIcon,
  PrinterIcon,
  Redo2Icon,
  RemoveFormattingIcon,
  StrikethroughIcon,
  TextIcon,
  UnderlineIcon,
  Undo2Icon,
} from "lucide-react";
import { BsFilePdf } from "react-icons/bs";
import { useEditorStore } from "@/store/useEditorStore";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { Doc } from "../../../convex/_generated/dataModel";

interface IProps {
  data: Doc<"documents">;
}

function MenubarComponent({ data }: IProps) {
  const router = useRouter();
  const { editor } = useEditorStore();
  const [rows, setRows] = useState(1);
  const [cols, setCols] = useState(1);
  const mutation = useMutation(api.documents.create);
  const onNewDocument = () => {
    mutation({
      title: "Untitled document",
      initialContent: "",
    })
      .catch(() => toast.error("Something went wrong"))
      .then((id) => {
        toast.success("Document created");
        router.push(`/documents/${id}`);
      });
  };

  const insertTable = ({ rows, cols }: { rows: number; cols: number }) => {
    editor
      ?.chain()
      .focus()
      .insertTable({ rows, cols, withHeaderRow: true })
      .run();
  };

  const onDownload = (blob: Blob, filename: string) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  const onSaveJSON = () => {
    if (!editor) return;
    const content = editor.getJSON();
    const blob = new Blob([JSON.stringify(content)], {
      type: "application/json",
    });
    onDownload(blob, `${data.title}.json`);
  };

  const onSaveHTML = () => {
    if (!editor) return;
    const content = editor.getHTML();
    const blob = new Blob([content], { type: "text/html" });
    onDownload(blob, `${data.title}.html`);
  };
  const onSaveText = () => {
    if (!editor) return;
    const content = editor.getText();
    const blob = new Blob([content], { type: "text/plain" });
    onDownload(blob, `${data.title}.txt`);
  };

  const handleInsertTable = () => {
    insertTable({ rows, cols });
  };
  return (
    <Menubar className="border-none bg-transparent shadow-none h-auto p-0">
      <MenubarMenu>
        <MenubarTrigger className=" text-sm font-normal py-0.5 px-[7px] rounded-sm hover:bg-muted h-auto">
          File
        </MenubarTrigger>
        <MenubarContent className=" print:hidden">
          <MenubarSub>
            <MenubarSubTrigger>
              <FileIcon className="  size-4 mr-2" />
              Save
            </MenubarSubTrigger>
            <MenubarSubContent>
              <MenubarItem onClick={onSaveJSON}>
                <FileJsonIcon className="  size-4 mr-2" />
                JSON
              </MenubarItem>
              <MenubarItem onClick={onSaveHTML}>
                <GlobeIcon className="  size-4 mr-2" />
                HTML
              </MenubarItem>
              <MenubarItem onClick={() => window.print()}>
                <BsFilePdf className="  size-4 mr-2" />
                PDF
              </MenubarItem>
              <MenubarItem onClick={onSaveText}>
                <FileTextIcon className="  size-4 mr-2" />
                Text
              </MenubarItem>
            </MenubarSubContent>
          </MenubarSub>
          <MenubarItem onClick={onNewDocument}>
            <FilePlusIcon className=" size-4 mr-2" />
            New Document
          </MenubarItem>
          <MenubarSeparator />

          <MenubarSeparator />
          <MenubarItem onClick={() => window.print()}>
            <PrinterIcon className=" size-4 mr-2" />
            Print <MenubarShortcut>Ctrl+P</MenubarShortcut>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger className=" text-sm font-normal py-0.5 px-[7px] rounded-sm hover:bg-muted h-auto">
          Edit
        </MenubarTrigger>
        <MenubarContent>
          <MenubarItem onClick={() => editor?.chain().focus().undo().run()}>
            <Undo2Icon className=" size-4 mr-2" />
            Undo <MenubarShortcut>Ctrl+Z</MenubarShortcut>
          </MenubarItem>
          <MenubarItem onClick={() => editor?.chain().focus().redo().run()}>
            <Redo2Icon className=" size-4 mr-2" />
            Redo <MenubarShortcut>Ctrl+Y</MenubarShortcut>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger className=" text-sm font-normal py-0.5 px-[7px] rounded-sm hover:bg-muted h-auto">
          Insert
        </MenubarTrigger>
        <MenubarContent>
          <MenubarSub>
            <MenubarSubTrigger>Table</MenubarSubTrigger>
            <MenubarSubContent>
              <MenubarItem onClick={() => insertTable({ rows: 1, cols: 1 })}>
                1 * 1
              </MenubarItem>
              <MenubarItem onClick={() => insertTable({ rows: 2, cols: 2 })}>
                2 * 2
              </MenubarItem>
              <MenubarItem onClick={() => insertTable({ rows: 3, cols: 3 })}>
                3 * 3
              </MenubarItem>
              <MenubarItem onClick={() => insertTable({ rows: 4, cols: 4 })}>
                4 * 4
              </MenubarItem>
              <div className=" flex gap-x-2">
                <Input
                  type="number"
                  value={rows}
                  onChange={(e) => setRows(Number(e.target.value))}
                  placeholder="Rows"
                  min="1"
                  // remove type number style
                  className="w-[60px]  "
                />
                <Input
                  type="number"
                  value={cols}
                  onChange={(e) => setCols(Number(e.target.value))}
                  placeholder="Columns"
                  min="1"
                  className="w-[60px]"
                />
                <Button onClick={handleInsertTable}>Add</Button>
              </div>
            </MenubarSubContent>
          </MenubarSub>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger className=" text-sm font-normal py-0.5 px-[7px] rounded-sm hover:bg-muted h-auto">
          Format
        </MenubarTrigger>
        <MenubarContent>
          <MenubarSub>
            <MenubarSubTrigger>
              <TextIcon className=" size-4 mr-2" />
              Text
            </MenubarSubTrigger>
            <MenubarSubContent>
              <MenubarItem
                onClick={() => editor?.chain().focus().toggleBold().run()}
              >
                <BoldIcon className=" size-4 mr-2" />
                <strong>Bold</strong>
                <MenubarShortcut>Ctrl+B</MenubarShortcut>
              </MenubarItem>
              <MenubarItem
                onClick={() => editor?.chain().focus().toggleItalic().run()}
              >
                <ItalicIcon className=" size-4 mr-2" />
                <i>Italic</i>
                <MenubarShortcut>Ctrl+I</MenubarShortcut>
              </MenubarItem>
              <MenubarItem
                onClick={() => editor?.chain().focus().toggleStrike().run()}
              >
                <StrikethroughIcon className=" size-4 mr-2" />
                <del>Strikethrough</del>
                <MenubarShortcut>Ctrl+Shift+S</MenubarShortcut>
              </MenubarItem>
              <MenubarItem
                onClick={() => editor?.chain().focus().toggleUnderline().run()}
              >
                <UnderlineIcon className=" size-4 mr-2" />
                <u>Underline</u>
                <MenubarShortcut>Ctrl+U</MenubarShortcut>
              </MenubarItem>
            </MenubarSubContent>
          </MenubarSub>
          <MenubarItem
            onClick={() => editor?.chain().focus().unsetAllMarks().run()}
          >
            <RemoveFormattingIcon className=" size-4 mr-2" />
            Clear formatting
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
}

export default MenubarComponent;
