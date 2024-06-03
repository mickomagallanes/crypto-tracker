import Image from "next/image";
import React from "react";

export default function Card() {
  // TODO: night mode to whole app, put suspense each card for img load
  return (
    <a href="#" className="flex max-w-sm flex-col p-7 hover:bg-neutral-900">
      <img
        className=""
        src="https://res.heraldm.com/content/image/2024/06/03/20240603050058_0.jpg"
        alt=""
      />

      <h5 className="mb-1 mt-3 text-xl text-white">
        Noteworthy technology acquisitions 2021
      </h5>
      <p className="text-sm text-gray-400">
        Here are the biggest enterprise technology acquisitions of 2021 so far,
        in reverse chronological order.
      </p>
    </a>
  );
}
