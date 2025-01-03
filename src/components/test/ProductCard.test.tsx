import React from "react"
import { render, screen } from "@testing-library/react"
import { BrowserRouter as Router } from "react-router"
import ProductCard from "../ProductCard"

const renderProductCard = (product) => {
  return render(
    <Router>
      <ProductCard {...product} />
    </Router>
  )
}

const commonProductProps = {
  id: 1,
  title: "Test Product",
  price: 100,
  thumbnail: "test.jpg",
  description:
    "This is a test product description that is quite long and should be truncated.",
  rating: 4.5,
}

describe("ProductCard Component", () => {
  it("renders ProductCard component", () => {
    renderProductCard(commonProductProps)

    expect(screen.getByTestId("product-title")).toBeInTheDocument()
    expect(screen.getByTestId("product-title")).toHaveTextContent(
      "Test Product"
    )

    expect(screen.getByTestId("product-price")).toBeInTheDocument()
    expect(screen.getByTestId("product-price")).toHaveTextContent("₹ 100.00")

    expect(screen.getByTestId("product-description")).toBeInTheDocument()
    expect(screen.getByTestId("product-description")).toHaveTextContent(
      "This is a test product description that is quite l..."
    )

    const img = screen.getByTestId("product-image") as HTMLImageElement
    expect(img).toBeInTheDocument()
    expect(img.src).toContain("test.jpg")

    expect(screen.getByTestId("product-rating")).toBeInTheDocument()

    const moreDetailsLink = screen.getByTestId(
      "more-details-link"
    ) as HTMLAnchorElement
    expect(moreDetailsLink).toBeInTheDocument()
    expect(moreDetailsLink.href).toContain("/products/1")
  })

  it("renders ProductCard component with default rating", () => {
    const product = {
      ...commonProductProps,
      rating: undefined,
    }

    renderProductCard(product)
    expect(screen.getByTestId("product-rating")).toBeInTheDocument()
  })

  it("matches snapshot", () => {
    const { asFragment } = renderProductCard(commonProductProps)
    expect(asFragment()).toMatchSnapshot()
  })
})
