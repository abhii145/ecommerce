import { render, screen, fireEvent } from "@testing-library/react"
import { Provider } from "react-redux"
import configureStore from "redux-mock-store"
import Orders from "../Order"
import { BrowserRouter as Router } from "react-router"
import { addToCart } from "../../store/cartSlice"
import { handleDownloadReceipt } from "../../utils/downloadPdf"

jest.mock("../../store/cartSlice", () => ({
  addToCart: jest.fn(),
}))

jest.mock("../../utils/downloadPdf", () => ({
  handleDownloadReceipt: jest.fn(),
}))

const mockStore = configureStore([])

describe("Orders Component", () => {
  it("should display 'No Orders Found' when there are no orders", () => {
    const store = mockStore({
      orders: {
        orders: [],
      },
    })

    render(
      <Provider store={store}>
        <Router>
          <Orders />
        </Router>
      </Provider>
    )

    expect(screen.getByText("No Orders Found")).toBeInTheDocument()
    expect(
      screen.getByText("You haven’t placed any orders yet.")
    ).toBeInTheDocument()
  })

  it("should display orders when there are orders", () => {
    const store = mockStore({
      orders: {
        orders: [
          {
            id: "1",
            items: [
              {
                id: 1,
                title: "Product 1",
                price: 100,
                thumbnail: "image1.jpg",
                quantity: 2,
              },
            ],
            total: "200",
            date: "2023-10-01",
            promoCode: "DISCOUNT10",
            discount: 20,
            deliveryCharge: 50,
            customer: {
              name: "John Doe",
              email: "john@example.com",
            },
          },
        ],
      },
    })

    render(
      <Provider store={store}>
        <Router>
          <Orders />
        </Router>
      </Provider>
    )

    expect(screen.getByText("Your Orders")).toBeInTheDocument()
    expect(screen.getByText("Order #1")).toBeInTheDocument()
    expect(screen.getByText("Product 1")).toBeInTheDocument()
    expect(screen.getByText("₹100.00 × 2")).toBeInTheDocument()
    expect(screen.getByText("Subtotal: ₹200.00")).toBeInTheDocument()
    expect(screen.getByText("Tax (18%): ₹36.00")).toBeInTheDocument()
    expect(screen.getByText("Delivery charge: ₹50.00")).toBeInTheDocument()
    expect(screen.getByText("Total: ₹266.00")).toBeInTheDocument()
  })

  it("should handle reorder", () => {
    const store = mockStore({
      orders: {
        orders: [
          {
            id: "1",
            items: [
              {
                id: 1,
                title: "Product 1",
                price: 100,
                thumbnail: "image1.jpg",
                quantity: 2,
              },
            ],
            total: "200",
            date: "2023-10-01",
          },
        ],
      },
    })

    render(
      <Provider store={store}>
        <Router>
          <Orders />
        </Router>
      </Provider>
    )

    fireEvent.click(screen.getByText("Reorder"))

    expect(addToCart).toHaveBeenCalledWith({
      id: 1,
      title: "Product 1",
      price: 100,
      thumbnail: "image1.jpg",
      quantity: 2,
    })
  })

  it("should handle download receipt", () => {
    const store = mockStore({
      orders: {
        orders: [
          {
            id: "1",
            items: [
              {
                id: 1,
                title: "Product 1",
                price: 100,
                thumbnail: "image1.jpg",
                quantity: 2,
              },
            ],
            total: "200",
            date: "2023-10-01",
            promoCode: "DISCOUNT10",
            discount: 20,
            deliveryCharge: 50,
            customer: {
              name: "John Doe",
              email: "john@example.com",
            },
          },
        ],
      },
    })

    render(
      <Provider store={store}>
        <Router>
          <Orders />
        </Router>
      </Provider>
    )

    fireEvent.click(screen.getByText("Download Receipt"))

    expect(handleDownloadReceipt).toHaveBeenCalledWith(
      {
        id: "1",
        items: [
          {
            id: 1,
            title: "Product 1",
            price: 100,
            thumbnail: "image1.jpg",
            quantity: 2,
          },
        ],
        total: "200",
        date: "2023-10-01",
        promoCode: "DISCOUNT10",
        discount: 20,
        deliveryCharge: 50,
        customer: {
          name: "John Doe",
          email: "john@example.com",
        },
      },
      {
        name: "John Doe",
        email: "john@example.com",
      },
      "DISCOUNT10",
      20
    )
  })

  it("should navigate to products page when 'Shop Now' is clicked", () => {
    const store = mockStore({
      orders: {
        orders: [],
      },
    })

    render(
      <Provider store={store}>
        <Router>
          <Orders />
        </Router>
      </Provider>
    )

    fireEvent.click(screen.getByText("Shop Now"))

    expect(window.location.pathname).toBe("/products")
  })
})
