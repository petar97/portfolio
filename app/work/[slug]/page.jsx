import ProjectDetail from "@/components/ProjectDetail";
import { projects } from "@/lib/projects";
import { SITE_NAME, shareMeta } from "@/lib/site";

// Static export: one page per project, built ahead of time. No `dynamicParams = false`: in Next 14
// it makes the dev server wrongly report generateStaticParams as missing. Unknown slugs have no
// exported file (404 on GitHub Pages); in dev, Next shows an error naming the missing param.
export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}

const indexOf = (slug) => projects.findIndex((p) => p.slug === slug);

export function generateMetadata({ params }) {
  const { title, description } = projects[indexOf(params.slug)];
  // First paragraph only: search snippets and link previews cut off long text anyway
  const summary = description.split("\n")[0];
  const fullTitle = `${title} - ${SITE_NAME}`;
  // absolute: the work layout's plain-string title stops the root template from reaching this page
  return { title: { absolute: fullTitle }, description: summary, ...shareMeta(fullTitle, summary) };
}

export default function Page({ params }) {
  // key: a fresh page state (screen 1) when stepping to another project
  return <ProjectDetail key={params.slug} index={indexOf(params.slug)} />;
}
