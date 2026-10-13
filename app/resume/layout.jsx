// Server wrapper so this client-rendered route can export its own metadata
export const metadata = {
  title: "Resume",
  description: "Experience, education and skills: frontend development with React, Next.js, Vue, Nuxt and Laravel.",
};

export default function Layout({ children }) {
  return children;
}
