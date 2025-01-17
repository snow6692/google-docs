import { useEditorStore } from "@/store/useEditorStore";
import { type ColorResult, SketchPicker } from "react-color";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { HighlighterIcon } from "lucide-react";

function Highlight() {
  const { editor } = useEditorStore();
  const value = editor?.getAttributes("highlight")?.color || "#ffffff";
  const onchange = (color: ColorResult) => {
    editor?.chain().focus().setHighlight({ color: color.hex }).run();
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="h-7 w-7 shrink-0 flex items-center flex-col justify-center rounded-full  hover:bg-neutral-200/80 overflow-hidden text-sm">
          <HighlighterIcon
            style={{
              backgroundColor: value || "#ffffff",
            }}
          />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-0 ">
        <SketchPicker color={value} onChange={onchange} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default Highlight;
