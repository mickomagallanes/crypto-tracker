interface MarketRoi {
  times: numOrNull;
  currency: strOrNull;
  percentage: numOrNull;
}

interface MarketObject {
  id: string;
  symbol: strOrNull;
  name: strOrNull;
  image: strOrNull;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  fully_diluted_valuation: number;
  total_volume: number;
  high_24h: number;
  low_24h: number;
  price_change_24h: number;
  price_change_percentage_24h: number;
  price_change_percentage_24h_in_currency: number;
  price_change_percentage_7d_in_currency: number;
  price_change_percentage_30d_in_currency: number;
  price_change_percentage_60d_in_currency: number;
  price_change_percentage_200d_in_currency: number;
  price_change_percentage_1y_in_currency: number;
  market_cap_change_24h: number;
  market_cap_change_percentage_24h: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  ath: number;
  ath_change_percentage: number;
  ath_date: strOrNull;
  atl: number;
  atl_change_percentage: number;
  atl_date: strOrNull;
  roi: MarketRoi | null;
  last_updated: strOrNull;
}

type APIMarketData = MarketObject[];
interface TransformedMarket {
  id: number;
  coinId: strOrNull;
  name: strOrNull;
  symbol: strOrNull;
  image: string;
  price: numOrNull;
  marketCap: numOrNull;
  "24h": numOrNull;
}

type CoinDayKey = "24h" | "7d" | "30d" | "60d" | "200d" | "1y";

interface CoinImage {
  thumb: string;
  small: string;
  large: string;
}

interface CoinPlatforms {
  [key: string]: string | null;
}

interface CoinDetailPlatforms {
  [key: string]: {
    contract_address: string | null;
  };
}

interface CoinLocalization {
  [key: string]: string;
}

interface CoinDescription {
  [key: string]: string;
}

interface CoinLinks {
  homepage: string[];
  whitepaper: string[];
  blockchain_site: string[];
  official_forum_url: string[];
  chat_url: string[];
  announcement_url: string[];
  twitter_screen_name: string;
  facebook_username: string;
  bitcointalk_thread_identifier: string;
  telegram_channel_identifier: string;
  subreddit_url: string;
  repos_url: {
    github: string[];
    bitbucket: string[];
  };
}

interface CoinMarketData {
  current_price: { [currency: string]: number };
  total_value_locked: number;
  mcap_to_tvl_ratio: number;
  fdv_to_tvl_ratio: number;
  roi: number;
  ath: { [currency: string]: number };
  ath_change_percentage: { [currency: string]: number };
  ath_date: { [currency: string]: string };
  atl: { [currency: string]: number };
  atl_change_percentage: { [currency: string]: number };
  atl_date: { [currency: string]: string };
  market_cap: { [currency: string]: number };
  fully_diluted_valuation: { [currency: string]: number };
  total_volume: { [currency: string]: number };
  high_24h: { [currency: string]: number };
  low_24h: { [currency: string]: number };
  price_change_24h: number;
  price_change_percentage_24h: number;
  price_change_percentage_7d: number;
  price_change_percentage_14d: number;
  price_change_percentage_30d: number;
  price_change_percentage_60d: number;
  price_change_percentage_200d: number;
  price_change_percentage_1y: number;
  market_cap_change_24h: number;
  market_cap_change_percentage_24h: number;
  price_change_percentage_1h_in_currency: { [currency: string]: number };
  price_change_percentage_24h_in_currency: { [currency: string]: number };
  price_change_percentage_7d_in_currency: { [currency: string]: number };
  price_change_percentage_14d_in_currency: { [currency: string]: number };
  price_change_percentage_30d_in_currency: { [currency: string]: number };
  price_change_percentage_60d_in_currency: { [currency: string]: number };
  price_change_percentage_200d_in_currency: { [currency: string]: number };
  price_change_percentage_1y_in_currency: { [currency: string]: number };
  market_cap_change_24h_in_currency: { [currency: string]: number };
  market_cap_change_percentage_24h_in_currency: { [currency: string]: number };
  total_supply: number;
  max_supply: number;
  circulating_supply: number;
  last_updated: string;
}

interface CoinCommunityData {
  facebook_likes: number;
  twitter_followers: number;
  reddit_average_posts_48h: number;
  reddit_average_comments_48h: number;
  reddit_subscribers: number;
  reddit_accounts_active_48h: number;
  telegram_channel_user_count: number;
}

interface CoinDeveloperData {
  forks: number;
  stars: number;
  subscribers: number;
  total_issues: number;
  closed_issues: number;
  pull_requests_merged: number;
  pull_request_contributors: number;
  code_additions_deletions_4_weeks: {
    additions: number;
    deletions: number;
  };
  commit_count_4_weeks: number;
  last_4_weeks_commit_activity_series: number[];
}

interface CoinStatusUpdate {
  description: string;
  category: string;
  created_at: string;
  user: string;
  user_title: string;
  pin: boolean;
  project: {
    type: string;
    id: string;
    name: string;
    image: CoinImage;
  };
}

interface CoinTicker {
  base: string;
  target: string;
  market: {
    name: string;
    identifier: string;
    has_trading_incentive: boolean;
  };
  last: number;
  volume: number;
  converted_last: { [currency: string]: number };
  converted_volume: { [currency: string]: number };
  trust_score: string;
  bid_ask_spread_percentage: number;
  timestamp: string;
  last_traded_at: string;
  last_fetch_at: string;
  is_anomaly: boolean;
  is_stale: boolean;
  trade_url: string;
  token_info_url: string;
  coin_id: string;
  target_coin_id: string;
}

interface APICoinData {
  id: string;
  symbol: string;
  name: string;
  web_slug: string;
  asset_platform_id: string;
  platforms: CoinPlatforms;
  detail_platforms: CoinDetailPlatforms;
  block_time_in_minutes: number;
  hashing_algorithm: string;
  categories: string[];
  preview_listing: boolean;
  public_notice: string;
  additional_notices: string[];
  localization: CoinLocalization;
  description: CoinDescription;
  links: CoinLinks;
  image: CoinImage;
  country_origin: string;
  genesis_date: string;
  sentiment_votes_up_percentage: number;
  sentiment_votes_down_percentage: number;
  market_cap_rank: number;
  market_data: CoinMarketData;
  community_data: CoinCommunityData;
  developer_data: CoinDeveloperData;
  status_updates: CoinStatusUpdate[];
  last_updated: string;
  tickers: CoinTicker[];
}

interface APIHistData {
  prices: number[][];
  market_caps: number[][];
  total_volumes: number[][];
}
