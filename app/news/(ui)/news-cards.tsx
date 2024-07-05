import React from "react";
import { Card, CardLoading } from "../../../ui/card";

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
  newsData?: NewsArticle[] | null;
  isLoading?: boolean;
}) {
  return (
    <div
      className="mx-auto mb-4 mt-8 flex max-w-sm flex-col gap-4 px-1 sm:mt-0 sm:grid sm:max-w-full
     sm:grid-cols-2 sm:px-8 md:grid-cols-3 xl:grid-cols-4"
    >
      {newsData !== null &&
        newsData?.length > 0 &&
        newsData.map((news) => (
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
