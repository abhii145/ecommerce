import React from "react"
import { render, screen, fireEvent } from "@testing-library/react"
import EmptyState from "../EmptyState"

describe("EmptyState", () => {
  const mockOnButtonClick = jest.fn()
  const props = {
    message: "No items found",
    buttonText: "Add Item",
    onButtonClick: mockOnButtonClick,
    icon: (
      <span role="img" aria-label="icon">
        🔍
      </span>
    ),
  }

  it("matches snapshot", () => {
    const { asFragment } = render(<EmptyState {...props} />)

    expect(asFragment()).toMatchSnapshot()
  })

  it("renders correctly with all elements", () => {
    render(<EmptyState {...props} />)

    expect(screen.getByLabelText("icon")).toBeInTheDocument()
    expect(screen.getByRole("alert")).toHaveTextContent("No items found")
    expect(screen.getByRole("button", { name: "Add Item" })).toBeInTheDocument()
  })

  it("calls onButtonClick when button is clicked", () => {
    render(<EmptyState {...props} />)

    fireEvent.click(screen.getByRole("button", { name: "Add Item" }))
    expect(mockOnButtonClick).toHaveBeenCalled()
  })
})
