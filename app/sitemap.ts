import type { MetadataRoute } from 'next';
import { absoluteUrl, CONTENT_UPDATED_AT, HOME_SEO } from '@/lib/seo';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: absoluteUrl(HOME_SEO.path),
      lastModified: CONTENT_UPDATED_AT,
      changeFrequency: 'monthly',
      priority: 1,
    },
  ];
}
