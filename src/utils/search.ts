import Fuse from 'fuse.js';
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

export interface SearchResult {
  item: SearchablePost;
  score?: number;
  matches?: Fuse.FuseResultMatch[];
}

export class SearchEngine {
  private fuse: Fuse<SearchablePost>;

  constructor(posts: SearchablePost[]) {
    const options: Fuse.IFuseOptions<SearchablePost> = {
      keys: [
        { name: 'title', weight: 0.3 },
        { name: 'description', weight: 0.2 },
        { name: 'content', weight: 0.2 },
        { name: 'tags', weight: 0.3 }
      ],
      threshold: 0.4,
      includeScore: true,
      includeMatches: true,
      minMatchCharLength: 2,
      ignoreLocation: true,
      useExtendedSearch: true
    };

    this.fuse = new Fuse(posts, options);
  }

  search(query: string): SearchResult[] {
    if (!query || query.length < 2) {
      return [];
    }

    const results = this.fuse.search(query);
    return results.map(result => ({
      item: result.item,
      score: result.score,
      matches: result.matches
    }));
  }

  searchByTag(tag: string): SearchablePost[] {
    return this.fuse.getIndex().docs.filter(post => 
      post.tags.some(t => t.toLowerCase() === tag.toLowerCase())
    );
  }

  getAllTags(): string[] {
    const allTags = new Set<string>();
    this.fuse.getIndex().docs.forEach(post => {
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
    title: post.data.title,
    description: post.data.description,
    content: content,
    publishDate: post.data.publishDate,
    tags: post.data.tags || [],
    collection: post.collection,
    slug: post.slug,
    url: `/${post.collection}/${post.slug}`
  };
} 