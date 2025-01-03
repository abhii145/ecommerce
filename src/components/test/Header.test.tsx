import { render, screen, fireEvent } from "@testing-library/react"
import { Provider } from "react-redux"
import { BrowserRouter as Router } from "react-router-dom"
import configureStore from "redux-mock-store"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import Header from "../Header"

const mockStore = configureStore([])
const queryClient = new QueryClient()

describe("Header component", () => {
  let store

  beforeEach(() => {
    store = mockStore({
      cart: {
        items: [{ id: 1 }, { id: 2 }]
      }
    })
  })

  const renderWithProviders = (ui) => {
    return render(
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <Router>{ui}</Router>
        </QueryClientProvider>
      </Provider>
    )
  }

  test("renders logo with correct text", () => {
    renderWithProviders(<Header />)
    const logo = screen.getByTestId("logo")
    expect(logo).toHaveTextContent("ShopEasy")
  })

  test("renders search bar with initial value", () => {
    renderWithProviders(<Header />)
    const searchInput = screen.getByRole("textbox")
    expect(searchInput).toHaveValue("")
  })

  test("updates search query on input change", () => {
    renderWithProviders(<Header />)
    const searchInput = screen.getByRole("textbox")
    fireEvent.change(searchInput, { target: { value: "test" } })
    expect(searchInput).toHaveValue("test")
  })

  test("toggles mobile menu on button click", () => {
    renderWithProviders(<Header />)
    const menuButton = screen.getByTestId("menu-button")
    fireEvent.click(menuButton)
    expect(screen.getByTestId("mobile-menu")).toBeInTheDocument()
    fireEvent.click(menuButton)
    expect(screen.queryByTestId("mobile-menu")).not.toBeInTheDocument()
  })

  test("renders navigation links", () => {
    renderWithProviders(<Header />)
    const navLinks = screen.getByTestId("nav-links")
    expect(navLinks).toBeInTheDocument()
  })

  test("renders cart link with correct item count", () => {
    renderWithProviders(<Header />)
    const cartLink = screen.getByTestId("cart-link")
    expect(cartLink).toHaveAttribute("aria-label", "Cart with 2 items")
    const cartItemCount = screen.getByText("2")
    expect(cartItemCount).toBeInTheDocument()
  })
})