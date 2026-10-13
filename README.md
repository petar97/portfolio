# Petar Milovanović — Portfolio

Personal portfolio site: home, résumé, selected work and a contact form.

**Live:** https://petar97.github.io/portfolio/

## Stack

- [Next.js 14](https://nextjs.org/) (App Router) exported as a static site
- [Tailwind CSS](https://tailwindcss.com/) with [shadcn/ui](https://ui.shadcn.com/) components on Radix primitives
- [Framer Motion](https://www.framer.com/motion/) for page and entry animations
- [Swiper](https://swiperjs.com/) for the project slider
- [EmailJS](https://www.emailjs.com/) for the contact form (no backend)

## Development

The contact form needs your EmailJS public key. Create `.env.local` (gitignored) in the project root:

```bash
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=<your EmailJS public key>
```

Production builds fail without it, so a deploy can't ship a form that silently doesn't send.

```bash
npm install
npm run dev     # http://localhost:3000
npm run lint
npm run build   # static export to ./out
npm test        # Playwright end-to-end tests (builds first, serves ./out under /portfolio)
```

First run only: `npx playwright install chromium`. The tests stub EmailJS, so the contact form never sends real email.

## Deployment

Pushing to `main` builds, runs the end-to-end tests, and deploys to GitHub Pages via `.github/workflows/nextjs.yml`. A failing test stops the deploy.

The build reads the EmailJS key from a repository variable named `EMAILJS_PUBLIC_KEY` (Settings → Secrets and variables → Actions → Variables). It ends up in the browser bundle either way, since EmailJS needs it client-side; the variable only keeps it out of the repo.

Production builds are served under `/portfolio`, so string paths to files in `public/` must go through the `asset()` helper in `lib/utils.js`; `next/image` and plain `<a>` tags don't add the base path on their own.

## Structure

```
app/          routes: / (home), /resume, /work, /contact
components/   page sections, navigation, transitions; ui/ holds shadcn components
lib/          animation variants and helpers
e2e/          Playwright tests and the static server they run against
public/assets CV, portrait and project screenshots
```
