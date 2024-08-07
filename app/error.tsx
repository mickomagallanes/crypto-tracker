"use client";

export default function Error() {
  return (
    <div className="container mx-auto flex h-full items-center justify-center pt-10">
      <div className="mx-3 max-w-screen-sm text-center">
        <p className="mb-4 text-3xl font-bold tracking-tight ">
          An error occurred!
        </p>
        <p className="mb-4 text-lg font-light text-gray-400">
          Please try refreshing, or come back later
        </p>
      </div>
    </div>
  );
}
