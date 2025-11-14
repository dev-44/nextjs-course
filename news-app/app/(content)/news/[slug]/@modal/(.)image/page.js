// (.) notation is to reference that the page to be intercepted is in the same level, just as the import notation (e.g., import Component from './page'
// Parallel routes (i.e., with the @notation prefix) doesn't count.

"use client";

import { DUMMY_NEWS } from "@/dummy-news";
import { notFound, useParams, useRouter } from "next/navigation";

// Nested routes of dynamic routes can access to params prop
export default function InterceptedImagePage() {
  const params = useParams();
  const { slug } = params; // Access directly, as useParams is synchronous

  const router = useRouter();

  const newsItem = DUMMY_NEWS.find((item) => item.slug === slug);

  if (!newsItem) {
    notFound(); // Function provided by Next.js
  }
  return (
    <>
      <div className="modal-backdrop" onClick={router.back} />
      <dialog className="modal" open>
        <div className="fullscreen-image">
          <img src={`/images/news/${newsItem.image}`} alt={newsItem.title} />
        </div>
      </dialog>
    </>
  );
}
