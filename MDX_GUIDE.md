# MDX Guide for Your Astro Blog

This guide explains how to use MDX files with enhanced image capabilities in your Astro blog.

## What is MDX?

MDX is a format that lets you write JSX in your markdown content. It combines the simplicity of markdown with the power of React components.

## Getting Started

To create an MDX file, simply use the `.mdx` extension instead of `.md`. For example:

```
src/content/musings/my-post.mdx
```

## Frontmatter

Your MDX files should include frontmatter at the top, just like regular markdown files:

```mdx
---
title: "My MDX Post"
description: "This is my first MDX post"
publishDate: 2024-03-01
---

# Content goes here
```

## Using Images in MDX

### Basic Image Import

First, import your image and the Image component at the top of your MDX file:

```mdx
---
title: "My MDX Post"
description: "This is my first MDX post"
publishDate: 2024-03-01
---

import { Image } from 'astro:assets';
import myImage from '/public/images/my-image.jpg';

# My Post Title

<Image src={myImage} alt="My image description" width={600} height={400} />
```

### Static Public Images

For images in the `public` folder, you can reference them directly:

```mdx
<Image 
  src="/images/my-image.jpg" 
  alt="My image description" 
  width={600} 
  height={400} 
/>
```

### Images with Custom Styling

You can add custom styling to your images:

```mdx
<Image 
  src={myImage} 
  alt="My image description" 
  width={600} 
  height={400}
  style="border-radius: 15px; box-shadow: 5px 5px 15px rgba(0,0,0,0.3);"
/>
```

### Images with Captions

You can add captions to your images using the figure and figcaption HTML elements:

```mdx
<figure>
  <Image 
    src={myImage} 
    alt="My image description" 
    width={600} 
    height={400}
  />
  <figcaption>This is my image caption</figcaption>
</figure>
```

## Using the ResponsiveImage Component

For more advanced image features, you can use the ResponsiveImage component:

```mdx
import { ResponsiveImage } from '../components/ResponsiveImage.astro';
import myImage from '/public/images/my-image.jpg';

<ResponsiveImage
  src={myImage}
  alt="My responsive image"
  widths={[400, 800, 1200]}
  sizes="(min-width: 1024px) 1024px, 100vw"
  formats={['avif', 'webp', 'jpeg']}
  caption="This is a responsive image with multiple formats and sizes"
/>
```

## Benefits of Using MDX and Optimized Images

- **Better Performance**: Images are optimized for size and format
- **Responsive Design**: Images adapt to different screen sizes
- **Improved SEO**: Proper alt tags and image dimensions help search engines
- **Component Reuse**: You can create and reuse custom components in your content
- **Enhanced Styling**: More control over the presentation of your images

## Additional Resources

- [Astro MDX Documentation](https://docs.astro.build/en/guides/markdown-content/#mdx-only-features)
- [Astro Image Documentation](https://docs.astro.build/en/guides/images/)
- [MDX Documentation](https://mdxjs.com/) 