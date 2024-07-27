"use client";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import React, { ReactNode, useEffect } from "react";

export default function Modal({
  children,
  header = "",
  isOpen = false,
  onClose = () => {},
}: {
  children: ReactNode;
  header?: ReactNode | "";
  isOpen?: boolean;
  onClose?: () => void;
}) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  return (
    <>
      <div
        id="default-modal"
        aria-hidden="true"
        className={cn(
          `fixed inset-0 z-50 max-h-full 
           w-full items-center justify-center overflow-y-auto 
           overflow-x-hidden bg-gray-900/70 transition-all
           sm:p-6 lg:py-12`,
          !isOpen && "hidden",
        )}
      >
        <div className="mx-auto rounded-md bg-gray-800 px-2 shadow-lg sm:w-5/6 md:w-3/4 md:px-4 lg:w-7/12 xl:w-1/2">
          <div className="flex w-full justify-between pt-4">
            <h2 className="m-1 py-1 pl-3 text-xl font-bold">{header}</h2>
            <span
              onClick={onClose}
              className="m-1 flex cursor-pointer items-center rounded-lg px-1 hover:bg-gray-900 hover:text-purple-500"
            >
              <X size={21} />
            </span>
          </div>
          <div className="p-4">{children}</div>
        </div>
      </div>
    </>
  );
}
