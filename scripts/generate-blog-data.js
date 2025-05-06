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
      // Read file content
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      
      // Parse frontmatter
      const { data, content } = matter(fileContents);
      
      // Generate slug from title if not provided
      const slug = data.slug || generateSlug(data.title);
      
      // Convert markdown to HTML for rendering
      const contentHtml = marked(content);
      
      // Extract headings for table of contents
      const headings = extractHeadings(content);
      
      // Calculate reading time
      const timeStats = readingTime(content);
      const readingTimeText = `${Math.ceil(timeStats.minutes)} min`;
      
      // Return structured data
      return {
        slug,
        title: data.title,
        date: data.date,
        excerpt: data.excerpt,
        content,
        contentHtml,
        author: data.author,
        tags: data.tags,
        svg: data.svg,
        image: data.image,
        readingTime: readingTimeText,
        seo: {
          title: data.seo_title || data.title,
          description: data.meta_description || data.excerpt,
          keywords: data.keywords || data.tags,
          ogImage: data.og_image || data.svg || data.image
        },
        headings
      };
    });
  
  // Write the data to a JSON file
  fs.writeFileSync(
    outputPath,
    JSON.stringify(postsData, null, 2)
  );
  
  console.log(`✅ Generated blog data with ${postsData.length} posts`);
}

// Run the function
generateBlogData().catch(console.error);
