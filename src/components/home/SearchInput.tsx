"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SearchIcon, XIcon } from "lucide-react";
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import { useSearchParam } from "@/hooks/useSearchParams";

function SearchInput() {
  const [search, setSearch] = useSearchParam("search");
  const [value, setValue] = useState<string>(search);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  const handleClear = () => {
    setValue("");
    setSearch("");
    inputRef.current?.blur();
  };
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearch(value);
    inputRef.current?.blur();
  };
  return (
    <div className=" flex-1 flex  items-center justify-center">
      <form onSubmit={handleSubmit} className=" relative max-w-[720px] w-full">
        <Input
          type="text"
          value={value}
          onChange={handleChange}
          ref={inputRef}
          placeholder="Search"
          className="w-full md:text-base placeholder:text-neutral-800 px-14 border-none 
          focus-visible:shadow-[0_1px_1px_0_rgba(65,69,73,.3),0_1px_3px_1px_rgba(65,69,73,.15)] bg-[#F0F4F8]
          rounded-full h-[48px] focus-visible:ring-0 focus:bg-white
          "
        />
        <Button
          type="submit"
          variant={"ghost"}
          size={"icon"}
          className="absolute left-3 top-1/2 -translate-y-1/2 h-full [&_svg]:size-5 rounded-full"
        >
          <SearchIcon />
        </Button>
        {value && (
          <Button
            type="button"
            variant={"ghost"}
            size={"icon"}
            className="absolute right-3 top-1/2 -translate-y-1/2 h-full [&_svg]:size-5 rounded-full"
            onClick={handleClear}
          >
            <XIcon />
          </Button>
        )}
      </form>
    </div>
  );
}

export default SearchInput;
