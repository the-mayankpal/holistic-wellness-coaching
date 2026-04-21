import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

export const client = createClient({
  projectId: import.meta.env.PUBLIC_SANITY_PROJECT_ID,
  dataset: import.meta.env.PUBLIC_SANITY_DATASET,
  useCdn: false, // Set to true for even faster responses (optional)
  apiVersion: "2024-03-20", // using today's date is common practice
});

const builder = imageUrlBuilder(client);

export function urlFor(source) {
  return builder.image(source);
}
