import {  Loader2Icon } from "lucide-react";
import React from "react";

interface IProps{
    label?: string;
}
function Loader({label}: IProps) {
  return (
    <div className=" min-h-screen flex flex-col items-center justify-center ">
      <Loader2Icon className="animate-spin size-10 text-blue-500" />
      {label && <span className="text-gray-500">{label}</span>}
    </div>
  );
}

export default Loader;
