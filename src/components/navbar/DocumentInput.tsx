"use client";
import { useMutation } from "convex/react";
import { ChangeEvent, FormEvent, useRef, useState } from "react";
import { BsCloudCheck, BsCloudSlash } from "react-icons/bs";
import { api } from "../../../convex/_generated/api";
import { useDebounce } from "@/hooks/use-debounce";
import { Id } from "../../../convex/_generated/dataModel";
import { toast } from "sonner";
import { useStatus } from "@liveblocks/react";
import { LoaderIcon } from "lucide-react";
interface IProps {
  title: string;
  id: Id<"documents">;
}
function DocumentInput({ title, id }: IProps) {
  const status = useStatus();
  const [value, setValue] = useState(title);
  const [isPending, setIsPending] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const mutate = useMutation(api.documents.updateById);
  const debounceUpdate = useDebounce((newValue: string) => {
    if (newValue === title) return;

    setIsPending(true);
    mutate({ id, title: newValue })
      .then(() => {
        toast.success("Document updated");
      })
      .catch(() => toast.error("Something went wrong"))
      .finally(() => setIsPending(false));
  });

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);

    debounceUpdate(newValue);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsPending(true);
    mutate({ id, title: value })
      .then(() => {
        toast.success("Document updated");
        setIsEditing(false);
      })
      .catch(() => toast.error("Something went wrong"))
      .finally(() => setIsPending(false));
  };

  const showLoader =
    isPending || status === "connecting" || status === "reconnecting";
  const showError = status === "disconnected";
  return (
    <div className=" flex items-center gap-2">
      {isEditing ? (
        <form
          onSubmit={handleSubmit}
          className="relative w-fit max-w-[50ch] text-lg"
          action=""
        >
          <span className=" invisible whitespace-pre px-1.5 ">
            {value || " "}
          </span>
          <input
            className=" absolute inset-0 text-lg text-black px-1.5 bg-transparent truncate"
            type="text"
            ref={inputRef}
            value={value}
            onChange={onChange}
            onBlur={() => setIsEditing(false)}
          />
        </form>
      ) : (
        <span
          onClick={() => {
            setIsEditing(true);
            setTimeout(() => {
              inputRef.current?.focus();
            }, 0);
            setIsPending(true);
          }}
          className=" text-lg px-1.5 cursor-pointer truncate"
        >
          {title}
        </span>
      )}
      {!showLoader && !showLoader && <BsCloudCheck className=" size-4" />}
      {showLoader && (
        <LoaderIcon className=" size-4 animate-spin  text-muted-foreground" />
      )}
      {showError && <BsCloudSlash className=" size-4" />}
    </div>
  );
}

export default DocumentInput;
