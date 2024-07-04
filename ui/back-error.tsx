import Link from "next/link";
import React from "react";

export default function BackError() {
  return (
    <Link
      href="/"
      className="my-4 inline-flex rounded-lg bg-gradient-to-r from-blue-500 via-purple-500 to-pink-600 px-5 py-2.5 text-center text-sm font-medium text-white focus:outline-none focus:ring-4"
    >
      Back to Homepage
    </Link>
  );
}
