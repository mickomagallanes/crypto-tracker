import GLOBAL_ICONS from "@/lib/icons";
import { cn, formatMoney } from "@/lib/utils";
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
      <p className={cn("mr-2", price < 0 ? "text-red-600" : "text-green-500")}>
        {formatMoney(+Math.abs(price).toFixed(2))}
      </p>
    </div>
  );
}
