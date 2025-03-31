I'll document the key style elements from the provided code to create a graphical charter that you can apply to other applications. Let me analyze the styles and create a comprehensive guide.

I've analyzed the provided code and created a comprehensive graphical charter for the API0 website. This style guide will help you apply consistent design elements to your other applications. Here's what I've created:

1. **Detailed Style Guide**: A comprehensive documentation of all visual elements including:
   - Brand colors (with light/dark mode variants)
   - Typography specifications
   - Component styles (buttons, cards, navigation)
   - Layout system
   - Design patterns and visual effects

2. **Color Palette Visualization**: A visual representation of the color scheme used in both light and dark modes.

3. **Logo Design Animation Example**: Shows how the distinctive API0 logo appears in both modes and its hover animation.

4. **Component Examples**: Visual representation of key UI components like buttons, cards, and navigation.

Key design elements that define the API0 visual identity:

1. **Color System**: 
   - Primary orange (#FF6B00) consistently used across light and dark themes
   - Carefully balanced light/dark mode color pairs
   - Semi-transparent backgrounds for depth

2. **Typography**: 
   - Clear hierarchy with bold section headers
   - Clean sans-serif font family
   - Consistent sizing scale

3. **Components**:
   - Rounded corners (rounded-lg, rounded-xl)
   - Subtle shadows for elevation
   - Hover animations for interactivity
   - Icon-led feature cards

4. **Brand Identity**:
   - Distinctive logo with rotated "0" that animates on hover
   - Consistent orange primary color
   - Clean, modern aesthetic

This style guide should serve as an excellent reference for implementing the same visual language across your other applications while maintaining brand consistency.


# API0 Style Guide & Design System

## 1. Brand Identity

### Logo
- Text logo: "api" followed by "0" with a distinctive styling
- The "0" is styled with:
  - Font weight: Black (`font-black`)
  - Color: #FF6B00 (Primary orange)
  - Transformation: Rotated -12 degrees
  - Animated: Rotates to 0 degrees on hover
  - Has a diagonal strike-through line (white on dark backgrounds, dark on light backgrounds)

### Brand Colors
| Color Name | Light Mode | Dark Mode | Usage |
|------------|------------|-----------|-------|
| Primary | #FF6B00 (Orange) | #FF6B00 (Orange) | Accent, CTA buttons, highlights |
| Background | White (hsl(0 0% 100%)) | Dark blue-gray (hsl(222.2 84% 4.9%)) | Page background |
| Foreground | Dark blue-gray (hsl(222.2 47.4% 11.2%)) | Light blue-gray (hsl(210 40% 98%)) | Primary text |
| Secondary | Light blue-gray (hsl(210 40% 96.1%)) | Dark blue-gray (hsl(217.2 32.6% 17.5%)) | Secondary elements |
| Muted | Light blue-gray (hsl(210 40% 96.1%)) | Dark blue-gray (hsl(217.2 32.6% 17.5%)) | Subtle backgrounds, less emphasized content |
| Muted Foreground | Gray (hsl(215.4 16.3% 46.9%)) | Light gray (hsl(215 20.2% 65.1%)) | Secondary text |
| Border | Light gray (hsl(214.3 31.8% 91.4%)) | Dark blue-gray (hsl(217.2 32.6% 17.5%)) | Borders, dividers |

## 2. Typography

### Font Family
- Base: System font stack with `antialiased` rendering
- Uses Tailwind's default font stack (sans-serif)

### Text Sizes
| Element | Size | Weight | Line Height |
|---------|------|--------|------------|
| Hero Heading | 6xl (4xl on mobile) | Bold | - |
| Section Headings | 3xl | Bold | - |
| Feature Headings | xl | Semibold | - |
| Body Text | Base | Regular | - |
| Large Body Text | xl-2xl | Regular | - |
| Nav Links | Base | Medium | - |
| Buttons | lg (large), Base (normal) | Medium/Semibold | - |

## 3. Component Styles

### Buttons
#### Primary Button
- Background: #FF6B00 (Primary orange)
- Text: White
- Padding: px-8 py-4 (large), px-4 py-2 (normal)
- Border radius: rounded-lg
- Hover: Slight opacity change (#FF6B00/90)
- Shadow: shadow-xl shadow-orange-500/20 (large), shadow-lg shadow-orange-500/20 (normal)
- Transition: Transform effect on hover (slides up slightly)

#### Theme Toggle Button
- Light mode: bg-gray-200 text-gray-700, hover:bg-gray-300
- Dark mode: bg-gray-800 text-primary, hover:bg-gray-700
- Border radius: rounded-full
- Focus: focus:ring-2 focus:ring-primary focus:ring-opacity-50

### Cards
- Background: bg-accent/50 (semi-transparent accent)
- Border: border border-border
- Border radius: rounded-xl
- Padding: p-6
- Layout: Flex column with centered items
- Icon container: p-4 bg-[#FF6B00]/10 rounded-full

### Navigation
- Fixed position with blur effect
- Background: bg-background/95 backdrop-blur-sm
- Border bottom: border-b border-border
- Shadow: shadow-sm
- Height: h-16
- Container: Centered with max width

### Feature Icons
- Container: p-4 bg-[#FF6B00]/10 rounded-full
- Icon: size 32px, text-[#FF6B00]

### Footer
- Background: bg-gray-900 (dark)
- Text colors: 
  - Headings: text-white
  - Links: text-gray-400, hover:text-white
  - Copyright: text-gray-400
- Border: border-t border-gray-800 (for dividers)

## 4. Layout System

### Grid
- Container: mx-auto px-4 (centered with padding)
- Feature grid: grid md:grid-cols-3 gap-12
- Footer grid: grid md:grid-cols-4 gap-8

### Spacing
- Section padding: py-24
- Between major elements: mb-12, mb-16
- Between related elements: mb-4, mb-6, mb-8
- Gap between grid items: gap-8, gap-12

### Responsive Behavior
- Mobile-first approach with breakpoints at md (768px)
- Navigation collapses below md breakpoint
- Grid columns adjust based on screen size
- Text sizes adjust (e.g., text-4xl on mobile to text-6xl on desktop)

## 5. Design Patterns

### Page Structure
1. Navigation (fixed at top)
2. Hero section with gradient background
3. Features section with card-based layout
4. Footer with multi-column information

### Visual Effects
- Gradient backgrounds: bg-gradient-to-b from-accent to-background
- Hover animations on interactive elements
- Shadow effects for elevation
- Rounded corners for all containers and interactive elements
- Semi-transparent backgrounds for depth

### Transitions
- Color transitions: transition-colors duration-200
- Transform transitions: transition duration-200 hover:-translate-y-1
- Theme transitions: transition-property: color, background-color, border-color
- Timing function: cubic-bezier(0.4, 0, 0.2, 1)
- Duration: 150ms-300ms

## 6. Implementation Guidelines

### CSS Framework
- Uses Tailwind CSS with custom theme configuration
- Custom properties defined in :root and .dark selectors

### Theme Implementation
- Light/dark mode toggle with system preference detection
- Theme stored in localStorage with 'api0-theme' key
- Quick theme application script to prevent flicker on page load

### Accessibility Considerations
- Color contrast meets accessibility standards
- Interactive elements clearly marked
- Focus states defined for keyboard navigation
- Semantic HTML structure

## 7. Icon System
Uses Lucide React icons:
- Navigation & features: MessageSquare, Search, Target
- Theme toggle: Moon, Sun, Monitor
- Social: Twitter, Linkedin, Github

## 8. Usage Examples

### Creating a Card Component
```jsx
<div className="flex flex-col items-center text-center p-6 rounded-xl bg-accent/50 border border-border">
  <div className="mb-6 p-4 bg-[#FF6B00]/10 rounded-full">
    <IconComponent size={32} className="text-[#FF6B00]" />
  </div>
  <h3 className="text-xl font-semibold mb-4 text-foreground">Title Here</h3>
  <p className="text-muted-foreground">Description text goes here.</p>
</div>
```

### Creating a Primary Button
```jsx
<a href="/destination" 
   className="inline-flex items-center px-8 py-4 rounded-lg bg-[#FF6B00] text-white text-lg font-semibold hover:bg-[#FF6B00]/90 transform transition duration-200 hover:-translate-y-1 shadow-xl shadow-orange-500/20">
  Button Text
</a>
```

### Section Layout
```jsx
<section className="py-24 bg-background">
  <div className="container mx-auto px-4">
    <h2 className="text-3xl font-bold text-center mb-16 text-foreground">Section Title</h2>
    <div className="grid md:grid-cols-3 gap-12">
      {/* Content cards go here */}
    </div>
  </div>
</section>
```



<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500">
  <!-- Background -->
  <rect width="800" height="500" fill="#f8f9fa" />
  
  <!-- Title -->
  <text x="400" y="50" font-family="sans-serif" font-size="24" font-weight="bold" text-anchor="middle">API0 Color Palette</text>
  
  <!-- Light Mode Colors -->
  <text x="200" y="90" font-family="sans-serif" font-size="18" font-weight="bold" text-anchor="middle">Light Mode</text>
  
  <!-- Primary -->
  <rect x="50" y="110" width="300" height="60" rx="5" fill="#FF6B00" />
  <text x="200" y="145" font-family="sans-serif" font-size="14" font-weight="bold" text-anchor="middle" fill="white">Primary: #FF6B00</text>
  
  <!-- Background -->
  <rect x="50" y="180" width="300" height="60" rx="5" fill="#FFFFFF" stroke="#E5E7EB" />
  <text x="200" y="215" font-family="sans-serif" font-size="14" font-weight="bold" text-anchor="middle">Background: White</text>
  
  <!-- Foreground -->
  <rect x="50" y="250" width="300" height="60" rx="5" fill="#1E293B" />
  <text x="200" y="285" font-family="sans-serif" font-size="14" font-weight="bold" text-anchor="middle" fill="white">Foreground: hsl(222.2 47.4% 11.2%)</text>
  
  <!-- Secondary -->
  <rect x="50" y="320" width="300" height="60" rx="5" fill="#F1F5F9" />
  <text x="200" y="355" font-family="sans-serif" font-size="14" font-weight="bold" text-anchor="middle">Secondary: hsl(210 40% 96.1%)</text>
  
  <!-- Border -->
  <rect x="50" y="390" width="300" height="60" rx="5" fill="#E2E8F0" />
  <text x="200" y="425" font-family="sans-serif" font-size="14" font-weight="bold" text-anchor="middle">Border: hsl(214.3 31.8% 91.4%)</text>
  
  <!-- Dark Mode Colors -->
  <text x="600" y="90" font-family="sans-serif" font-size="18" font-weight="bold" text-anchor="middle">Dark Mode</text>
  
  <!-- Primary -->
  <rect x="450" y="110" width="300" height="60" rx="5" fill="#FF6B00" />
  <text x="600" y="145" font-family="sans-serif" font-size="14" font-weight="bold" text-anchor="middle" fill="white">Primary: #FF6B00</text>
  
  <!-- Background -->
  <rect x="450" y="180" width="300" height="60" rx="5" fill="#0F172A" />
  <text x="600" y="215" font-family="sans-serif" font-size="14" font-weight="bold" text-anchor="middle" fill="white">Background: hsl(222.2 84% 4.9%)</text>
  
  <!-- Foreground -->
  <rect x="450" y="250" width="300" height="60" rx="5" fill="#F8FAFC" />
  <text x="600" y="285" font-family="sans-serif" font-size="14" font-weight="bold" text-anchor="middle">Foreground: hsl(210 40% 98%)</text>
  
  <!-- Secondary -->
  <rect x="450" y="320" width="300" height="60" rx="5" fill="#334155" />
  <text x="600" y="355" font-family="sans-serif" font-size="14" font-weight="bold" text-anchor="middle" fill="white">Secondary: hsl(217.2 32.6% 17.5%)</text>
  
  <!-- Border -->
  <rect x="450" y="390" width="300" height="60" rx="5" fill="#334155" />
  <text x="600" y="425" font-family="sans-serif" font-size="14" font-weight="bold" text-anchor="middle" fill="white">Border: hsl(217.2 32.6% 17.5%)</text>
</svg>


<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 200">
  <!-- Background -->
  <rect width="400" height="200" fill="#ffffff" />
  
  <!-- Dark mode background for comparison -->
  <rect x="200" y="0" width="200" height="200" fill="#0F172A" />
  
  <!-- Logo Light Mode -->
  <g transform="translate(100, 100)">
    <!-- "api" text -->
    <text x="0" y="0" font-family="sans-serif" font-size="36" font-weight="bold" text-anchor="middle" fill="#1E293B">api</text>
    
    <!-- "0" with rotation and strike-through -->
    <g transform="translate(30, 0) rotate(-12)">
      <text x="0" y="0" font-family="sans-serif" font-size="36" font-weight="900" text-anchor="middle" fill="#FF6B00">0</text>
      <line x1="-10" y1="-10" x2="10" y2="10" stroke="#1E293B" stroke-width="2" />
    </g>
    
    <!-- Hover state simulation (at 0 degrees) -->
    <g transform="translate(80, 0)" opacity="0.3">
      <text x="0" y="0" font-family="sans-serif" font-size="36" font-weight="bold" text-anchor="middle" fill="#1E293B">api</text>
      <g transform="translate(30, 0)">
        <text x="0" y="0" font-family="sans-serif" font-size="36" font-weight="900" text-anchor="middle" fill="#FF6B00">0</text>
        <line x1="-10" y1="-10" x2="10" y2="10" stroke="#1E293B" stroke-width="2" />
      </g>
    </g>
  </g>
  
  <!-- Logo Dark Mode -->
  <g transform="translate(300, 100)">
    <!-- "api" text -->
    <text x="0" y="0" font-family="sans-serif" font-size="36" font-weight="bold" text-anchor="middle" fill="#F8FAFC">api</text>
    
    <!-- "0" with rotation and strike-through -->
    <g transform="translate(30, 0) rotate(-12)">
      <text x="0" y="0" font-family="sans-serif" font-size="36" font-weight="900" text-anchor="middle" fill="#FF6B00">0</text>
      <line x1="-10" y1="-10" x2="10" y2="10" stroke="#F8FAFC" stroke-width="2" />
    </g>
    
    <!-- Hover state simulation (at 0 degrees) -->
    <g transform="translate(80, 0)" opacity="0.3">
      <text x="0" y="0" font-family="sans-serif" font-size="36" font-weight="bold" text-anchor="middle" fill="#F8FAFC">api</text>
      <g transform="translate(30, 0)">
        <text x="0" y="0" font-family="sans-serif" font-size="36" font-weight="900" text-anchor="middle" fill="#FF6B00">0</text>
        <line x1="-10" y1="-10" x2="10" y2="10" stroke="#F8FAFC" stroke-width="2" />
      </g>
    </g>
  </g>
  
  <!-- Labels -->
  <text x="100" y="30" font-family="sans-serif" font-size="16" font-weight="bold" text-anchor="middle">Light Mode</text>
  <text x="300" y="30" font-family="sans-serif" font-size="16" font-weight="bold" text-anchor="middle" fill="white">Dark Mode</text>
  
  <text x="100" y="170" font-family="sans-serif" font-size="14" text-anchor="middle">Normal State → Hover State</text>
  <text x="300" y="170" font-family="sans-serif" font-size="14" text-anchor="middle" fill="white">Normal State → Hover State</text>
</svg>


<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600">
  <!-- Background -->
  <rect width="800" height="600" fill="#F8FAFC" />
  
  <!-- Title -->
  <text x="400" y="50" font-family="sans-serif" font-size="24" font-weight="bold" text-anchor="middle">API0 Component Examples</text>
  
  <!-- Button Examples -->
  <text x="400" y="100" font-family="sans-serif" font-size="20" font-weight="bold" text-anchor="middle">Buttons</text>
  
  <!-- Primary Button -->
  <rect x="200" y="120" width="180" height="50" rx="8" fill="#FF6B00" filter="drop-shadow(0 4px 6px rgba(255, 107, 0, 0.2))" />
  <text x="290" y="152" font-family="sans-serif" font-size="16" font-weight="semibold" text-anchor="middle" fill="white">Try the Demo</text>
  <text x="290" y="180" font-family="sans-serif" font-size="14" text-anchor="middle">Primary Button</text>
  
  <!-- Secondary Button (Theme Toggle) -->
  <circle cx="490" cy="145" r="25" fill="#E5E7EB" />
  <path d="M490,133 L490,157 M478,145 L502,145" stroke="#4B5563" stroke-width="2" />
  <text x="490" y="180" font-family="sans-serif" font-size="14" text-anchor="middle">Theme Toggle</text>
  
  <!-- Card Examples -->
  <text x="400" y="230" font-family="sans-serif" font-size="20" font-weight="bold" text-anchor="middle">Cards</text>
  
  <!-- Feature Card -->
  <rect x="250" y="250" width="300" height="180" rx="12" fill="#F1F5F9" stroke="#E2E8F0" stroke-width="1" />
  <circle cx="400" cy="290" r="25" fill="rgba(255, 107, 0, 0.1)" />
  <path d="M400,280 L400,300 M390,290 L410,290" stroke="#FF6B00" stroke-width="2" />
  <text x="400" y="340" font-family="sans-serif" font-size="16" font-weight="semibold" text-anchor="middle">Feature Heading</text>
  <text x="400" y="370" font-family="sans-serif" font-size="14" text-anchor="middle" width="260">Feature description text goes here.</text>
  <text x="400" y="400" font-family="sans-serif" font-size="14" text-anchor="middle" fill="#6B7280">Feature Card (Light Mode)</text>
  
  <!-- Navigation Example -->
  <text x="400" y="460" font-family="sans-serif" font-size="20" font-weight="bold" text-anchor="middle">Navigation</text>
  
  <!-- Nav Bar -->
  <rect x="200" y="480" width="400" height="64" rx="0" fill="rgba(255, 255, 255, 0.95)" stroke="#E2E8F0" stroke-width="1" />
  <text x="240" y="520" font-family="sans-serif" font-size="18" font-weight="bold" text-anchor="middle">api<tspan fill="#FF6B00" font-weight="900" transform="rotate(-12, 260, 520)">0</tspan></text>
  <text x="450" y="520" font-family="sans-serif" font-size="14" text-anchor="middle" fill="#6B7280">Features</text>
  <circle cx="520" cy="512" r="18" fill="#E5E7EB" />
  <path d="M520,506 L520,518 M514,512 L526,512" stroke="#4B5563" stroke-width="1.5" />
  <rect x="560" y="496" width="80" height="32" rx="8" fill="#FF6B00" />
  <text x="600" y="516" font-family="sans-serif" font-size="12" font-weight="medium" text-anchor="middle" fill="white">Try Demo</text>
  <text x="400" y="560" font-family="sans-serif" font-size="14" text-anchor="middle" fill="#6B7280">Fixed Navigation Bar with Blur Effect</text>
</svg>



