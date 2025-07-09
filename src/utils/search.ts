import Fuse, { type FuseResult } from 'fuse.js';
import type { CollectionEntry } from 'astro:content';

export interface SearchablePost {
  id: string;
  title: string;
  description: string;
  content: string;
  publishDate: Date;
  tags: string[];
  collection: string;
  slug: string;
  url: string;
}

export type SearchResult = FuseResult<SearchablePost>;

export class SearchEngine {
  private fuse: Fuse<SearchablePost>;
  private posts: SearchablePost[];

  constructor(posts: SearchablePost[]) {
    this.posts = posts;
    
    this.fuse = new Fuse(posts, {
      keys: [
        { name: 'title', weight: 3 },
        { name: 'tags', weight: 2 },
        { name: 'description', weight: 1.5 },
        { name: 'content', weight: 1 }
      ],
      includeScore: true,
      includeMatches: true,
      minMatchCharLength: 2,
      threshold: 0.3,
      ignoreLocation: true,
    });
  }

  search(query: string): SearchResult[] {
    if (!query || query.trim().length < 2) {
      return [];
    }
    return this.fuse.search(query);
  }

  searchByTag(tag: string): SearchablePost[] {
    return this.posts.filter(post => 
      post.tags.some(t => t.toLowerCase() === tag.toLowerCase())
    );
  }

  getAllTags(): string[] {
    const allTags = new Set<string>();
    this.posts.forEach(post => {
      post.tags.forEach(tag => allTags.add(tag));
    });
    return Array.from(allTags).sort();
  }
}

export function createSearchablePost(
  post: CollectionEntry<'blog'> | CollectionEntry<'essays'> | CollectionEntry<'notes'>,
  content: string = ''
): SearchablePost {
  return {
    id: post.id,
    title: post.data.title || post.slug, // Fallback to slug if title is missing
    description: post.data.description || '', // Fallback to empty string
    content: content,
    publishDate: post.data.publishDate || new Date(), // Fallback to current date
    tags: post.data.tags || [],
    collection: post.collection,
    slug: post.slug,
    url: `/${post.collection}/${post.slug}`
  };
} 