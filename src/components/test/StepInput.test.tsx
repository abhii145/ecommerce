import React from "react"
import { render, screen } from "@testing-library/react"
import StepInput from "../StepInput"

describe("StepInput", () => {
  const steps = ["Step 1", "Step 2", "Step 3"]

  it("matches the snapshot", () => {
    const { asFragment } = render(<StepInput steps={steps} activeStep={0} />)
    expect(asFragment()).toMatchSnapshot()
  })

  it("renders correctly", () => {
    render(<StepInput steps={steps} activeStep={0} />)
    expect(screen.getByText("Step 1")).toBeInTheDocument()
    expect(screen.getByText("Step 2")).toBeInTheDocument()
    expect(screen.getByText("Step 3")).toBeInTheDocument()
  })

  it("renders the progress bar correctly", () => {
    render(<StepInput steps={steps} activeStep={1} />)
    const progressBar = screen.getByRole("progressbar")
    expect(progressBar).toHaveAttribute("aria-valuenow", "2")
    expect(progressBar).toHaveAttribute("aria-valuemin", "1")
    expect(progressBar).toHaveAttribute("aria-valuemax", "3")
  })
})
