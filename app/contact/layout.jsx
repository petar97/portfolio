// Server wrapper so this client-rendered route can export its own metadata
export const metadata = {
  title: "Contact",
  description: "Get in touch about a new project or a role.",
};

export default function Layout({ children }) {
  return children;
}
