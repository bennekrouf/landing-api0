// Array of possible blog headings to display randomly
export const blogHeadings = [
  "Insights & Innovations",
  "The API Intelligence Hub",
  "Beyond Endpoints: API Perspectives",
  "API Frontiers",
  "Connecting the Digital Dots",
  "The Language of APIs",
  "Smart API Conversations",
  "API Transformation Stories",
  "Where Code Meets Language",
  "NLP-Powered Discoveries",
  "The Future of API Design",
  "Breaking API Barriers"
];

/**
 * Get a random heading from the available options
 * @returns A randomly selected blog heading
 */
export function getRandomHeading(): string {
  const randomIndex = Math.floor(Math.random() * blogHeadings.length);
  return blogHeadings[randomIndex];
}
