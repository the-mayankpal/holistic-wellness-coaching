import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

export const client = createClient({
  projectId: "ltc47ws4", // From your .env
  dataset: "production", // From your .env
  useCdn: false, // Set to true for even faster responses (optional)
  apiVersion: "2024-03-20", // using today's date is common practice
});

const builder = imageUrlBuilder(client);

export function urlFor(source) {
  return builder.image(source);
}
