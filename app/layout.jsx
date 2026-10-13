import { JetBrains_Mono } from "next/font/google";
import { MotionConfig } from "framer-motion";
import "./globals.css";

// Components
import Header from "@/components/Header";
import StairTransition from "@/components/StairTransition";

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin-ext"],
  weight: ["400", "600"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

const SITE_URL = "https://petar97.github.io/portfolio/";
const TITLE = "Petar Milovanović - Frontend Engineer";
const DESCRIPTION = "Frontend engineer creating sleek, responsive, and user-friendly web applications with React, Next.js, Vue and Nuxt.";
// Absolute URL: link-preview crawlers need it, and Next doesn't add basePath to metadata URLs
const PREVIEW_IMAGE = { url: `${SITE_URL}og.png`, width: 1200, height: 630, alt: TITLE };

export const metadata = {
  title: {
    default: TITLE,
    template: "%s - Petar Milovanović",
  },
  description: DESCRIPTION,
  openGraph: {
    type: "website",
    // No og:url here: subpages inherit this block, and crawlers fall back to the URL actually shared
    siteName: "Petar Milovanović",
    title: TITLE,
    description: DESCRIPTION,
    images: [PREVIEW_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: [PREVIEW_IMAGE.url],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={jetBrainsMono.variable}>
        {/* Disables transform animations for users who prefer reduced motion */}
        <MotionConfig reducedMotion="user">
          <Header />
          <StairTransition />
          {children}
        </MotionConfig>
      </body>
    </html>
  );
}
