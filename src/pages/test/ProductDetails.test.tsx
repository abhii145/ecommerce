/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen, fireEvent } from "@testing-library/react"
import { Provider } from "react-redux"
import { BrowserRouter as Router } from "react-router"
import { ToastContainer } from "react-toastify"
import configureStore from "redux-mock-store"
import ProductDetails from "../ProductDetails"
import { useSingleProduct } from "../../hooks"

jest.mock("../../hooks")
jest.mock("../../store/cartSlice", () => ({
  addToCart: jest.fn().mockReturnValue({ type: "cart/addToCart" }),
}))
jest.mock("../../store/favoritesSlice", () => ({
  addToFavorites: jest
    .fn()
    .mockReturnValue({ type: "favorites/addToFavorites" }),
}))

const mockStore = configureStore([])

describe("ProductDetails", () => {
  let store: any

  beforeEach(() => {
    store = mockStore({
      favorites: { items: [] },
      recentlyViewed: { items: [] }, // Ensure recentlyViewed is initialized
    })
  })

  const product = {
    id: "1",
    title: "Test Product",
    description: "Test Description",
    price: 100,
    discountPercentage: 10,
    rating: 4.5,
    brand: "Test Brand",
    warrantyInformation: "1 year",
    availabilityStatus: "In Stock",
    thumbnail: "test-thumbnail.jpg",
    images: ["image1.jpg", "image2.jpg"],
    shippingInformation: "Ships in 2 days",
    reviews: [
      {
        reviewerName: "John Doe",
        date: "2023-01-01",
        comment: "Great product!",
        rating: 5,
        reviewerEmail: "john.doe@example.com",
      },
    ],
  }

  it("snapshot", () => {
    ;(useSingleProduct as jest.Mock).mockReturnValue({
      isLoading: false,
      data: product,
    })
    const { asFragment } = render(
      <Provider store={store}>
        <Router>
          <ProductDetails />
        </Router>
      </Provider>
    )

    expect(asFragment()).toMatchSnapshot()
  })

  it("renders product details", () => {
    ;(useSingleProduct as jest.Mock).mockReturnValue({
      isLoading: false,
      data: product,
    })
    render(
      <Provider store={store}>
        <Router>
          <ProductDetails />
          <ToastContainer />
        </Router>
      </Provider>
    )
    expect(screen.getByText("Test Product")).toBeInTheDocument()
    expect(screen.getByText("Test Description")).toBeInTheDocument()
    expect(screen.getByText("₹100")).toBeInTheDocument()
    expect(screen.getByText("₹110.00")).toBeInTheDocument()
    expect(screen.getByText("(10% OFF)")).toBeInTheDocument()
    expect(screen.getByText("Brand:")).toBeInTheDocument()
    expect(screen.getByText("Test Brand")).toBeInTheDocument()
    expect(screen.getByText("Warranty:")).toBeInTheDocument()
    expect(screen.getByText("1 year")).toBeInTheDocument()
    expect(screen.getByText("Availability:")).toBeInTheDocument()
    expect(screen.getByText("In Stock")).toBeInTheDocument()
  })

  it("handles image click", () => {
    ;(useSingleProduct as jest.Mock).mockReturnValue({
      isLoading: false,
      data: product,
    })
    render(
      <Provider store={store}>
        <Router>
          <ProductDetails />
        </Router>
      </Provider>
    )
    const image = screen.getByAltText("Test Product thumbnail 0")
    fireEvent.click(image)
    expect(screen.getByAltText("Test Product")).toHaveAttribute(
      "src",
      "image1.jpg"
    )
  })

  it("renders customer reviews", () => {
    ;(useSingleProduct as jest.Mock).mockReturnValue({
      isLoading: false,
      data: product,
    })
    render(
      <Provider store={store}>
        <Router>
          <ProductDetails />
        </Router>
      </Provider>
    )
    expect(screen.getByText("Customer Reviews")).toBeInTheDocument()
    expect(screen.getByText("John Doe")).toBeInTheDocument()
    expect(screen.getByText("Great product!")).toBeInTheDocument()
    expect(screen.getByText("Rating:")).toBeInTheDocument()
    expect(screen.getByText("Email: john.doe@example.com")).toBeInTheDocument()
  })

  it("renders product images", () => {
    ;(useSingleProduct as jest.Mock).mockReturnValue({
      isLoading: false,
      data: product,
    })
    render(
      <Provider store={store}>
        <Router>
          <ProductDetails />
        </Router>
      </Provider>
    )
    product.images.forEach((image, index) => {
      expect(
        screen.getByAltText(`Test Product thumbnail ${index}`)
      ).toHaveAttribute("src", image)
    })
  })

  it("handles pincode change", () => {
    ;(useSingleProduct as jest.Mock).mockReturnValue({
      isLoading: false,
      data: product,
    })
    render(
      <Provider store={store}>
        <Router>
          <ProductDetails />
        </Router>
      </Provider>
    )
    const pincodeInput = screen.getByLabelText("Pincode")
    fireEvent.change(pincodeInput, { target: { value: "123456" } })
    expect(pincodeInput).toHaveValue("123456")
  })

  it("adds product to cart", async () => {
    ;(useSingleProduct as jest.Mock).mockReturnValue({
      isLoading: false,
      data: product,
    })
    render(
      <Provider store={store}>
        <Router>
          <ProductDetails />
          <ToastContainer />
        </Router>
      </Provider>
    )
    const button = screen.getByText("Add to Cart")
    fireEvent.click(button)
    expect(await screen.findByText("Product added to cart")).toBeInTheDocument()
  })

  it("adds product to favorites", async () => {
    ;(useSingleProduct as jest.Mock).mockReturnValue({
      isLoading: false,
      data: product,
    })
    render(
      <Provider store={store}>
        <Router>
          <ProductDetails />
          <ToastContainer />
        </Router>
      </Provider>
    )
    const button = screen.getByText("Add to Favorites")
    fireEvent.click(button)
    expect(
      await screen.findByText("Product added to favorites")
    ).toBeInTheDocument()
  })

  it("shows loader when loading", () => {
    ;(useSingleProduct as jest.Mock).mockReturnValue({
      isLoading: true,
      data: null,
    })
    render(
      <Provider store={store}>
        <Router>
          <ProductDetails />
        </Router>
      </Provider>
    )
    expect(screen.getByText("Loading...")).toBeInTheDocument()
  })

  it("displays shipping information when pincode is valid", () => {
    ;(useSingleProduct as jest.Mock).mockReturnValue({
      isLoading: false,
      data: product,
    })
    render(
      <Provider store={store}>
        <Router>
          <ProductDetails />
        </Router>
      </Provider>
    )
    const pincodeInput = screen.getByLabelText("Pincode")
    fireEvent.change(pincodeInput, { target: { value: "123456" } })
    expect(screen.getByText(product.shippingInformation)).toBeInTheDocument()
  })

  it("sets isPincodeValid to false when pincode is less than 6 digits", () => {
    ;(useSingleProduct as jest.Mock).mockReturnValue({
      isLoading: false,
      data: product,
    })
    render(
      <Provider store={store}>
        <Router>
          <ProductDetails />
        </Router>
      </Provider>
    )
    const pincodeInput = screen.getByLabelText("Pincode")
    fireEvent.change(pincodeInput, { target: { value: "123" } })
    expect(pincodeInput).toHaveValue("123")
    expect(
      screen.queryByText(product.shippingInformation)
    ).not.toBeInTheDocument()
  })

  it("handles add to cart with out of stock product", async () => {
    const outOfStockProduct = { ...product, availabilityStatus: "Out of Stock" }
    ;(useSingleProduct as jest.Mock).mockReturnValue({
      isLoading: false,
      data: outOfStockProduct,
    })
    render(
      <Provider store={store}>
        <Router>
          <ProductDetails />
          <ToastContainer />
        </Router>
      </Provider>
    )
    const button = screen.getByText("Add to Cart")
    fireEvent.click(button)
    expect(
      await screen.queryByText("Product added to cart")
    ).not.toBeInTheDocument()
  })

  it("handles add to favorites with out of stock product", async () => {
    const outOfStockProduct = { ...product, availabilityStatus: "Out of Stock" }
    ;(useSingleProduct as jest.Mock).mockReturnValue({
      isLoading: false,
      data: outOfStockProduct,
    })
    render(
      <Provider store={store}>
        <Router>
          <ProductDetails />
          <ToastContainer />
        </Router>
      </Provider>
    )
    const button = screen.getByText("Add to Favorites")
    fireEvent.click(button)
    expect(
      await screen.queryByText("Product added to favorites")
    ).not.toBeInTheDocument()
  })

  it("handles invalid pincode input", () => {
    ;(useSingleProduct as jest.Mock).mockReturnValue({
      isLoading: false,
      data: product,
    })
    render(
      <Provider store={store}>
        <Router>
          <ProductDetails />
        </Router>
      </Provider>
    )
    const pincodeInput = screen.getByLabelText("Pincode")
    fireEvent.change(pincodeInput, { target: { value: "abc123" } })
    expect(pincodeInput).toHaveValue("123")
    expect(
      screen.queryByText(product.shippingInformation)
    ).not.toBeInTheDocument()
  })

  it("handles valid pincode input", () => {
    ;(useSingleProduct as jest.Mock).mockReturnValue({
      isLoading: false,
      data: product,
    })
    render(
      <Provider store={store}>
        <Router>
          <ProductDetails />
        </Router>
      </Provider>
    )
    const pincodeInput = screen.getByLabelText("Pincode")
    fireEvent.change(pincodeInput, { target: { value: "123456" } })
    expect(pincodeInput).toHaveValue("123456")
    expect(screen.getByText(product.shippingInformation)).toBeInTheDocument()
  })
})
