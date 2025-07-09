import MiniSearch from 'minisearch';
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
  matches?: { key: string; value: any }[];
}

export class SearchEngine {
  private miniSearch: MiniSearch<SearchablePost>;
  private posts: SearchablePost[];

  constructor(posts: SearchablePost[]) {
    this.posts = posts;
    
    this.miniSearch = new MiniSearch({
      fields: ['title', 'description', 'content', 'tags'],
      storeFields: ['id', 'title', 'description', 'content', 'publishDate', 'tags', 'collection', 'slug', 'url'],
      searchOptions: {
        boost: { 
          title: 3,
          tags: 2,
          description: 1.5,
          content: 1
        },
        fuzzy: 0.2,
        prefix: true,
        combineWith: 'AND'
      },
      extractField: (document: SearchablePost, fieldName: string) => {
        if (fieldName === 'tags') {
          return document.tags.join(' ');
        }
        return (document as any)[fieldName];
      }
    });

    this.miniSearch.addAll(posts);
  }

  search(query: string): SearchResult[] {
    if (!query || query.length < 2) {
      return [];
    }

    const results = this.miniSearch.search(query, {
      boost: { 
        title: 3,
        tags: 2,
        description: 1.5,
        content: 1
      },
      fuzzy: 0.2,
      prefix: true
    });

    return results.map((result: any) => ({
      item: result as SearchablePost,
      score: result.score,
      matches: result.match ? Object.entries(result.match).map(([field, terms]) => ({
        key: field,
        value: terms
      })) : []
    }));
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