import { test, expect } from "@playwright/test";

const PAGES = [
  { path: "", title: "Petar Milovanović - Frontend Engineer", h1: /Petar Milovanović/ },
  { path: "resume/", title: "Resume - Petar Milovanović", h1: "Resume" },
  { path: "work/", title: "Work - Petar Milovanović", h1: "LitteraWorks" },
  { path: "contact/", title: "Contact - Petar Milovanović", h1: "Let's work together" },
];

// Collects console errors and failed same-origin requests (404s, missing assets)
function trackProblems(page) {
  const problems = [];
  page.on("console", (msg) => msg.type() === "error" && problems.push(`console: ${msg.text()}`));
  page.on("response", (res) => {
    if (res.url().startsWith("http://127.0.0.1") && res.status() >= 400) problems.push(`${res.status()} ${res.url()}`);
  });
  return problems;
}

for (const { path, title, h1 } of PAGES) {
  test(`/${path} loads with its own title and one h1, without errors`, async ({ page }) => {
    const problems = trackProblems(page);
    await page.goto(path);
    await expect(page).toHaveTitle(title);
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.locator("h1")).toHaveText(h1);
    await page.waitForLoadState("networkidle");
    expect(problems).toEqual([]);
  });
}

test("navigation stays client-side, including back to Home", async ({ page }) => {
  const problems = trackProblems(page);
  await page.goto("work/");
  // Survives client-side navigation, lost on a full reload
  await page.evaluate(() => { window.__sameDocument = true; });

  const nav = page.getByRole("navigation").first();
  for (const [name, url, heading] of [
    ["home", /\/portfolio\/$/, /Petar Milovanović/],
    ["resume", /\/portfolio\/resume\/$/, "Resume"],
    ["contact", /\/portfolio\/contact\/$/, "Let's work together"],
    ["home", /\/portfolio\/$/, /Petar Milovanović/],
  ]) {
    await nav.getByRole("link", { name, exact: true }).click();
    await expect(page).toHaveURL(url);
    await expect(page.locator("h1")).toHaveText(heading);
    await expect(nav.getByRole("link", { name, exact: true })).toHaveAttribute("aria-current", "page");
  }

  expect(await page.evaluate(() => window.__sameDocument)).toBe(true);
  await page.waitForLoadState("networkidle");
  expect(problems).toEqual([]);
});

test("CV download and portrait resolve under the base path", async ({ page, request }) => {
  await page.goto("");
  const cv = page.getByRole("link", { name: /Download CV/ });
  const href = await cv.getAttribute("href");
  expect(href).toBe("/portfolio/assets/cv.pdf");
  expect((await request.get(href)).status()).toBe(200);

  const portrait = page.getByRole("img", { name: "Portrait of Petar" });
  await expect(portrait).toBeVisible();
  expect(await portrait.evaluate((img) => img.complete && img.naturalWidth > 0)).toBe(true);
});

test("work slider: every project image loads and gallery thumbnails swap the screen", async ({ page }) => {
  await page.goto("work/");
  const slide = page.locator(".swiper-slide-active img");
  const next = page.getByRole("button", { name: "Next project" });
  const titles = [];

  for (let i = 0; i < 7; i++) {
    await expect(slide).toBeVisible();
    await expect.poll(() => slide.evaluate((img) => img.complete && img.naturalWidth > 0)).toBe(true);
    titles.push(await page.locator("h1").textContent());
    if (i < 6) await next.click();
  }
  expect(titles).toEqual([
    "LitteraWorks", "FK Partizan", "FK Partizan Redesign", "STRIMHealth",
    "delaygram", "šema website", "the rick and morty app",
  ]);

  // Back to the first project, which has a gallery
  const prev = page.getByRole("button", { name: "Previous project" });
  for (let i = 0; i < 6; i++) await prev.click();
  await expect(page.locator("h1")).toHaveText("LitteraWorks");

  const thumbs = page.getByRole("group", { name: "LitteraWorks screens" }).getByRole("button");
  await expect(thumbs).toHaveCount(5);
  await thumbs.filter({ hasText: "My files" }).click();
  await expect(thumbs.filter({ hasText: "My files" })).toHaveAttribute("aria-pressed", "true");
  await expect(slide).toHaveAttribute("alt", "LitteraWorks: My files");
});

test("every page shares the link-preview card", async ({ page, request }) => {
  for (const { path } of PAGES) {
    await page.goto(path);
    await expect(page.locator('meta[property="og:image"]')).toHaveAttribute("content", "https://petar97.github.io/portfolio/og.png");
    await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute("content", "summary_large_image");
  }
  // The absolute URL points at the deployed site; check the same file exists in this build
  expect((await request.get("og.png")).status()).toBe(200);
});
