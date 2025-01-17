import { useEditorStore } from "@/store/useEditorStore";
import { AlignCenterIcon, AlignLeftIcon, AlignRightIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { cn } from "@/lib/utils";

function LineHeightButton() {
  const { editor } = useEditorStore();
  const alignments = [
    {
      label: "Align left",
      value: "left",
      icon: AlignLeftIcon,
    },

    {
      label: "Align center",
      value: "center",
      icon: AlignCenterIcon,
    },
    {
      label: "Align right",
      value: "right",
      icon: AlignRightIcon,
    },
    {
      label: "Align justify",
      value: "justify",
      icon: AlignRightIcon,
    },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="h-7 w-7 shrink-0 flex items-center flex-col justify-center rounded-full  hover:bg-neutral-200/80 overflow-hidden text-sm">
          <AlignLeftIcon className="size-4" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-1  flex flex-col gap-y-1">
        {alignments.map(({ label, icon: Icon, value }) => (
          <button
            key={value}
            onClick={() => editor?.chain().focus().setTextAlign(value).run()}
            className={cn(
              "flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/80",
              editor?.isActive({ textAlign: value }) && "bg-neutral-200/80"
            )}
          >
            <Icon className=" size-4" />
            <span className="text-sm">{label}</span>
          </button>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default LineHeightButton;
