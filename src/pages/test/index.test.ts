
import { Cart, Favorites, Home, Orders, ProductDetails, Products } from "../index"

describe("Page Components", () => {
  it("should import Cart component", () => {
    expect(Cart).toBeDefined()
  })

  it("should import Favorites component", () => {
    expect(Favorites).toBeDefined()
  })

  it("should import Home component", () => {
    expect(Home).toBeDefined()
  })

  it("should import Orders component", () => {
    expect(Orders).toBeDefined()
  })

  it("should import ProductDetails component", () => {
    expect(ProductDetails).toBeDefined()
  })

  it("should import Products component", () => {
    expect(Products).toBeDefined()
  })
})