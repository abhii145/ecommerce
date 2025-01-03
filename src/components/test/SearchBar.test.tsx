import React from "react"
import { render, screen, fireEvent, waitFor } from "@testing-library/react"
import { BrowserRouter as Router } from "react-router-dom"
import SearchBar from "../SearchBar"
import { useSearchSuggestions } from "../../hooks"

jest.mock("../../hooks", () => ({
  useSearchSuggestions: jest.fn(),
}))

const mockUseSearchSuggestions = useSearchSuggestions as jest.Mock

describe("SearchBar", () => {
  const mockOnSearchChange = jest.fn()

  beforeEach(() => {
    mockUseSearchSuggestions.mockReturnValue({ data: [] })
  })

  it("matches snapshot", () => {
    const { asFragment } = render(
      <Router>
        <SearchBar searchQuery="" onSearchChange={mockOnSearchChange} />
      </Router>
    )
    expect(asFragment()).toMatchSnapshot()
  })

  it("renders search input", () => {
    render(
      <Router>
        <SearchBar searchQuery="" onSearchChange={mockOnSearchChange} />
      </Router>
    )
    expect(screen.getByTestId("search-input")).toBeInTheDocument()
  })

  it("calls onSearchChange and updates query on input change", () => {
    render(
      <Router>
        <SearchBar searchQuery="" onSearchChange={mockOnSearchChange} />
      </Router>
    )
    const input = screen.getByTestId("search-input")
    fireEvent.change(input, { target: { value: "test" } })
    expect(mockOnSearchChange).toHaveBeenCalled()
    expect(input).toHaveValue("test")
  })

  it("clears input when clear button is clicked", () => {
    render(
      <Router>
        <SearchBar searchQuery="initial" onSearchChange={mockOnSearchChange} />
      </Router>
    )
    const input = screen.getByTestId("search-input")
    const clearButton = screen.getByTestId("clear-input")

    fireEvent.click(clearButton)
    expect(input).toHaveValue("")
    expect(mockOnSearchChange).toHaveBeenCalledWith(expect.objectContaining({ target: { value: "" } }))
  })

  it("shows suggestions when debouncedQuery has results", async () => {
    const suggestions = [
      {
        id: 1,
        title: "Product 1",
        category: "Category 1",
        thumbnail: "img1.jpg",
      },
      {
        id: 2,
        title: "Product 2",
        category: "Category 1",
        thumbnail: "img2.jpg",
      },
    ]
    mockUseSearchSuggestions.mockReturnValue({ data: suggestions })

    render(
      <Router>
        <SearchBar searchQuery="prod" onSearchChange={mockOnSearchChange} />
      </Router>
    )

    const input = screen.getByTestId("search-input")
    fireEvent.change(input, { target: { value: "prod" } })

    await waitFor(() => {
      expect(screen.getByText("Category 1")).toBeInTheDocument()
      expect(screen.getByText("Product 1")).toBeInTheDocument()
      expect(screen.getByText("Product 2")).toBeInTheDocument()
    })
  })

  it("shows 'No products found' when no suggestions are available", async () => {
    render(
      <Router>
        <SearchBar searchQuery="unknown" onSearchChange={mockOnSearchChange} />
      </Router>
    )

    const input = screen.getByTestId("search-input")
    fireEvent.change(input, { target: { value: "unknown" } })

    await waitFor(() => {
      expect(screen.getByText("No products found.")).toBeInTheDocument()
    })
  })

  it("shows 'View all products' link when no suggestions are available", async () => {
    render(
      <Router>
        <SearchBar searchQuery="unknown" onSearchChange={mockOnSearchChange} />
      </Router>
    )

    const input = screen.getByTestId("search-input")
    fireEvent.change(input, { target: { value: "unknown" } })

    await waitFor(() => {
      expect(screen.getByText("No products found.")).toBeInTheDocument()
      expect(screen.getByText("View all products")).toBeInTheDocument()
    })
  })

  it("navigates to product page on suggestion click", async () => {
    const suggestions = [
      {
        id: 1,
        title: "Product 1",
        category: "Category 1",
        thumbnail: "img1.jpg",
      },
    ]
    mockUseSearchSuggestions.mockReturnValue({ data: suggestions })

    render(
      <Router>
        <SearchBar searchQuery="prod" onSearchChange={mockOnSearchChange} />
      </Router>
    )

    const input = screen.getByTestId("search-input")
    fireEvent.change(input, { target: { value: "prod" } })

    await waitFor(() => {
      const suggestionButton = screen.getByText("Product 1")
      fireEvent.click(suggestionButton)
      expect(window.location.pathname).toBe("/products/1")
    })
  })
})
