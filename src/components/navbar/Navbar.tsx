"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import DocumentInput from "./DocumentInput";
import MenubarComponent from "./MenubarComponent";
import { OrganizationSwitcher, UserButton } from "@clerk/nextjs";
import Avatars from "../document/Avatars";
import Inbox from "../document/Inbox";
import { Doc } from "../../../convex/_generated/dataModel";

interface NavbarProps {
  data: Doc<"documents">;
}

function Navbar({ data }: NavbarProps) {
  return (
    <nav className="  flex flex-col gap-y-5 md:gap-y-0 md:flex-row md:items-center md:justify-between ">
      <div className=" flex gap-2 items-center">
        <Link href="/">
          <Image src="/logo.svg" alt="Logo" width={36} height={36} />
        </Link>
        <div className=" flex flex-col">
          <DocumentInput title={data.title} id={data._id} />
          <div className="flex">
            <MenubarComponent data={data} />
          </div>
        </div>
      </div>
      <div className=" flex gap-3 items-center pl-6 mb-4 md:mb-0">
        <Avatars />
        <Inbox />
        <OrganizationSwitcher
          afterCreateOrganizationUrl="/"
          afterLeaveOrganizationUrl="/"
          afterSelectOrganizationUrl="/"
          afterSelectPersonalUrl="/"
        />
        <UserButton />
      </div>
    </nav>
  );
}

export default Navbar;
