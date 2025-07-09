import { generateRSS } from '../scripts/rss.js';

export const prerender = false;

export async function GET(context) {
  return await generateRSS(context);
} 