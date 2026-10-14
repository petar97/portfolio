// Server wrapper so this client-rendered route can export its own metadata
export const metadata = {
  title: "Work",
  description: "Selected work: web apps, websites and mobile apps for media, sports and education clients, including an AI transcription platform, the FK Partizan website and five native apps.",
};

export default function Layout({ children }) {
  return children;
}
