import React from "react";
import { Card, CardLoading } from "./generic/card";

interface Sentiment {
  sentiment: string;
  neg: number;
  neu: number;
  pos: number;
}

interface Article {
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
  sentiment: Sentiment;
}

interface NewsData {
  status: string;
  totalResults: number;
  results: Article[];
  nextPage?: string;
}

function generateLoadingCells() {
  const loadingCard = [];
  for (let i = 0; i < 8; i++) {
    loadingCard.push(<CardLoading />);
  }
  return loadingCard;
}

export default function NewsCards({
  newsData = null,
  isLoading = false,
}: {
  newsData?: NewsData | null;
  isLoading?: boolean;
}) {
  return (
    <div
      className="mx-auto mb-4 mt-8 flex max-w-sm flex-col gap-4 px-1 sm:mt-0 sm:grid sm:max-w-full
     sm:grid-cols-2 sm:px-8 md:grid-cols-3 xl:grid-cols-4"
    >
      {newsData !== null &&
        newsData?.results?.length > 0 &&
        newsData.results.map((news) => (
          <Card
            key={news.article_id}
            imgSrc={news.image_url}
            title={news.title}
            description={news.description}
            link={news.link}
          />
        ))}

      {isLoading && generateLoadingCells()}
    </div>
  );
}
