"use client";
import { ChevronDown, ChevronUp } from "lucide-react";
import React, { FormEvent, useState } from "react";
import useToggle from "./hooks/useToggle";
import { cn } from "@/lib/utils";

interface SelectSearchOptions {
  label: string;
  value: string | number;
  imgSrc?: string | null;
}

type PassedInput = SelectSearchOptions["value"];

export default function SelectSearch({
  onInput,
  options,
  placeholder = "",
  elemId = "",
}: {
  onInput: (eventVal: FormEvent<HTMLInputElement> | PassedInput) => void;
  options: SelectSearchOptions[];
  placeholder?: string;
  elemId?: string;
}) {
  const [isOpen, selectToggle, setIsOpen] = useToggle();
  const [value, setValue] = useState<string | number>("");

  const onClickOption = (value: PassedInput) => {
    const matchedOption = options.find((opt) => opt.value === value);
    onInput(value);
    setValue(matchedOption ? matchedOption.label : value);
  };

  return (
    <div
      className="relative flex w-full flex-col items-center justify-center gap-1"
      onClick={selectToggle}
    >
      <div className="flex w-full rounded-md border border-gray-200 bg-white p-1">
        <input
          placeholder={placeholder}
          className="w-full appearance-none p-1 px-2 text-[#2E2E2E] outline-none"
          onInput={(e: React.FormEvent<HTMLInputElement>) => {
            onInput((e.target as HTMLInputElement).value);
            setValue((e.target as HTMLInputElement).value);
            setIsOpen(true);
          }}
          value={value}
          id={elemId}
        />
        <div className="flex w-8 items-center border-l border-gray-200 py-1 pl-2 pr-1 text-gray-300">
          <button className="flex cursor-pointer justify-center text-gray-600 outline-none focus:outline-none">
            {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </button>
        </div>
      </div>

      <div
        className={cn(
          `absolute left-0 top-full z-40 mt-1 flex w-full cursor-pointer flex-col overflow-y-auto
        rounded bg-white p-0 text-[#6E6E6E] shadow`,
          !isOpen && "hidden",
          options.length ? "max-h-64" : "h-24 justify-center",
        )}
      >
        {options.length ? (
          options.map((opt) => (
            <Option
              onClick={onClickOption}
              key={opt.value}
              label={opt.label}
              value={opt.value}
              imgSrc={opt.imgSrc}
            />
          ))
        ) : (
          <p className="mb-4 flex justify-center text-lg">No results found</p>
        )}
      </div>
    </div>
  );
}

const Option = ({
  label,
  value,
  onClick,
  imgSrc = null,
}: SelectSearchOptions & { onClick: (val: PassedInput) => void }) => {
  return (
    <div
      className="m-0 flex w-full cursor-pointer items-center rounded-t
        py-2 hover:bg-purple-500/20"
      onClick={() => onClick(value)}
    >
      <div
        className="m-1 ml-2 mr-0 flex size-4 w-7 items-center 
          justify-center rounded-full "
      >
        <img className="rounded-full" alt={label} src={imgSrc} />
      </div>

      <div className="flex w-full items-center">
        <div className="mx-2">{label}</div>
      </div>
    </div>
  );
};
