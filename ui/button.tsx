import React, { ReactNode } from "react";

export default function Button({
  label,
  onClick = () => {},
  icon,
}: {
  label: string;
  onClick?: () => void;
  icon?: ReactNode;
}) {
  return (
    <button
      onClick={() => onClick()}
      className="my-4 flex flex-row items-center gap-1 rounded-lg bg-gradient-to-r from-blue-500 via-purple-500 to-pink-600
 px-5 py-2.5 text-center text-sm font-medium text-white focus:outline-none focus:ring-4"
      type="button"
    >
      {icon !== undefined && icon}
      {label}
    </button>
  );
}
