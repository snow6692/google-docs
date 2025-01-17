"use client";
import Align from "@/components/tools/Align";
import FontFamilyButton from "@/components/tools/FontFamilyButton";
import FontSizeButton from "@/components/tools/FontSizeButton";
import HeadingLevelButton from "@/components/tools/HeadingLevelButton";
import Highlight from "@/components/tools/Highlight";
import ImageButton from "@/components/tools/ImageButton";
import LineHeightButton from "@/components/tools/LineHeightButton";
import LinkButton from "@/components/tools/LinkButton";
import List from "@/components/tools/List";
import TextColor from "@/components/tools/TextColor";
import ToolbarButton from "@/components/tools/ToolbarButton";
import { Separator } from "@/components/ui/separator";
import { useEditorStore } from "@/store/useEditorStore";
import {
  Bold,
  ItalicIcon,
  ListTodoIcon,
  LucideIcon,
  MessageSquarePlusIcon,
  PrinterIcon,
  Redo2Icon,
  RemoveFormattingIcon,
  SpellCheckIcon,
  UnderlineIcon,
  Undo2Icon,
} from "lucide-react";

interface ISection {
  label: string;
  icon: LucideIcon;
  onClick: () => void;
  isActive?: boolean;
}
function Toolbar() {
  const { editor } = useEditorStore();

  const sections: ISection[][] = [
    [
      {
        label: "undo",
        icon: Undo2Icon,
        onClick: () => editor?.chain().focus().undo().run(),
      },
      {
        label: "Redo",
        icon: Redo2Icon,
        onClick: () => editor?.chain().focus().redo().run(),
      },
      {
        label: "Print",
        icon: PrinterIcon,
        onClick: () => window.print(),
      },
      {
        label: "Spell Check",
        icon: SpellCheckIcon,
        isActive: false,

        onClick: () => {
          const current = editor?.view.dom.getAttribute("spellcheck");
          editor?.view.dom.setAttribute(
            "spellcheck",
            current === "false" ? "true" : "false"
          );
        },
      },
    ],
    [
      {
        label: "Bold",
        icon: Bold,
        onClick: () => editor?.chain().focus().toggleBold().run(),
        isActive: editor?.isActive("bold"),
      },
      {
        label: "Italic",
        icon: ItalicIcon,
        onClick: () => editor?.chain().focus().toggleItalic().run(),
        isActive: editor?.isActive("italic"),
      },
      {
        label: "Underline",
        icon: UnderlineIcon,
        onClick: () => editor?.chain().focus().toggleUnderline().run(),
        isActive: editor?.isActive("underline"),
      },
    ],
    [
      {
        label: "Comment",
        icon: MessageSquarePlusIcon,
        onClick: () => editor?.chain().focus().addPendingComment().run(),
        isActive: editor?.isActive("liveblocksCommentMark"), //TODO: Enable this functionality
      },
      {
        label: "List Todo",
        icon: ListTodoIcon,
        onClick: () => editor?.chain().focus().toggleTaskList().run(),
        isActive: editor?.isActive("taskList"),
      },
      {
        label: "Remove Formatting",
        icon: RemoveFormattingIcon,
        onClick: () => editor?.chain().focus().unsetAllMarks().run(),
      },
    ],
  ];
  return (
    <div className="bg-[#f1f4f9] px-2.5 py-0.5 rounded-[40px] min-h-10 gap-x-0.5 overflow-x-auto flex   items-center justify-start print:hidden   ">
      {sections[0].map((item) => (
        <ToolbarButton key={item.label} {...item} />
      ))}
      <Separator orientation="vertical" className=" h-6 bg-neutral-300" />

      <FontFamilyButton />

      <Separator orientation="vertical" className=" h-6 bg-neutral-300" />

      <HeadingLevelButton />
      <Separator orientation="vertical" className=" h-6 bg-neutral-300" />
      <FontSizeButton />
      <Separator orientation="vertical" className=" h-6 bg-neutral-300" />
      {sections[1].map((item) => (
        <ToolbarButton key={item.label} {...item} />
      ))}
      <TextColor />
      <Highlight />
      <Separator orientation="vertical" className=" h-6 bg-neutral-300" />
      <LinkButton />
      <ImageButton />
      <Align />
      <List />
      <LineHeightButton />
      {sections[2].map((item) => (
        <ToolbarButton key={item.label} {...item} />
      ))}
    </div>
  );
}

export default Toolbar;
