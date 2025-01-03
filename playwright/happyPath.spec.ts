import { test } from "@playwright/test"
import fs from "fs"
import { takeScreenshotAfterWait } from "./utils"

test.describe.serial("Happy Path Workflow", () => {
  test.beforeAll(() => {
    fs.mkdirSync("screenshots/search-happypath", { recursive: true })
  })

  test("Integrated workflow for search, cart, promo, and payment", async ({
    page,
  }) => {
    await page.goto("http://localhost:5173") // Navigating in the same tab

    await takeScreenshotAfterWait(page, "screenshots/search-happypath/home.png")

    // Step 1: Search for a product
    await test.step("Search for product", async () => {
      const searchInput = page.getByPlaceholder("Search...")
      await searchInput.fill("apple")
      await page.waitForSelector("ul[data-testid='suggestions-list']") // Wait for the suggestions to appear
      await takeScreenshotAfterWait(
        page,
        "screenshots/search-happypath/autosuggestions.png"
      )
      const secondSuggestion = page
        .locator("ul[data-testid='suggestions-list'] button")
        .nth(1)
      await secondSuggestion.click() // Click on the second suggestion
      await page.waitForLoadState("networkidle")
      await takeScreenshotAfterWait(
        page,
        "screenshots/search-happypath/search_results.png"
      )
    })

    // Step 2: Add product to the cart
    await test.step("Add product to cart", async () => {
      await page.getByRole("link", { name: "More details" }).nth(1)

      await page.waitForLoadState("networkidle")
      await takeScreenshotAfterWait(
        page,
        "screenshots/search-happypath/product_details.png"
      )

      const addToCartButton = page.getByRole("button", { name: "Add to Cart" })
      await addToCartButton.click() // Stays in the same tab
      await takeScreenshotAfterWait(
        page,
        "screenshots/search-happypath/product_added_to_cart.png"
      )
    })

    // Step 3: Update cart quantity
    await test.step("Update cart quantity", async () => {
      const cartLink = page.getByTestId("cart-link")
      await cartLink.click() // Same tab for cart
      await takeScreenshotAfterWait(
        page,
        "screenshots/search-happypath/cart_page_before_increase.png"
      )
      const increaseButton = page.getByTestId("increase-button")
      await increaseButton.click() // Same tab for cart update
      await takeScreenshotAfterWait(
        page,
        "screenshots/search-happypath/cart_page_after_increase.png"
      )
    })

    // Step 4: Apply promo code
    await test.step("Apply promo code", async () => {
      const bestCouponsButton = page.getByRole("button", {
        name: "Best Coupons for You",
      })
      await bestCouponsButton.click() // Stays in the same tab
      const secondRadioButton = page.getByRole("radio").nth(0)
      await secondRadioButton.click()
      const applyButton = page.getByRole("button", { name: "Apply" })
      await applyButton.click()
      await page.waitForSelector("text=₹25 off applied on your first order!")
      await takeScreenshotAfterWait(
        page,
        "screenshots/search-happypath/promo_code_applied.png"
      )
    })

    // Step 5: Proceed to payment
    await test.step("Proceed to payment", async () => {
      const proceedToAddressButton = page.getByRole("button", {
        name: "Proceed to Address",
      })
      await proceedToAddressButton.click()

      await page.fill("#name", "abhishek yadav")
      await page.fill("#mobile", "9594385172")
      await page.fill("#address", "Mumbai")
      await page.fill("#email", "abc@gmail.com")
      await page.fill("#pincode", "400101")
      await takeScreenshotAfterWait(
        page,
        "screenshots/search-happypath/address_filled.png"
      )

      const proceedToPaymentButton = page.getByRole("button", {
        name: "Proceed to Payment",
      })
      await proceedToPaymentButton.click()

      const paymentFrame = page.frameLocator("iframe.razorpay-checkout-frame")
      await paymentFrame
        .locator('input[name="card.number"]')
        .fill("5267 3181 8797 5449")
      await paymentFrame.locator('input[name="card.expiry"]').fill("02/35")
      await paymentFrame.locator('input[name="card.cvv"]').fill("789")
      await paymentFrame.locator('button[data-test-id="add-card-cta"]').click()
      await takeScreenshotAfterWait(
        page,
        "screenshots/search-happypath/card_added.png"
      )
    })
  })
})
