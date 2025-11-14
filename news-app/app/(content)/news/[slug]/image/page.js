import { DUMMY_NEWS } from "@/dummy-news";
import { notFound } from "next/navigation";

export default async function ImagePage({ params }) {
  // Nested routes of dynamic routes can access to params prop
  const { slug } = await params;
  const newsItem = DUMMY_NEWS.find((item) => item.slug === slug);

  if (!newsItem) {
    notFound(); // Function provided by Next.js
  }
  return (
    <div className="fullscrenn-image">
      <img src={`/images/news/${newsItem.image}`} alt={newsItem.title} />
    </div>
  );
}
