import { Page, test } from "@playwright/test"

export async function takeScreenshot(page: Page, path: string) {
  // Scroll to the top of the page
  await page.evaluate(() => window.scrollTo(0, 0))

  // Wait for 1 second
  await page.waitForTimeout(1200)

  // Save the screenshot
  const screenshotBuffer = await page.screenshot({ path, fullPage: true })

  // Attach to Allure report
  test.info().attach("Screenshot", {
    body: screenshotBuffer,
    contentType: "image/png",
  })
}

export async function searchForProduct(page: Page, product: string) {
  const searchInput = page.getByPlaceholder("Search...")
  await searchInput.fill(product)
  await page.waitForSelector("ul[data-testid='suggestions-list']") // Wait for the suggestions to appear
  const secondSuggestion = page
    .locator("ul[data-testid='suggestions-list'] button")
    .nth(1)
  await secondSuggestion.click() // Click on the second suggestion
  await page.waitForLoadState("networkidle")
}

export async function takeScreenshotAfterWait(
  page: Page,
  path: string,
  waitTime: number = 1200
) {
  // Scroll to the top of the page
  await page.evaluate(() => window.scrollTo(0, 0))

  // Wait for the specified time
  await page.waitForTimeout(waitTime)

  // Save the screenshot
  const screenshotBuffer = await page.screenshot({ path, fullPage: true })

  // Attach to Allure report
  test.info().attach("Screenshot", {
    body: screenshotBuffer,
    contentType: "image/png",
  })
}
