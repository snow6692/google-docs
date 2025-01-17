"use client";
import { useEditorStore } from "@/store/useEditorStore";
import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Link2Icon } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

function LinkButton() {
  const { editor } = useEditorStore();
  const [value, setValue] = useState("");
  const onchange = (href: string) => {
    editor?.chain().focus().extendMarkRange("link").setLink({ href }).run();
    setValue("");
  };
  return (
    <DropdownMenu
      onOpenChange={(open) =>
        open && setValue(editor?.getAttributes("link")?.href || "")
      }
    >
      <DropdownMenuTrigger asChild>
        <button className="h-7 w-7 shrink-0 flex items-center flex-col justify-center rounded-full  hover:bg-neutral-200/80 overflow-hidden text-sm">
          <Link2Icon />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-2.5 flex items-center gap-x-2 ">
        <Input
          placeholder="https://example.com"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <Button onClick={() => onchange(value)}>Apply</Button>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default LinkButton;
