interface NewsSentiment {
  sentiment: string;
  neg: number;
  neu: number;
  pos: number;
}

interface NewsArticle {
  article_id: string;
  title: string;
  link: string;
  keywords: string[] | null;
  creator: string[] | null;
  video_url: string | null;
  description: string;
  content: string;
  pubDate: string; // ISO 8601 date-time string
  image_url: string;
  source_id: string;
  source_priority: number;
  source_url: string;
  source_icon: string;
  language: string;
  country: string[];
  category: string[];
  ai_tag: string;
  sentiment: NewsSentiment;
}

interface APINewsObject {
  status: string;
  totalResults: number;
  results: NewsArticle[];
  nextPage?: string;
}
