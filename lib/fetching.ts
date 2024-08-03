// import "server-only"; TODO: temporary, move or create new functions used by react query

export const GET_OPTIONS = {
  method: "GET",
  headers: { accept: "application/json" },
};

export async function fetchWithError<T>(
  url: string,
  options: any = { next: { revalidate: 3600 * 24 } }, // revalidate data every 24 hours
): Promise<T> {
  try {
    const resp = await fetch(`${url}`, {
      ...GET_OPTIONS,
      ...options,
    });
    if (!resp.ok) {
      throw new Error("Error has occurred");
    } else {
      return await resp.json();
    }
  } catch (error) {
    throw error;
  }
}

const shouldRetry = (status: number) => {
  if (status >= 500 && status < 600) {
    return true; // Retry on server errors (5xx)
  }

  return false; // Do not retry on client errors (4xx) or other non-retriable errors
};

export async function fetchNewsData(query: string): Promise<APINewsObject> {
  const url = `${process.env.API_URL_NEWS}?apikey=${process.env.API_KEY_NEWS}&language=en&${query}`;
  const option = { next: { revalidate: 3600 * 3 } }; // revalidate data every 3 hours

  return await fetchWithError<APINewsObject>(url, option);
}

export async function fetchMarketData(query: string): Promise<APIMarketData> {
  const url = `${process.env.API_URL}/coins/markets?vs_currency=usd${query}&
      price_change_percentage=24h
      &per_page=250&
      order=market_cap_rank&x_cg_demo_api_key=${process.env.API_KEY}`;
  const option = { cache: "no-store" };

  return await fetchWithError<APIMarketData>(url, option);
}

export async function fetchCoinData(id: string): Promise<APICoinData> {
  const url = `${process.env.API_URL}/coins/${id}?localization=false&tickers=false&community_data=false&developer_data=false&x_cg_demo_api_key=${process.env.API_KEY}`;
  const option = { cache: "no-store" };

  return await fetchWithError<APICoinData>(url, option);
}

export async function fetchHistData(
  symbol: string,
  days: string,
): Promise<APIHistData> {
  const url = `${process.env.API_URL}/coins/${symbol}/market_chart?days=${days}&vs_currency=usd&x_cg_demo_api_key=${process.env.API_KEY}`;
  const option = { cache: "no-store" };

  return await fetchWithError<APIHistData>(url, option);
}

export async function fetchSearch(searchQuery: string): Promise<SearchResult> {
  const url = `${process.env.API_URL}/search?${searchQuery}&x_cg_demo_api_key=${process.env.API_KEY}`;
  const option = { cache: "no-store" };

  return await fetchWithError<SearchResult>(url, option);
}

export async function fetchMarketPortfolio(
  query: string,
): Promise<APIMarketData> {
  const url = `${process.env.API_URL}/coins/markets?vs_currency=usd${query}
      &per_page=250&
      order=market_cap_rank&x_cg_demo_api_key=${process.env.API_KEY}`;
  const option = { cache: "no-store" };

  return await fetchWithError<APIMarketData>(url, option);
}
