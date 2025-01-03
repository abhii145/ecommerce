import React from "react"
import { render } from "@testing-library/react"
import Loader from "../Loader"

describe("Loader component", () => {
  it("matches snapshot", () => {
    const { asFragment } = render(<Loader />)
    expect(asFragment()).toMatchSnapshot()
  })

  it("renders Loader component", () => {
    const { container } = render(<Loader />)
    expect(container.firstChild).toHaveClass(
      "flex justify-center items-center h-screen"
    )
  })
})
