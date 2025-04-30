# SVG-Focused Blog Post Template for API0

This template will help you create technically-focused blog posts with custom SVG illustrations that better align with your tech-savvy audience.

## Prompt Template

```
Please create a technically-focused blog post for API0, our intelligent API routing platform. The post should include a custom SVG diagram that illustrates the key concepts instead of using a generic stock image.

FORMAT REQUIREMENTS:
- Use standard Markdown with proper frontmatter that includes an svg field
- Structure: opening question → brief intro (7-15 lines) → main points → example → key takeaway
- Include a custom SVG diagram to illustrate the concept (will be placed in /svg/blog/[filename].svg)
- Total length: 600-900 words
- Always start with a thought-provoking question
- End with a clear, actionable takeaway

CONTENT FOCUS:
[Choose one for your prompt]
- API design and management patterns
- Natural language processing for developer tools
- API discovery and integration techniques
- The future of API ecosystems
- [Your specific topic...]

TECHNICAL LEVEL:
[Choose one for your prompt]
- Beginner-friendly overview (simple SVG, clear explanations)
- Intermediate technical discussion (detailed SVG with process flows)
- Advanced architectural concepts (complex SVG showing system interactions)

SVG DIAGRAM REQUIREMENTS:
- Create a custom SVG with viewBox="0 0 800 400"
- Use API0 orange (#FF6B00) for highlights and key elements
- Design the SVG to work in both light and dark modes using CSS variables
- Include the following elements:
  * Title and brief description
  * Visual representation of [specific concept]
  * Comparison between traditional and NLP approaches (if applicable)
  * Simple code examples or data flow
  * API0 logo at the bottom

FRONTMATTER SHOULD INCLUDE:
- title: "Your attention-grabbing title"
- date: "YYYY-MM-DD"
- excerpt: "Brief, compelling description"
- author: { name: "Author Name" }
- tags: ["Tag1", "Tag2", "Tag3"]
- svg: "/svg/blog/[filename].svg"
```

## Example Filled-In Prompt

```
Please create a technically-focused blog post for API0, our intelligent API routing platform. The post should include a custom SVG diagram that illustrates the key concepts instead of using a generic stock image.

FORMAT REQUIREMENTS:
- Use standard Markdown with proper frontmatter that includes an svg field
- Structure: opening question → brief intro (7-15 lines) → main points → example → key takeaway
- Include a custom SVG diagram to illustrate the concept (will be placed in /svg/blog/[filename].svg)
- Total length: 600-900 words
- Always start with a thought-provoking question
- End with a clear, actionable takeaway

CONTENT FOCUS:
- The evolution of API testing with NLP integration

TECHNICAL LEVEL:
- Intermediate technical discussion (detailed SVG with process flows)

SVG DIAGRAM REQUIREMENTS:
- Create a custom SVG with viewBox="0 0 800 400"
- Use API0 orange (#FF6B00) for highlights and key elements
- Design the SVG to work in both light and dark modes using CSS variables
- Include the following elements:
  * Title "API Testing Evolution"
  * Visual representation of traditional vs. NLP-powered testing workflows
  * Comparison between manual test case writing and NLP-generated test cases
  * Simple code examples showing test API calls
  * API0 logo at the bottom

FRONTMATTER SHOULD INCLUDE:
- title: Something about API testing transformation
- date: "2025-05-15"
- excerpt: Brief description of how NLP is changing API testing
- author: { name: "API0 Team" }
- tags: ["API Testing", "NLP", "Developer Tools"]
- svg: "/svg/blog/api-testing-evolution.svg"
```

## Tips for Creating Effective SVG Diagrams

1. **Focus on conceptual clarity** - Technical diagrams should prioritize making complex ideas understandable rather than being visually flashy.

2. **Use consistent visual language** - Maintain consistent shapes, colors, and styles for similar elements across all your SVGs.

3. **Leverage theme awareness** - Use CSS variables like `var(--svg-bg, #ffffff)` to ensure diagrams look good in both light and dark modes.

4. **Keep text minimal and readable** - Use concise labels and maintain readable font sizes (14px minimum).

5. **Show relationships** - Use arrows, connecting lines, and grouping to show how different components interact.

6. **Include code examples** - Small code snippets within the SVG can help illustrate technical concepts.

7. **Optimize for mobile** - Ensure diagrams work well when scaled down by avoiding tiny details or text.

8. **Maintain branding** - Always include API0 orange as the accent color and consider adding the API0 logo.

## SVG Style Guide

For consistency across blog diagrams, use these style conventions:

### Colors
- Background: Use `var(--svg-bg, #f8fafc)` for theme awareness
- Text: Use `var(--svg-text, #1e293b)` for theme awareness
- Accent: `#FF6B00` (API0 orange)
- Accent light: `rgba(255, 107, 0, 0.1)` for highlights
- Lines: Use `var(--svg-lines, #e2e8f0)` for theme awareness

### Typography
- Main title: 24px, centered
- Section headings: 18px
- Labels: 14px, medium weight
- Code: monospace, 12px
- Small labels: 12px

### Components
- Boxes: rounded corners (8px), light shadow
- Highlight boxes: accent-colored borders with light fill
- Connector lines: accent-colored with arrows
- Circle elements: for steps or focal points

### Layout
- Title at top
- Main concept in center
- Comparison sections side by side
- Process flows top to bottom
- API0 logo at bottom center

By following these guidelines, you'll create technically rich blog content with custom diagrams that resonate with your developer audience.
