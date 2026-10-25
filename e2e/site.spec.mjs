import { test, expect } from "@playwright/test";

const PAGES = [
  { path: "", title: "Petar Milovanović - Frontend Engineer", h1: /Petar Milovanović/ },
  { path: "resume/", title: "Resume - Petar Milovanović", h1: "Resume" },
  { path: "work/", title: "Work - Petar Milovanović", h1: "Work" },
  { path: "work/litteraworks/", title: "LitteraWorks - Petar Milovanović", h1: "LitteraWorks" },
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

const ALL_TITLES = [
  "LitteraWorks", "FK Partizan", "FK Partizan Redesign", "Mobile Apps", "Dnevnik", "HKS", "UpSpace",
  "STRIMHealth", "delaygram", "šema website",
];

test("every page shares the link-preview card", async ({ page, request }) => {
  for (const { path } of PAGES) {
    await page.goto(path);
    await expect(page.locator('meta[property="og:image"]')).toHaveAttribute("content", "https://petar97.github.io/portfolio/og.png");
    await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute("content", "summary_large_image");
  }
  // Project pages get their own preview title but keep the shared image
  await page.goto("work/hks/");
  await expect(page.locator('meta[property="og:title"]')).toHaveAttribute("content", "HKS - Petar Milovanović");
  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute("content", "https://petar97.github.io/portfolio/og.png");
  // The absolute URL points at the deployed site; check the same file exists in this build
  expect((await request.get("og.png")).status()).toBe(200);
});

const cardTitles = (page) => page.getByRole("list", { name: "Projects" }).getByRole("heading", { level: 2 });
const loaded = (img) => img.evaluate((el) => el.complete && el.naturalWidth > 0);

test("work grid shows every project with a loaded thumbnail, and a card opens its page", async ({ page }) => {
  await page.goto("work/");
  await expect(cardTitles(page)).toHaveText(ALL_TITLES);

  const thumbs = page.getByRole("list", { name: "Projects" }).locator("img");
  await expect(thumbs).toHaveCount(ALL_TITLES.length);
  for (const img of await thumbs.all()) {
    await img.scrollIntoViewIfNeeded();
    await expect.poll(() => loaded(img)).toBe(true);
  }

  await page.getByRole("link", { name: /FK Partizan Redesign/ }).click();
  await expect(page).toHaveURL(/\/portfolio\/work\/fk-partizan-redesign\/$/);
  await expect(page.locator("h1")).toHaveText("FK Partizan Redesign");
  // The header keeps Work highlighted on project pages
  await expect(page.getByRole("navigation").first().getByRole("link", { name: "work", exact: true })).toHaveAttribute("aria-current", "page");
});

test("project pages step through every project in order, with their screens loaded", async ({ page }) => {
  await page.goto("work/litteraworks/");
  const slide = page.locator(".swiper-slide-active img");
  await expect(page.getByRole("link", { name: /^Previous project/ })).toHaveCount(0);

  const titles = [];
  for (let i = 0; i < ALL_TITLES.length; i++) {
    await expect(page.locator(".text-outline")).toHaveText(String(i + 1).padStart(2, "0"));
    await expect.poll(() => loaded(slide)).toBe(true);
    titles.push(await page.locator("h1").textContent());
    if (i < ALL_TITLES.length - 1) await page.getByRole("link", { name: /^Next project/ }).click();
  }
  expect(titles).toEqual(ALL_TITLES);
  await expect(page).toHaveURL(/\/work\/sema-website\/$/);
  await expect(page.getByRole("link", { name: /^Next project/ })).toHaveCount(0);

  await page.getByRole("link", { name: "Previous project: delaygram" }).click();
  await expect(page.locator("h1")).toHaveText("delaygram");
});

test("work filter tabs narrow the grid and are remembered when coming back from a project", async ({ page }) => {
  await page.goto("work/");
  const tabs = page.getByRole("tablist", { name: "Project type" });
  await expect(tabs.getByRole("tab")).toHaveText(["All 10", "Web apps 2", "Websites 7"]);
  const expected = {
    "Web apps": ["LitteraWorks", "delaygram"],
    Websites: ["FK Partizan", "FK Partizan Redesign", "Dnevnik", "HKS", "UpSpace", "STRIMHealth", "šema website"],
  };
  for (const [label, titles] of Object.entries(expected)) {
    const tab = tabs.getByRole("tab", { name: new RegExp(`^${label}`) });
    await tab.click();
    await expect(tab).toHaveAttribute("aria-selected", "true");
    await expect(cardTitles(page)).toHaveText(titles);
  }

  const websites = tabs.getByRole("tab", { name: /^Websites/ });
  await page.getByRole("link", { name: /^HKS/ }).click();
  await expect(page.locator("h1")).toHaveText("HKS");
  await page.goBack();
  await expect(websites).toHaveAttribute("aria-selected", "true");

  await page.getByRole("link", { name: /^Dnevnik/ }).click();
  await page.getByRole("link", { name: "All projects" }).click();
  await expect(page).toHaveURL(/\/portfolio\/work\/$/);
  await expect(websites).toHaveAttribute("aria-selected", "true");
  await expect(cardTitles(page)).toHaveCount(7);
});

test("project links sit under the screenshot and open in a new tab", async ({ page }) => {
  await page.goto("work/strimhealth/");
  const live = page.getByRole("link", { name: "Live project" });
  await expect(live).toHaveAttribute("href", "https://strimhealth.ibiss.bg.ac.rs/");
  await expect(live).toHaveAttribute("target", "_blank");
  const shot = await page.locator(".swiper-slide-active img").boundingBox();
  expect((await live.boundingBox()).y).toBeGreaterThanOrEqual(shot.y + shot.height);
});

test("project screens open full screen, step with arrow keys, and close back to the trigger", async ({ page }) => {
  await page.goto("work/litteraworks/");
  const open = page.getByRole("button", { name: "View full screen" });
  await open.click();

  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();
  await expect(dialog.getByRole("heading")).toHaveText("LitteraWorks: Transcript editor (1/5)");
  await expect.poll(() => loaded(dialog.locator("img"))).toBe(true);

  await page.keyboard.press("ArrowRight");
  await expect(dialog.locator("img")).toHaveAttribute("alt", "LitteraWorks: Home");
  await page.keyboard.press("ArrowLeft");
  await page.keyboard.press("ArrowLeft");
  await expect(dialog.getByRole("heading")).toHaveText("LitteraWorks: Marketing site (5/5)");

  await page.keyboard.press("Escape");
  await expect(dialog).toBeHidden();
  await expect(open).toBeFocused();
  // The page keeps the screen chosen in the viewer
  const thumbs = page.getByRole("group", { name: "LitteraWorks screens" }).getByRole("button");
  await expect(thumbs.filter({ hasText: "Marketing site" })).toHaveAttribute("aria-pressed", "true");

  // Single-screen projects open without screen arrows
  await page.goto("work/strimhealth/");
  await open.click();
  await expect(dialog.getByRole("heading")).toHaveText("STRIMHealth: Overview");
  await expect(dialog.getByRole("button", { name: "Next screen" })).toHaveCount(0);
});

test("screen slider: edge zones step through screens, a drag swipes without opening the popup", async ({ page }) => {
  await page.goto("work/litteraworks/");
  const slide = page.locator(".swiper-slide-active img");
  const thumbs = page.getByRole("group", { name: "LitteraWorks screens" }).getByRole("button");
  await expect(page.getByRole("button", { name: "Previous screen" })).toHaveCount(0);

  await page.getByRole("button", { name: "Next screen" }).click();
  await expect(slide).toHaveAttribute("alt", "LitteraWorks: Home");
  await expect(thumbs.filter({ hasText: "Home" })).toHaveAttribute("aria-pressed", "true");

  // Drag right-to-left, starting on the popup trigger. A slow drag (over 300ms, easy on a busy
  // test machine) only changes screens past half a slide, and Swiper ignores the first mouse step,
  // so drag well past halfway and only once the previous slide animation has finished
  const slider = page.locator(".swiper");
  await expect.poll(() => slider.evaluate((el) => el.swiper.animating)).toBe(false);
  const box = await slider.boundingBox();
  const y = box.y + box.height / 2;
  await page.mouse.move(box.x + box.width * 0.78, y);
  await page.mouse.down();
  await page.mouse.move(box.x + box.width * 0.05, y, { steps: 8 });
  await page.mouse.up();
  await expect(slide).toHaveAttribute("alt", "LitteraWorks: My files");
  await expect(page.getByRole("dialog")).toHaveCount(0);

  // The next project starts on its first screen
  await page.getByRole("link", { name: /^Next project/ }).click();
  await expect(page.locator("h1")).toHaveText("FK Partizan");
  await expect(slide).toHaveAttribute("alt", "FK Partizan: Home");
});

test("resume is one page with a section menu, and skills are listed by name", async ({ page }) => {
  await page.goto("resume/");
  const menu = page.getByRole("navigation", { name: "Resume sections" });
  for (const name of ["Experience", "Education", "Skills", "About me"]) {
    await expect(page.getByRole("heading", { level: 2, name })).toBeVisible();
  }
  await expect(menu.getByRole("link", { name: "About me" })).toHaveAttribute("aria-current", "location");

  await menu.getByRole("link", { name: "Skills" }).click();
  await expect(page).toHaveURL(/#skills$/);
  await expect(menu.getByRole("link", { name: "Skills" })).toHaveAttribute("aria-current", "location");
  const skills = page.getByRole("region", { name: "Skills" });
  for (const skill of ["TypeScript", "Vue", "Playwright", "Laravel Blade"]) {
    await expect(skills.getByRole("listitem").filter({ hasText: new RegExp(`^${skill}$`) })).toBeVisible();
  }

  await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
  await expect(menu.getByRole("link", { name: "Skills" })).toHaveAttribute("aria-current", "location");

  await expect(page.getByText("Freelance")).toHaveCount(0);
  await page.getByRole("link", { name: /See these projects/ }).click();
  await expect(page).toHaveURL(/\/portfolio\/work\/$/);
});

test("header sticks and condenses on scroll, and résumé jumps land below it", async ({ page }) => {
  await page.goto("resume/");
  const header = page.locator("header");
  await expect(header).toHaveAttribute("data-condensed", "false");
  const full = await header.boundingBox();

  await page.mouse.wheel(0, 1500);
  await expect(header).toHaveAttribute("data-condensed", "true");
  // Still on screen and shorter, once the slide-up transition has settled
  await expect.poll(async () => (await header.boundingBox()).y).toBeLessThan(0);
  const bar = await header.boundingBox();
  const visible = bar.y + bar.height;
  expect(visible).toBeGreaterThan(0);
  expect(visible).toBeLessThan(full.height);
  await expect(header.getByRole("link", { name: "Contact" })).toBeInViewport();

  // A menu jump puts the section heading below the bar, not under it
  await page.getByRole("navigation", { name: "Resume sections" }).getByRole("link", { name: "Education" }).click();
  const heading = page.getByRole("heading", { level: 2, name: "Education" });
  await expect.poll(async () => (await heading.boundingBox()).y).toBeGreaterThanOrEqual(visible);
  await expect(heading).toBeInViewport();

  await page.evaluate(() => window.scrollTo(0, 0));
  await expect(header).toHaveAttribute("data-condensed", "false");
});
