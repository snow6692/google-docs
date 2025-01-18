"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import DocumentInput from "./DocumentInput";
import MenubarComponent from "./MenubarComponent";
import { OrganizationSwitcher, UserButton } from "@clerk/nextjs";
import Avatars from "@/app/documents/[documentId]/Avatars";

function Navbar() {
  return (
    <nav className=" flex items-center justify-between">
      <div className=" flex gap-2 items-center">
        <Link href="/">
          <Image src="/logo.svg" alt="Logo" width={36} height={36} />
        </Link>
        <div className=" flex flex-col">
          <DocumentInput />
          <div className="flex">
            <MenubarComponent />
          </div>
        </div>
      </div>
      <div className=" flex gap-3 items-center pl-6">
        <Avatars />
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
