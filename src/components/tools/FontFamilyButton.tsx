"use client";
import { useEditorStore } from "@/store/useEditorStore";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { ChevronDownIcon } from "lucide-react";
interface IFontsFamily {
  label: string;
  value: string;
}
function FontFamilyButton() {
  const { editor } = useEditorStore();
  const fonts: IFontsFamily[] = [
    { label: "Arial", value: "Arial" },
    { label: "Arial Black", value: "Arial Black" },
    { label: "Comic Sans MS", value: "Comic Sans MS" },
    { label: "Courier New", value: "Courier New" },

    { label: "Impact", value: "Impact" },
    { label: "Lucida Sans Unicode", value: "Lucida Sans Unicode" },
    { label: "Tahoma", value: "Tahoma" },
    { label: "Times New Roman", value: "Times New Roman" },
    { label: "Trebuchet MS", value: "Trebuchet MS" },
    { label: "Verdana", value: "Verdana" },

    { label: "MS Sans Serif", value: "MS Sans Serif" },
    { label: "MS Serif", value: "MS Serif" },
    { label: "Symbol", value: "Symbol" },

    { label: "Courier", value: "Courier" },
    { label: "Times", value: "Times" },
  ];
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="h-7 w-[120px] shrink-0 flex items-center justify-between rounded-sm  hover:bg-neutral-200/80 overflow-hidden text-sm">
          <span className=" truncate ">
            {editor?.getAttributes("textStyle").fontFamily || "Arial"}
          </span>
          <ChevronDownIcon className=" ml-2 size-4  shrink-0" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-1 flex flex-col gap-y-1">
        {fonts.map(({ label, value }) => (
          <button
            onClick={() => editor?.chain().focus().setFontFamily(value).run()}
            className={cn(
              "flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/80",
              editor?.getAttributes("textStyle").fontFamily === value &&
                "bg-neutral-200/80"
            )}
            key={value}
            style={{ fontFamily: value }}
          >
            <span className="text-sm"> {label}</span>
          </button>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default FontFamilyButton;
