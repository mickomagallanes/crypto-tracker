import GLOBAL_ICONS from "@/lib/icons";
import { cn } from "@/lib/utils";
import React from "react";

// the red or green arrow beside price
export default function PriceChange({
  price,
  cName = "",
}: {
  price: number;
  cName?: string;
}) {
  return (
    <div className={cn("flex flex-row items-center", cName)}>
      <i className="ml-2 mr-1 text-6xl sm:text-sm">
        {price < 0 ? GLOBAL_ICONS.caretDownSm : GLOBAL_ICONS.caretUpSm}
      </i>
      <p className={cn("mr-2", price < 0 ? "text-red-600" : "text-green-500")}>
        {Math.abs(price).toFixed(2)}%
      </p>
    </div>
  );
}
