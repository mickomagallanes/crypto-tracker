interface Coin {
  id: string;
  name: string;
  api_symbol: string;
  symbol: string;
  market_cap_rank: number;
  thumb: string;
  large: string;
}

type SearchCoinObject = Coin;

interface Exchange {
  id: string;
  name: string;
  market_type: string;
  thumb: string;
  large: string;
}

interface Category {
  id: number;
  name: string;
}

type NFT = Omit<Exchange, "market_type">;

interface SearchResult {
  coins: Coin[];
  exchanges: Exchange[];
  icos: string[];
  categories: Category[];
  nfts: NFT[];
}
