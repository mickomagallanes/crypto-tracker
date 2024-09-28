import Performance from "./(ui)/(perf)";

import AddHoldings from "./(ui)/(add)/add-holdings";
import Holdings from "./(ui)/(holdings)";

export default function Portfolio() {
  return (
    <div
      className="mt-2 flex flex-col gap-12 px-2 sm:px-3 md:px-4 
    lg:grid lg:grid-cols-4 
    lg:px-6 "
    >
      <div className="col-span-2 flex flex-col gap-7">
        <h2 className="text-xl">Performance</h2>
        <Performance />
      </div>
      <div className="col-span-2 flex flex-col gap-7">
        <h2 className="text-xl">Holdings</h2>
        <Holdings />
      </div>

      <div className="col-span-4 flex flex-col items-center justify-center">
        <AddHoldings />
      </div>
    </div>
  );
}
