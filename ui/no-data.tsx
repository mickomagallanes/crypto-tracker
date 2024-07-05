import React from "react";

export default function NoData() {
  return (
    <div className="container mx-auto flex h-full items-center justify-center pt-10">
      <div className="mx-3 max-w-screen-sm text-center">
        <p className="mb-4 text-3xl font-bold tracking-tight ">
          No results found
        </p>
        <p className="mb-4 text-lg font-light text-gray-400">
          Try to change your search keywords
        </p>
      </div>
    </div>
  );
}
