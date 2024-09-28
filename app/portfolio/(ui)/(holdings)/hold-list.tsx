"use client";
import PercentChange from "@/ui/percent-change";

export default function HoldList() {
  return (
    <div className="flex w-full flex-col">
      <div className="grid grid-cols-9 gap-3">
        <span className="col-span-1 bg-yellow-500"></span>
        <p className="col-span-2">XRP</p>
        <p className="col-span-2">60%</p>
        <p className="col-span-2">$76</p>
        <PercentChange
          cName="text-sm px-0 bg-opacity-20 col-span-2 rounded-md"
          percent={2}
        />
      </div>
    </div>
  );
}
