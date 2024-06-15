import NewsCards from "@/app/news/(ui)/news-cards";
import React, { Suspense } from "react";
import Main from "./main";

export default async function News({
  searchParams,
}: {
  searchParams: { search: string };
}) {
  const searchQuery: string = searchParams.search
    ? `query=${searchParams.search}`
    : "";

  /**
   * Why did I do this? You might be wondering why I am not fetching here, and
   * I instead made another component for the data fetching?
   *
   * Well it's because the route change is getting delayed on the page, it's annoying
   * And searchParams changed does not trigger loading here that my hack for it is too long
   *
   * I am waiting for the partial rendering thing, I hope that fixes everything
   */
  return (
    <div className="mx-auto xl:container">
      <Suspense key={searchQuery} fallback={<NewsCards isLoading={true} />}>
        <Main searchQuery={searchQuery} />
      </Suspense>
    </div>
  );
}
