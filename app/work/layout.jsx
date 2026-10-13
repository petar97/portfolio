// Server wrapper so this client-rendered route can export its own metadata
export const metadata = {
  title: "Work",
  description: "Selected projects: an AI transcription platform, the FK Partizan website and its redesign, plus earlier WordPress, full-stack and Android work.",
};

export default function Layout({ children }) {
  return children;
}
