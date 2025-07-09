import { generateRSS } from '../scripts/rss.js';

export async function GET(context) {
  return await generateRSS(context);
} 