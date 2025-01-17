import { useEditorStore } from "@/store/useEditorStore";
import { type ColorResult, SketchPicker } from "react-color";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

function TextColor() {
  const { editor } = useEditorStore();
  const value = editor?.getAttributes("textStyle").color || "#000000";
  const onchange = (color: ColorResult) => {
    editor?.chain().focus().setColor(color.hex).run();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="h-7 min-w-7 shrink-0 flex items-center flex-col justify-center rounded-full  hover:bg-neutral-200/80 overflow-hidden text-sm">
          <span className=" text-xs">A</span>
          <div className="h-0.5 w-full" style={{ backgroundColor: value }} />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-0 ">
        <SketchPicker color={value} onChange={onchange} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default TextColor;
