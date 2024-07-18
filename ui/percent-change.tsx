import GLOBAL_ICONS from "@/lib/icons";
import { cn } from "@/lib/utils";
import React from "react";

// the red or green arrow beside price percent
export default function PercentChange({
  percent,
  cName = "",
}: {
  percent: number;
  cName?: string;
}) {
  return (
    <div className={cn("flex flex-row items-center", cName)}>
      <i className="ml-2 mr-1">
        {percent < 0 ? GLOBAL_ICONS.caretDownSm : GLOBAL_ICONS.caretUpSm}
      </i>
      <p
        className={cn("mr-2", percent < 0 ? "text-red-600" : "text-green-500")}
      >
        {Math.abs(percent).toFixed(2)}%
      </p>
    </div>
  );
}
