import { JetBrains_Mono } from "next/font/google";
import { MotionConfig } from "framer-motion";
import "./globals.css";

// Components
import Header from "@/components/Header";
import { SITE_NAME, TITLE, DESCRIPTION, shareMeta } from "@/lib/site";

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin-ext"],
  weight: ["400", "600"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata = {
  title: {
    default: TITLE,
    template: `%s - ${SITE_NAME}`,
  },
  description: DESCRIPTION,
  ...shareMeta(TITLE, DESCRIPTION),
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={jetBrainsMono.variable}>
        {/* Disables transform animations for users who prefer reduced motion */}
        <MotionConfig reducedMotion="user">
          <Header />
          {children}
        </MotionConfig>
      </body>
    </html>
  );
}
