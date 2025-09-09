# API0 Website

A modern, responsive website for API0 - the infrastructure layer that turns any application into a conversational AI interface.

## Features

- 🌓 Dark/Light mode with theme persistence in local storage
- 📱 Responsive design across all devices
- 📝 Integrated blog with markdown support
- ⚡ Built with Next.js and Tailwind CSS
- 🔄 Smooth transitions between pages and themes

## Getting Started

First, install the dependencies:

```bash
yarn install
```

Then, run the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```
src/
  app/
    blog/
      [slug]/           # Individual blog post pages
        page.tsx        
      page.tsx          # Blog listing page
    globals.css         # Global styles, CSS variables for themes
    layout.tsx          # Root layout with unified navigation
    page.tsx            # Landing page
  components/
    blog/               # Blog-specific components
      BlogHeader.tsx
      TableOfContents.tsx
    ConversationalWorkflow.tsx  # Chatbot workflow demo
    Navigation.tsx      # Shared navigation component
    Footer.tsx          # Shared footer component
    ScrollToAnchor.tsx  # Utility for handling anchor link scrolling
    theme/              # Theme-related components
      theme-provider.tsx
      theme-toggle.tsx
  lib/
    blog.ts             # Blog data fetching utilities
content/
  blog/                 # Markdown blog posts
    *.md
public/                 # Static assets
```

## Blog System

The blog system uses markdown files in the `content/blog` directory. Each post should include frontmatter with:

```md
---
title: "Post Title"
date: "YYYY-MM-DD"
excerpt: "Brief description"
author:
  name: "Author Name"
  avatar: "/path/to/avatar.jpg" (optional)
tags: ["Tag1", "Tag2"]
image: "/path/to/header-image.jpg" (optional)
---

# Content starts here
```

## API0 Positioning

API0 is positioned as the infrastructure layer that transforms any application into a conversational AI interface:

- **Not just API routing** - We enable full conversational experiences
- **Beyond support bots** - Execute real actions and workflows through natural language
- **Universal chatbot infrastructure** - Turn any app into a ChatGPT-like interface
- **Action-oriented** - Users speak, apps execute real functions

## Navigation System

The website uses a unified navigation system that's shared between the landing page and blog pages, providing a consistent experience. The navigation highlights the active section or page using the current URL path.

## Dark Mode Implementation

The dark mode implementation follows these key principles:

1. **Theme Provider** - A React context provider that manages the theme state
2. **Local Storage Persistence** - User preferences are saved in local storage
3. **CSS Variables** - Theme colors are defined using CSS variables
4. **Smooth Transitions** - CSS transitions for a smooth theme switch

### Usage

To toggle between light and dark mode, click the sun/moon icon in the navbar. The theme preference is automatically saved to local storage.

## Design Priorities

✅ **Clarity & Simplicity** – A professional, modern aesthetic that prioritizes readability and intuitive navigation.  
✅ **Responsiveness** – Works seamlessly across desktop and mobile.  
✅ **Real-Time Updates** – Instant theme changes with smooth transitions.  
✅ **Modular & Scalable** – Card-based layout to keep information well-structured.  
✅ **Developer-Friendly** – Dark/light mode support, a responsive layout.

## Customization

### Modifying Theme Colors

To change the theme colors, edit the CSS variables in `globals.css`:

```css
:root {
  --background: 0 0% 100%;
  --foreground: 222.2 47.4% 11.2%;
  /* Add or modify other variables */
}

.dark {
  --background: 222.2 84% 4.9%;
  --foreground: 210 40% 98%;
  /* Add or modify dark mode variables */
}
```

## Configuration

Next.js and Tailwind CSS configurations are in:
- `next.config.ts`
- `tailwind.config.ts`
- `postcss.config.mjs`
