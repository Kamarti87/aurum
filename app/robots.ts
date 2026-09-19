import type { MetadataRoute } from "next";

import { ALLOW_INDEXING, SITE_URL } from "@/components/site/contacts";

/** До запуска обход закрыт целиком; открывается вместе с мета-тегом через ALLOW_INDEXING. */
export default function robots(): MetadataRoute.Robots {
  if (!ALLOW_INDEXING) {
    return { rules: [{ userAgent: "*", disallow: "/" }] };
  }

  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
