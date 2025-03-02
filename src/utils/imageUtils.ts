/**
 * Utility functions for handling images in the blog
 */

/**
 * Returns the path to a book cover image
 * @param filename The filename of the book cover image (with extension)
 * @returns The path to the book cover image
 */
export function getBookCoverPath(filename: string): string {
  return `/images/${filename}`;
}

/**
 * Returns an array of book cover images for a given array of filenames
 * @param filenames Array of filenames (with extensions)
 * @returns Array of paths to book cover images
 */
export function getBookCovers(filenames: string[]): string[] {
  return filenames.map(filename => getBookCoverPath(filename));
} 