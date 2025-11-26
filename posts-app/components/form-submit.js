"use client";
import { useFormStatus } from "react-dom";

// The component that uses the useFormStatus must be called inside a form
export default function FormSubmit() {
  const status = useFormStatus();

  if (status.pending) {
    return <p>Creating post...</p>;
  }

  return (
    <>
      <button type="reset">Reset</button>
      <button>Create Post</button>
    </>
  );
}
