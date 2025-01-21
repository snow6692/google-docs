"use client";
import { Preloaded, usePreloadedQuery } from "convex/react";
import Editor from "../../../components/Editor";
import Navbar from "../../../components/navbar/Navbar";
import Toolbar from "../../../components/tools/Toolbar";
import { Room } from "./Room";
import { api } from "../../../../convex/_generated/api";

interface DocumentProps {
  preloadedDocument: Preloaded<typeof api.documents.getById>;
}

export function Document({ preloadedDocument }: DocumentProps) {
  const document = usePreloadedQuery(preloadedDocument);
  return (
    <Room>
      <div className="min-h-screen bg-[#fafbfd]">
        <div className=" flex flex-col px-4 pt-2 gap-y-2 fixed top-0 left-0 right-0 z-10 bg-[#fafbfd] print:hidden">
          <Navbar data={document} />
          <Toolbar />
        </div>
        <div className=" pt-[114px] print:pt-0 ">
          <Editor initialContent={document.initialContent} />
        </div>
      </div>
    </Room>
  );
}
