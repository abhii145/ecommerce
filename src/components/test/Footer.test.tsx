import { render, screen } from "@testing-library/react"
import Footer from "../Footer"

describe("Footer component", () => {
  it("matches snapshot", () => {
    const { asFragment } = render(<Footer />)
    expect(asFragment()).toMatchSnapshot()
  })

  it("renders Footer component", () => {
    render(<Footer />)

    expect(screen.getByText(/© 2024 ShopEasy/i)).toBeInTheDocument()
    expect(screen.getByText(/Home/i)).toBeInTheDocument()
    expect(screen.getByText(/Products/i)).toBeInTheDocument()
    expect(screen.getByText(/Favourites/i)).toBeInTheDocument()
    expect(screen.getByText(/Cart/i)).toBeInTheDocument()
  })
})
