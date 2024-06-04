import { fetchSearchResults } from "@/lib/utils";

export default async function useSearch(searchParams: { search: string }) {
  const searchQuery = searchParams.search ? `query=${searchParams.search}` : "";
  let result: Promise<Response>;

  if (searchParams.search) {
    result = fetchSearchResults(searchQuery);
  } else {
    result = Promise.resolve(
      new Response(JSON.stringify(null), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }),
    );
  }

  return result;
}
