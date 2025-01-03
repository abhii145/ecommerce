import { render, screen, fireEvent } from "@testing-library/react"
import { BrowserRouter as Router } from "react-router"
import MobileMenu from "../MobileMenu"

describe("MobileMenu component", () => {
  it("matches snapshot", () => {
    const setMenuOpen = jest.fn()
    const { asFragment } = render(
      <Router>
        <MobileMenu setMenuOpen={setMenuOpen} />
      </Router>
    )
    expect(asFragment()).toMatchSnapshot()
  })

  it("renders MobileMenu component", () => {
    const setMenuOpen = jest.fn()

    render(
      <Router>
        <MobileMenu setMenuOpen={setMenuOpen} />
      </Router>
    )

    expect(screen.getByText(/Products/i)).toBeInTheDocument()
    expect(screen.getByText(/Favourites/i)).toBeInTheDocument()
    expect(screen.getByText(/Orders/i)).toBeInTheDocument()
    expect(screen.getByText(/Cart/i)).toBeInTheDocument()
  })

  it("closes menu on link click", () => {
    const setMenuOpen = jest.fn()

    render(
      <Router>
        <MobileMenu setMenuOpen={setMenuOpen} />
      </Router>
    )

    fireEvent.click(screen.getByText(/Products/i))
    expect(setMenuOpen).toHaveBeenCalledWith(false)

    fireEvent.click(screen.getByText(/Favourites/i))
    expect(setMenuOpen).toHaveBeenCalledWith(false)

    fireEvent.click(screen.getByText(/Orders/i))
    expect(setMenuOpen).toHaveBeenCalledWith(false)

    fireEvent.click(screen.getByText(/Cart/i))
    expect(setMenuOpen).toHaveBeenCalledWith(false)
  })
})
