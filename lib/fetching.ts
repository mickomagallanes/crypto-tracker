import { GET_OPTIONS } from "@/lib/utils";

export async function fetchCoinData(id: string) {
  return fetch(
    `${process.env.API_URL}/coins/${id}?localization=false&tickers=false&community_data=false&developer_data=false&x_cg_demo_api_key=${process.env.API_KEY}`,
    {
      ...GET_OPTIONS,
      cache: "no-store",
    },
  );
}
