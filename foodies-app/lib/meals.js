import sql from "better-sqlite3";
import slugify from "slugify";
import xss from "xss"; // Protect agains Cross Site Scripts Atack

// import fs from "node:fs";
import { S3 } from "@aws-sdk/client-s3";

// Instanciate the S3 object
const s3 = new S3({
  region: "us-east-1",
});
const db = sql("meals.db");

export async function getMeals() {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return db.prepare("SELECT * FROM meals").all();
}

// all() for Fetching Data
// run() for modify data
// get() for a single record

export async function getMeal(slug) {
  return db.prepare("SELECT * FROM meals WHERE slug = ?").get(slug); //Secure way to avoid sql injection
}

export async function saveMeal(meal) {
  meal.slug = slugify(meal.title, { lower: true });
  meal.instructions = xss(meal.instructions); // Sanitize dangerouslySetInnerHTML prop set in the <p> tag

  // Prepare Image
  const extension = meal.image.name.split(".").pop();
  const fileName = `${meal.slug}.${extension}`;

  const bufferedImage = await meal.image.arrayBuffer();

  // Store Images in Public Folder (i.e., locally)
  /*
  const stream = fs.createWriteStream(`public/images/${fileName}`);

  stream.write(Buffer.from(bufferedImage), (error) => {
    if (error) throw new Error("Saving image failed!");

    meal.image = `/images/${fileName}`; // Remove the public segment because all requests for images will be sent to the public folder automaticaly.

    db.prepare(
      `
      INSERT INTO meals (title, summary, instructions, creator, creator_email, image, slug)
      VALUES (@title, @summary, @instructions, @creator, @creator_email, @image, @slug)
      `
    ).run(meal);
  });*/

  // Store images in a S3 Bucket
  s3.putObject({
    Bucket: "oarmoa-nextjs-demo-users-image",
    Key: fileName,
    Body: Buffer.from(bufferedImage),
    ContentType: meal.image.type,
  });

  meal.image = fileName;

  db.prepare(
    `
    INSERT INTO meals
      (title, summary, instructions, creator, creator_email, image, slug)
    VALUES (
      @title,
      @summary,
      @instructions,
      @creator,
      @creator_email,
      @image,
      @slug
    )
  `
  ).run(meal);
}
