# api0 Landing Page

A modern, responsive landing page for api0 with dark mode support.

## Features

- 🌓 Dark/Light mode with theme persistence in local storage
- 🎨 Responsive design across all devices
- ⚡ Built with Next.js and Tailwind CSS
- 🔄 Smooth transitions between themes

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

## Dark Mode Implementation

The dark mode implementation follows these key principles:

1. **Theme Provider** - A React context provider that manages the theme state
2. **Local Storage Persistence** - User preferences are saved in local storage
3. **CSS Variables** - Theme colors are defined using CSS variables
4. **Smooth Transitions** - CSS transitions for a smooth theme switch

### Usage

To toggle between light and dark mode, click the sun/moon icon in the navbar. The theme preference is automatically saved to local storage.

### Theme Provider

The theme provider is the core of the dark mode implementation. It:
- Initializes the theme based on local storage or default
- Provides theme context to components
- Handles theme toggling
- Persists theme preferences in local storage

```tsx
import { useTheme } from '@/components/theme/theme-provider';

// In your component
const { theme, toggleTheme } = useTheme();
```

## Design Priorities

✅ **Clarity & Simplicity** – A professional, modern aesthetic that prioritizes readability and intuitive navigation.  
✅ **Responsiveness** – Works seamlessly across desktop and mobile.  
✅ **Real-Time Updates** – Instant theme changes with smooth transitions.  
✅ **Modular & Scalable** – Card-based layout to keep information well-structured.  
✅ **Developer-Friendly** – Dark/light mode support, a responsive layout.

## Project Structure

```
src/
  app/
    globals.css           # Global styles, CSS variables for themes
    layout.tsx            # Root layout with ThemeProvider
    page.tsx              # Landing page with theme toggle
  components/
    theme/
      theme-provider.tsx  # ThemeProvider context
      theme-toggle.tsx    # Theme toggle button component
```

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
