import { render, screen, fireEvent } from "@testing-library/react"
import CategoryFilter from "../CategoryFilter"

const categories = [
  { slug: "electronics", name: "Electronics" },
  { slug: "fashion", name: "Fashion" },
]

describe("CategoryFilter Component", () => {
  it("matches snapshot", () => {
    const { asFragment } = render(
      <CategoryFilter
        categories={categories}
        selectedCategory=""
        onCategoryChange={() => {}}
      />
    )
    expect(asFragment()).toMatchSnapshot()
  })

  it("renders CategoryFilter component", () => {
    render(
      <CategoryFilter
        categories={categories}
        selectedCategory=""
        onCategoryChange={() => {}}
      />
    )

    expect(screen.getByLabelText(/Category/i)).toBeInTheDocument()
    expect(screen.getByText(/All Categories/i)).toBeInTheDocument()
    expect(screen.getByText(/Electronics/i)).toBeInTheDocument()
    expect(screen.getByText(/Fashion/i)).toBeInTheDocument()
  })

  it("calls onCategoryChange when a category is selected", () => {
    const onCategoryChange = jest.fn()
    render(
      <CategoryFilter
        categories={categories}
        selectedCategory=""
        onCategoryChange={onCategoryChange}
      />
    )

    fireEvent.change(screen.getByLabelText(/Category/i), {
      target: { value: "electronics" },
    })
    expect(onCategoryChange).toHaveBeenCalledWith("electronics")
  })
})
