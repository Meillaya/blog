import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function generateRSS(context) {
  const blogPosts = await getCollection('blog');
  const essaysPosts = await getCollection('essays');
  const projectsPosts = await getCollection('projects');

  // Combine posts from all desired collections
  const allPosts = [...blogPosts, ...essaysPosts, ...projectsPosts];

  // Sort all posts by publication date (newest first), using 'publishDate'
  const sortedPosts = allPosts.sort((a, b) => new Date(b.data.publishDate).valueOf() - new Date(a.data.publishDate).valueOf());

  return rss({
    // `<title>` field in output xml
    title: 'meillayas technical blog',
    // `<description>` field in output xml
    description: '',
    // Base URL for your site. Used to generate `<link>` URLs for items.
    site: context.site,
    // List of `<item>`s in output xml
    // Actual items, e.g. posts, talks, products, etc.
    items: sortedPosts.map((post) =>({
      title: post.data.title,
      // RSS field is pubDate, but we get the value from publishDate
      pubDate: new Date(post.data.publishDate),
      description: post.data.description,
      // Dynamically generate link based on collection
      link: `/${post.collection}/${post.slug}/`,
      // Optional: add custom data to your RSS feed items
      // customData: post.data.customData,
    })),
    // (optional) inject custom xml
    customData: `<language>en-us</language>`,
  });
}
