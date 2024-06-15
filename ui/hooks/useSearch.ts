import { GET_OPTIONS } from "@/lib/utils";

export default async function useSearch(searchQuery: string) {
  if (searchQuery === "") {
    return null;
  } else {
    const resp = await fetch(
      `${process.env.API_URL}/search?${searchQuery}&x_cg_demo_api_key=${process.env.API_KEY}`,
      {
        cache: "no-store",
        ...GET_OPTIONS,
      },
    );
    return await resp.json();
  }
}
