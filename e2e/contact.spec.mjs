import { test, expect } from "@playwright/test";

// EmailJS is stubbed in every test: nothing is ever sent
const EMAILJS = "https://api.emailjs.com/**";

async function fill(page) {
  await page.getByLabel("First name").fill("Test");
  await page.getByLabel("Email address").fill("test@example.com");
  await page.getByLabel("Message").fill("Hello from the test suite");
}

test.beforeEach(async ({ page }) => {
  await page.goto("contact/");
  await expect(page.locator("h1")).toHaveText("Let's work together");
});

test("empty form is blocked by native validation and never calls EmailJS", async ({ page }) => {
  let calls = 0;
  await page.route(EMAILJS, (route) => { calls++; return route.fulfill({ status: 200, body: "OK" }); });

  await page.getByRole("button", { name: "Send message" }).click();

  const invalid = await page.locator("form :invalid").evaluateAll((els) => els.map((el) => el.name));
  expect(invalid).toEqual(["firstname", "email", "message"]);
  await expect(page.getByRole("status")).toHaveText("");
  expect(calls).toBe(0);
});

test("invalid email is blocked", async ({ page }) => {
  let calls = 0;
  await page.route(EMAILJS, (route) => { calls++; return route.fulfill({ status: 200, body: "OK" }); });

  await fill(page);
  await page.getByLabel("Email address").fill("not-an-email");
  await page.getByRole("button", { name: "Send message" }).click();

  expect(await page.getByLabel("Email address").evaluate((el) => el.validity.valid)).toBe(false);
  expect(calls).toBe(0);
});

test("success: button disables while sending, then confirms and clears the form", async ({ page }) => {
  let release;
  const held = new Promise((resolve) => { release = resolve; });
  let body;
  await page.route(EMAILJS, async (route) => {
    body = route.request().postDataJSON();
    await held;
    await route.fulfill({ status: 200, body: "OK" });
  });

  await fill(page);
  await page.getByRole("button", { name: "Send message" }).click();

  const sending = page.getByRole("button", { name: "Sending..." });
  await expect(sending).toBeDisabled();
  await expect(page.getByRole("status")).toHaveText("");

  release();
  await expect(page.getByRole("status")).toHaveText("Message sent successfully!");
  await expect(page.getByRole("button", { name: "Send message" })).toBeEnabled();
  await expect(page.getByLabel("Message")).toHaveValue("");

  expect(body.template_params).toEqual({
    from_name: "Test",
    from_email: "test@example.com",
    message: "Hello from the test suite",
  });
});

test("failure: shows an error, keeps the message, and allows a retry", async ({ page }) => {
  await page.route(EMAILJS, (route) => route.fulfill({ status: 500, body: "server error" }));

  await fill(page);
  await page.getByRole("button", { name: "Send message" }).click();

  await expect(page.getByRole("status")).toHaveText("Failed to send message. Please try again later.");
  await expect(page.getByLabel("Message")).toHaveValue("Hello from the test suite");
  await expect(page.getByRole("button", { name: "Send message" })).toBeEnabled();
});
