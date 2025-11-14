import Image from "next/image";
import classes from "./page.module.css";
import { getMeal } from "@/lib/meals";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }) {
  // the name generateMetadata is a reserved function name by Next.js
  const { mealSlug } = await params; // Next.js version 16

  const meal = await getMeal(mealSlug);

  if (!meal) notFound(); // Stop the execution and look for the closest not-found page.
  return {
    title: meal.title,
    description: meal.summary,
  };
}

// Prop 'param' passed by Next into the especial files
export default async function MealsDetailPage({ params }) {
  // Next.js version 16
  const { mealSlug } = await params; // Same name that its folder
  const meal = await getMeal(mealSlug);

  if (!meal) {
    notFound(); // Stop the execution and look for the closest not-found page.
  }

  // Get image stored in AWS S3
  const imageSource = `https://oarmoa-nextjs-demo-users-image.s3.us-east-1.amazonaws.com/${meal.image}`;

  meal.instructions = meal.instructions.replace(/\n/g, "<br />");
  return (
    <>
      <header className={classes.header}>
        <div className={classes.image}>
          <Image src={imageSource} alt={meal.title} fill />
        </div>
        <div className={classes.headeerText}>
          <h1>{meal.title}</h1>
          <p className={classes.creator}>
            by <a href={`mailto:${meal.creator_email}`}>{meal.creator}</a>
          </p>
          <p className={classes.summary}>{meal.summary}</p>
        </div>
      </header>
      <main>
        <p
          className={classes.instructions}
          // Sanitize by the xss package
          dangerouslySetInnerHTML={{
            __html: meal.instructions,
          }}
        ></p>
      </main>
    </>
  );
}
