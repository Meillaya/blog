# CRUSH.md - Development Guidelines

## Build and Development Commands

- `npm run dev` - Start development server
- `npm run build` - Build for production (includes pagefind search indexing)
- `npm run preview` - Preview production build
- `npm run astro` - Astro CLI

## Code Style Guidelines

- TypeScript strict mode, explicit React imports in .tsx files
- Astro components (.astro) for pages/layouts, React (.tsx) for interactive UI
- Use React.FC typing for components, interfaces for props
- PascalCase for components, camelCase for variables/functions
- 2-space indentation, semicolons, @ts-check for type safety
- client:only directive for React interactivity in Astro
- MDX with KaTeX math and Shiki syntax highlighting
- Use Astro Image component with Sharp optimization
- Error handling: try/catch for async operations, proper typing