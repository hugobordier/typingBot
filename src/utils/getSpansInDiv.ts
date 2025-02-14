import { Page } from "puppeteer";

export async function getSpansInDiv(
  page: Page,
  divSelector: string
): Promise<string[]> {
  return await page.$$eval(`${divSelector} span`, (spans) =>
    spans.map((span) => span.textContent?.trim() || "")
  );
}
