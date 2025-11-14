"use server";

import { redirect } from "next/navigation";
import { saveMeal } from "./meals";
import { revalidatePath } from "next/cache";

function isInvalidText(text) {
  return !text || text.trim() === "";
}

export async function uploadMeal(prevState, formData) {
  const newMeal = {
    title: formData.get("title"), // Identified by input field name
    summary: formData.get("summary"),
    instructions: formData.get("instructions"),
    image: formData.get("image"),
    creator: formData.get("name"),
    creator_email: formData.get("email"),
  };

  // Server side Input Validation
  if (
    isInvalidText(newMeal.title) ||
    isInvalidText(newMeal.summary) ||
    isInvalidText(newMeal.instructions) ||
    isInvalidText(newMeal.creator) ||
    isInvalidText(newMeal.creator_email) ||
    !newMeal.creator_email.includes("@") ||
    !newMeal.image ||
    newMeal.image.size === 0
  ) {
    // Must add serializable objects (don't include methods)
    // Also don't throw Errors because that will clean up the entire form ruining the user experience.
    return {
      message: "Invalid Input!",
    };
  }

  await saveMeal(newMeal);
  revalidatePath("/meals"); // Revalidate the cache only in this path, not in nested paths. Use a second argument 'layout' to revalidate nested paths. 'page' is the default prop.
  redirect("/meals");
}
