import type { ImageMetadata } from 'astro';

const found = import.meta.glob<{ default: ImageMetadata }>('/src/assets/images/*.{jpg,jpeg,png,webp,avif}', { eager: true });

/** Look up a photo in src/assets/images by file name without extension, e.g. image('hero-bar'). */
export function image(name: string): ImageMetadata {
  const key = Object.keys(found).find((k) => /\/([^/]+)\.[a-z]+$/.exec(k)?.[1] === name);
  if (!key) throw new Error(`Missing image: src/assets/images/${name}.(jpg|png|webp|avif)`);
  return found[key].default;
}
