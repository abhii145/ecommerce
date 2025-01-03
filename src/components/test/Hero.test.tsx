import React from "react"
import { render } from "@testing-library/react"
import { BrowserRouter as Router } from "react-router"
import Hero from "../Hero"

describe("Hero Component", () => {
  it("matches snapshot", () => {
    const { asFragment } = render(
      <Router>
        <Hero />
      </Router>
    )
    expect(asFragment()).toMatchSnapshot()
  })

  it("renders Hero component", () => {
    const { getAllByText } = render(
      <Router>
        <Hero />
      </Router>
    )
    expect(getAllByText(/welcome to shopeasy/i)[0]).toBeInTheDocument()
    expect(getAllByText(/shop now/i)[0]).toBeInTheDocument()
  })
})
