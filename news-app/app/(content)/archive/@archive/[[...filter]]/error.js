"use client"; // Must be a client component for react to an user action

// Props recieved via Next.js. Error object that was throwned by us in archive/@archive/[[...filter]]/page.js
export default function FilterError({ error }) {
  console.log(error);
  return (
    <div id="error">
      <h2>An error occurred!</h2>
      <p>{error.message}</p>
    </div>
  );
}
