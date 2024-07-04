import { Suspense } from "react";
import Main from "./main";
import TableSkeleton from "@/ui/skeleton/table-skeleton";

const cryptoColumnsLoading = [
  { header: "#", key: "id" },
  {
    header: "Name",
    key: "name",
  },
  {
    header: "24h %",
    key: "24h",
  },
  {
    header: "Price",
    key: "price",
  },
];

export default async function Home({
  searchParams,
}: {
  searchParams: { search: string };
}) {
  const searchQuery = searchParams.search ? `query=${searchParams.search}` : "";

  return (
    <div className="mx-auto lg:px-24">
      <Suspense
        key={searchQuery}
        fallback={<TableSkeleton columns={cryptoColumnsLoading} />}
      >
        <Main searchQuery={searchQuery} />
      </Suspense>
    </div>
  );
}
