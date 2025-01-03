import { render, screen } from "@testing-library/react"
import { BrowserRouter } from "react-router"
import CategoryCard from "../CategoryCard"

jest.mock("../../utils/categoryImages", () => ({
  slugToSvg: {
    "category-1": "path/to/category-1-image.svg",
    "category-2": "path/to/category-2-image.svg",
  },
}))

describe("CategoryCard", () => {
  it("matches snapshot", () => {
    const { asFragment } = render(
      <BrowserRouter>
        <CategoryCard title="Category 1" slug="category-1" />
      </BrowserRouter>
    )
    expect(asFragment()).toMatchSnapshot()
  })
  it("renders without crashing", () => {
    render(
      <BrowserRouter>
        <CategoryCard title="Category 1" slug="category-1" />
      </BrowserRouter>
    )

    expect(screen.getByText("Category 1")).toBeInTheDocument()
  })

  it("displays the correct image based on the slug", () => {
    render(
      <BrowserRouter>
        <CategoryCard title="Category 1" slug="category-1" />
      </BrowserRouter>
    )

    const imgElement = screen.getByAltText("Category 1") as HTMLImageElement
    expect(imgElement.src).toContain("path/to/category-1-image.svg")
  })

  it("renders the title correctly", () => {
    render(
      <BrowserRouter>
        <CategoryCard title="Category 1" slug="category-1" />
      </BrowserRouter>
    )

    const titleElement = screen.getByText("Category 1")
    expect(titleElement).toBeInTheDocument()
    expect(titleElement).toHaveClass("text-white text-xl font-bold")
  })
})
