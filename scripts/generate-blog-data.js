// scripts/generate-blog-data.js
const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');
const { marked } = require('marked');
const slugify = require('slugify');
const readingTime = require('reading-time');

// Path to your blog content
const postsDirectory = path.join(process.cwd(), './content/');
const outputPath = path.join(process.cwd(), 'src/data/blog-posts.json');

// Function to generate slug from title if not explicitly provided
function generateSlug(title) {
  if (!title || typeof title !== 'string') {
    console.warn('Invalid title for slug generation:', title);
    return 'untitled-post';
  }
  return slugify(title, {
    lower: true,
    strict: true
  });
}

// Function to extract headings from markdown content
function extractHeadings(content) {
  const headings = [];
  const headingRegex = /^(#{1,6})\s+(.+)$/gm;
  let match;

  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length;
    const text = match[2].trim();
    const id = slugify(text, { lower: true, strict: true });

    headings.push({ id, text, level });
  }

  return headings;
}

// Read all posts
async function generateBlogData() {
  console.log(`Reading posts from ${postsDirectory}`);

  // Check if content directory exists
  if (!fs.existsSync(postsDirectory)) {
    console.log('Content directory does not exist, creating empty blog data...');
    const dataDir = path.join(process.cwd(), 'src/data');
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    fs.writeFileSync(outputPath, JSON.stringify([], null, 2));
    console.log('✅ Generated empty blog data (no posts found)');
    return;
  }

  // Ensure the data directory exists
  const dataDir = path.join(process.cwd(), 'src/data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  // Read all markdown files in the posts directory
  const fileNames = fs.readdirSync(postsDirectory);

  const postsData = fileNames
    .filter(fileName => fileName.endsWith('.md'))
    .map(fileName => {
      try {
        // Read file content
        const fullPath = path.join(postsDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, 'utf8');

        // Parse frontmatter
        const { data, content } = matter(fileContents);

        // Validate required fields
        if (!data.title) {
          console.warn(`Warning: Post ${fileName} missing title, skipping...`);
          return null;
        }

        // Generate slug from title if not provided
        const slug = data.slug || generateSlug(data.title);

        // Convert markdown to HTML for rendering
        const contentHtml = marked(content);

        // Extract headings for table of contents
        const headings = extractHeadings(content);

        // Calculate reading time
        const timeStats = readingTime(content);
        const readingTimeText = `${Math.ceil(timeStats.minutes)} min`;

        // Return structured data with defaults
        return {
          slug,
          title: data.title,
          date: data.date || new Date().toISOString().split('T')[0],
          excerpt: data.excerpt || '',
          content,
          contentHtml,
          author: data.author || { name: 'API0 Team' },
          tags: data.tags || [],
          svg: data.svg || null,
          image: data.image || null,
          readingTime: readingTimeText,
          seo: {
            title: data.seo_title || data.title,
            description: data.meta_description || data.excerpt || '',
            keywords: data.keywords || data.tags || [],
            ogImage: data.og_image || data.svg || data.image || null
          },
          headings
        };
      } catch (error) {
        console.error(`Error processing ${fileName}:`, error.message);
        return null;
      }
    })
    .filter(post => post !== null); // Remove failed posts

  // Write the data to a JSON file
  fs.writeFileSync(
    outputPath,
    JSON.stringify(postsData, null, 2)
  );

  console.log(`✅ Generated blog data with ${postsData.length} posts`);
}

// Run the function
generateBlogData().catch(console.error);
