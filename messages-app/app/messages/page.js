import Messages from "@/components/messages";
import { getMessages } from "@/lib/messages";
import { unstable_noStore } from "next/cache";

// Constant with reserved names interpreted by Next.js.
// export const revalidate = 5; // It sets a global configuration for all requests in the file
// export const dynamic = "force-dynamic"; // The global equivalent to cache: 'no-store'

export default async function MessagesPage() {
  // unstable_noStore();
  // const response = await fetch("http://localhost:8080/messages", {
  // headers: {
  //   'X-ID': 'page',
  // },
  // cache: "no-store",
  // next: {
  //   revalidate: 5,
  //   tags: ['msg']
  // },
  // });
  // const messages = await response.json();

  const messages = await getMessages();

  if (!messages || messages.length === 0) {
    return <p>No messages found</p>;
  }

  return <Messages messages={messages} />;
}
