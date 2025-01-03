import React from "react"
import { render } from "@testing-library/react"
import { BrowserRouter as Router } from "react-router"
import NotFound from "../NotFound"

describe("NotFound Component", () => {
  it("matches snapshot", () => {
    const { asFragment } = render(
      <Router>
        <NotFound />
      </Router>
    )
    expect(asFragment()).toMatchSnapshot()
  })

  it("renders NotFound component", () => {
    const { getByText } = render(
      <Router>
        <NotFound />
      </Router>
    )
    expect(getByText(/page not found/i)).toBeInTheDocument()
    expect(getByText(/go back to home/i)).toBeInTheDocument()
  })
})
