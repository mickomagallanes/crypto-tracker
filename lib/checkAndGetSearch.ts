import { fetchSearch } from "@/lib/fetching";

export default async function checkAndGetSearch(
  searchQuery: string,
): Promise<Nullable<SearchResult>> {
  if (searchQuery === "") {
    return new Promise(function (resolve) {
      resolve(null);
    });
  } else {
    return await fetchSearch(searchQuery);
  }
}
