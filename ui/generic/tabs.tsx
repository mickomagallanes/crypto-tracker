import React from "react";

export default function Tabs() {
  return (
    <ul className="flex flex-row flex-wrap gap-3 bg-gray-800 text-center">
      <li>
        <a href="#">1D</a>
      </li>
      <li>
        <a href="#">7D</a>
      </li>
      <li>
        <a href="#">1M</a>
      </li>
      <li>
        <a href="#">3M</a>
      </li>
      <li>
        <a href="#">1Y</a>
      </li>
    </ul>
  );
}
