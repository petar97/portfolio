export const SITE_URL = "https://petar97.github.io/portfolio/";
export const SITE_NAME = "Petar Milovanović";
export const TITLE = "Petar Milovanović - Frontend Engineer";
export const DESCRIPTION = "Frontend engineer creating sleek, responsive, and user-friendly web applications with React, Next.js, Vue and Nuxt.";
// Absolute URL: link-preview crawlers need it, and Next doesn't add basePath to metadata URLs
const PREVIEW_IMAGE = { url: `${SITE_URL}og.png`, width: 1200, height: 630, alt: TITLE };

// Link-preview tags. Next replaces a parent's openGraph/twitter block wholesale rather than merging,
// so a page with its own preview title passes through here to keep the image and card type.
// No og:url: crawlers fall back to the URL actually shared.
export const shareMeta = (title, description) => ({
  openGraph: { type: "website", siteName: SITE_NAME, title, description, images: [PREVIEW_IMAGE] },
  twitter: { card: "summary_large_image", title, description, images: [PREVIEW_IMAGE.url] },
});
