interface Coin {
  id: string;
  name: string;
  api_symbol: string;
  symbol: string;
  market_cap_rank: number;
  thumb: string;
  large: string;
}

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

interface NFT {
  id: string;
  name: string;
  symbol: string;
  thumb: string;
}

interface SearchResult {
  coins: Coin[];
  exchanges: Exchange[];
  icos: string[];
  categories: Category[];
  nfts: NFT[];
}

interface SearchCoinObject {
  id: string;
  name: string;
  api_symbol: string;
  symbol: string;
  market_cap_rank: number;
  thumb: string;
  large: string;
}
