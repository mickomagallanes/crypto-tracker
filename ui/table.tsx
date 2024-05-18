import React from "react";

export default function Table() {
  return (
    <table>
      <thead>
        <tr>
          <td>#</td>
          <td>#</td>
          <td>#</td>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="py-2 text-center">
            <div className="h-6 w-32 animate-pulse rounded-md bg-gray-200"></div>
          </td>
          <td className="py-2 text-center">
            <div className="h-6 w-32 animate-pulse rounded-md bg-gray-200"></div>
          </td>
          <td className="py-2 text-center">
            <div className="h-6 w-32 animate-pulse rounded-md bg-gray-200"></div>
          </td>
        </tr>
        <tr>
          <td className="py-2 text-center">
            <div className="h-6 w-32 animate-pulse rounded-md bg-gray-200"></div>
          </td>
          <td className="py-2 text-center">
            <div className="h-6 w-32 animate-pulse rounded-md bg-gray-200"></div>
          </td>
          <td className="py-2 text-center">
            <div className="h-6 w-32 animate-pulse rounded-md bg-gray-200"></div>
          </td>
        </tr>
      </tbody>
    </table>
  );
}
