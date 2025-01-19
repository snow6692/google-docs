"use client";
import { ClientSideSuspense } from "@liveblocks/react";

import InboxMenu from "./InboxMenu";
import { Button } from "@/components/ui/button";
import { BellIcon } from "lucide-react";
import { Separator } from "@/components/ui/separator";
function Inbox() {
  return (
    <ClientSideSuspense
      fallback={
        <>
          <Button
            variant={"ghost"}
            className=" relative"
            size={"icon"}
            disabled
          >
            <BellIcon className=" size-5" />
          </Button>
          <Separator orientation="vertical" className=" h-6" />
        </>
      }
    >
      <InboxMenu />
    </ClientSideSuspense>
  );
}

export default Inbox;
