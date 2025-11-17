// (.) notation is to reference that the page to be intercepted is in the same level, just as the import notation (e.g., import Component from './page'
// Parallel routes (i.e., with the @notation prefix) doesn't count.

import ModalBackdrop from "@/components/modal-backdrop";
import { getNewsItem } from "@/lib/news";
import { notFound } from "next/navigation";

// Nested routes of dynamic routes can access to params prop
export default async function InterceptedImagePage({ params }) {
  // Client component's way
  /*
  const params = useParams();
  const { slug } = params; // Access directly, as useParams is synchronous
  */

  const { slug } = await params;
  const newsItem = await getNewsItem(slug);

  if (!newsItem) {
    notFound(); // Function provided by Next.js
  }
  return (
    <>
      <ModalBackdrop />
      <dialog className="modal" open>
        <div className="fullscreen-image">
          <img src={`/images/news/${newsItem.image}`} alt={newsItem.title} />
        </div>
      </dialog>
    </>
  );
}
