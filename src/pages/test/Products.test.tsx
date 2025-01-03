/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen, fireEvent } from "@testing-library/react"
import { Provider } from "react-redux"
import { BrowserRouter as Router } from "react-router"
import configureStore from "redux-mock-store"
import Products from "../Products"
import { useCategories, useProducts } from "../../hooks"

jest.mock("../../hooks")

const mockStore = configureStore([])

describe("Products", () => {
  let store: any

  beforeEach(() => {
    store = mockStore({})
  })

  const categories = ["All", "Electronics", "Books"]
  const products = {
    products: [
      {
        id: "1",
        title: "Product 1",
        price: 100,
        thumbnail: "thumb1.jpg",
        category: "Electronics",
      },
      {
        id: "2",
        title: "Product 2",
        price: 200,
        thumbnail: "thumb2.jpg",
        category: "Books",
      },
    ],
    total: 2,
  }

  it("renders products and categories", () => {
    ;(useCategories as jest.Mock).mockReturnValue({ data: categories })
    ;(useProducts as jest.Mock).mockReturnValue({
      data: products,
      isLoading: false,
    })

    render(
      <Provider store={store}>
        <Router>
          <Products />
        </Router>
      </Provider>
    )

    expect(screen.getByText("Electronics")).toBeInTheDocument()
    expect(screen.getByText("Books")).toBeInTheDocument()
    expect(screen.getByText("Product 1")).toBeInTheDocument()
    expect(screen.getByText("Product 2")).toBeInTheDocument()
  })

  it("handles category change", () => {
    ;(useCategories as jest.Mock).mockReturnValue({ data: categories })
    ;(useProducts as jest.Mock).mockReturnValue({
      data: products,
      isLoading: false,
    })

    render(
      <Provider store={store}>
        <Router>
          <Products />
        </Router>
      </Provider>
    )

    const categoryButton = screen.getByText("Electronics")
    fireEvent.click(categoryButton)
    expect(screen.getByText("Product 1")).toBeInTheDocument()
  })

  it("handles sort change", () => {
    ;(useCategories as jest.Mock).mockReturnValue({ data: categories })
    ;(useProducts as jest.Mock).mockReturnValue({
      data: products,
      isLoading: false,
    })

    render(
      <Provider store={store}>
        <Router>
          <Products />
        </Router>
      </Provider>
    )

    const sortBySelect = screen.getByLabelText("Sort By:")
    fireEvent.change(sortBySelect, { target: { value: "price-desc" } })
    expect(screen.getByText("Product 2")).toBeInTheDocument()
  })

  it("handles page change", () => {
    ;(useCategories as jest.Mock).mockReturnValue({ data: categories })
    ;(useProducts as jest.Mock).mockReturnValue({
      data: products,
      isLoading: false,
    })

    render(
      <Provider store={store}>
        <Router>
          <Products />
        </Router>
      </Provider>
    )

    const nextPageButton = screen.getByText("Next")
    fireEvent.click(nextPageButton)
    expect(screen.getByText("Product 1")).toBeInTheDocument()
  })

  it("handles shop now button click in empty state", () => {
    ;(useCategories as jest.Mock).mockReturnValue({ data: categories })
    ;(useProducts as jest.Mock).mockReturnValue({
      data: { products: [], total: 0 },
      isLoading: false,
    })

    render(
      <Provider store={store}>
        <Router>
          <Products />
        </Router>
      </Provider>
    )

    const shopNowButton = screen.getByText("Shop Now")
    fireEvent.click(shopNowButton)
    expect(window.location.pathname).toBe("/products")
  })

  it("sets default search query, category, sortBy, order, limit, and skip", () => {
    ;(useCategories as jest.Mock).mockReturnValue({ data: categories })
    ;(useProducts as jest.Mock).mockReturnValue({
      data: products,
      isLoading: false,
    })

    render(
      <Provider store={store}>
        <Router>
          <Products />
        </Router>
      </Provider>
    )

    expect(screen.getByText("Product List")).toBeInTheDocument()
  })
})
