# SVG-Focused Blog Post Template for API0

This template will help you create technically-focused blog posts with custom SVG illustrations that properly support both light and dark modes.

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
- Include the following CSS variables for theme support:
  * --svg-bg: Background color (default #f8fafc, dark mode #0f172a)
  * --svg-text: Text color (default #1e293b, dark mode #f8fafc)
  * --svg-accent: Accent color (always #FF6B00)
  * --svg-lines: Line color (default #e2e8f0, dark mode #334155)
- NEVER use hardcoded text colors - always use var(--svg-text, #1e293b) for all text elements
- For backgrounds, use var(--svg-bg, #f8fafc)
- For accent colors, use var(--svg-accent, #FF6B00)
- For lines/borders, use var(--svg-lines, #e2e8f0)
- Include a media query for dark mode as fallback:
  @media (prefers-color-scheme: dark) {
    .bg { fill: #0f172a; }
    .text { fill: #f8fafc; }
    .box { fill: #1e293b; stroke: #475569; }
    .code { fill: #cbd5e1; }
    .grid-line { stroke: #334155; }
  }
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

## Example SVG Style Block to Always Include

Make sure your SVG has this style block at the top to ensure proper dark mode support:

```svg
<svg viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg">
  <style>
    /* SVG styles that respect theme variables */
    .bg { fill: var(--svg-bg, #f8fafc); }
    .text { fill: var(--svg-text, #1e293b); }
    .accent { fill: var(--svg-accent, #FF6B00); }
    .accent-light { fill: rgba(255, 107, 0, 0.1); }
    .line { stroke: var(--svg-lines, #e2e8f0); stroke-width: 2; }
    .grid-line { stroke: var(--svg-lines, #e2e8f0); stroke-width: 1; stroke-dasharray: 4,4; }
    .connector { stroke: #FF6B00; stroke-width: 2; fill: none; marker-end: url(#arrowhead); }
    .label { font-family: sans-serif; font-size: 14px; font-weight: 500; }
    .small-label { font-family: sans-serif; font-size: 12px; }
    .box { fill: white; stroke: #64748b; stroke-width: 2; rx: 6; filter: drop-shadow(0px 4px 6px rgba(0, 0, 0, 0.1)); }
    .highlight-box { fill: rgba(255, 107, 0, 0.08); stroke: #FF6B00; stroke-width: 2; rx: 6; }
    .code { font-family: monospace; font-size: 12px; fill: #475569; }
    @media (prefers-color-scheme: dark) {
      .bg { fill: #0f172a; }
      .text { fill: #f8fafc; }
      .box { fill: #1e293b; stroke: #475569; }
      .code { fill: #cbd5e1; }
      .grid-line { stroke: #334155; }
    }
  </style>
  
  <!-- Rest of SVG content -->
</svg>
```

## Checklist for Dark Mode SVG Compatibility

Before submitting a new blog post, check the SVG for these common issues:

- [ ] All text elements use the `.text` class or `var(--svg-text, #1e293b)` for fill
- [ ] Background elements use the `.bg` class or `var(--svg-bg, #f8fafc)` for fill
- [ ] No hardcoded text colors like `fill="#000000"` or `fill="black"`
- [ ] All boxes and containers have proper dark mode alternatives
- [ ] Code snippets inside SVG use the `.code` class
- [ ] The dark mode media query is included in the style section
- [ ] Text has sufficient contrast in both light and dark modes
- [ ] Tested preview in both light and dark modes

## Example Usage of SVG Classes

When creating new elements in the SVG:

```svg
<!-- For text -->
<text x="100" y="50" class="text label">Title Here</text>

<!-- For backgrounds -->
<rect width="800" height="400" class="bg" />

<!-- For boxes -->
<rect x="50" y="100" width="200" height="100" class="box" />

<!-- For code snippets -->
<text x="100" y="150" class="code">const api = new API0();</text>

<!-- For accent elements -->
<circle cx="50" cy="50" r="25" class="accent" />

<!-- For connecting lines -->
<line x1="0" y1="0" x2="100" y2="100" class="line" />
```

By following these guidelines, your SVGs will maintain excellent readability in both light and dark modes, providing a consistent experience for all users.
