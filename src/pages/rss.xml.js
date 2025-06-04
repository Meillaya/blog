import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const blogPosts = await getCollection('blog');
  const musingsPosts = await getCollection('musings'); // Fetch posts from 'musings' collection

  // Combine posts from all desired collections
  const allPosts = [...blogPosts, ...musingsPosts];

  // Sort all posts by publication date (newest first)
  const sortedPosts = allPosts.sort((a, b) => new Date(b.data.pubDate).valueOf() - new Date(a.data.pubDate).valueOf());

  return rss({
    // `<title>` field in output xml
    title: 'meillayas technical blog', // Update with your blog's title
    // `<description>` field in output xml
    description: 'Your actual blog description here', // Update with your blog's description
    // Base URL for your site. Used to generate `<link>` URLs for items.
    site: context.site,
    // List of `<item>`s in output xml
    // Actual items, e.g. posts, talks, products, etc.
    items: sortedPosts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.pubDate,
      description: post.data.description,
      // Dynamically generate link based on collection
      link: `/${post.collection}/${post.slug}/`, // Assumes URLs like /blog/slug/ or /musings/slug/
      // Optional: add custom data to your RSS feed items
      // customData: post.data.customData,
    })),
    // (optional) inject custom xml
    customData: `<language>en-us</language>`,
  });
} 