import React from "react"
import { render, fireEvent } from "@testing-library/react"
import SortBy from "../SortBy"

const mockProps = {
  sortOption: "price",
  order: "asc",
  onSortChange: jest.fn(),
  onOrderChange: jest.fn(),
}

describe("SortBy Component", () => {
  it("renders SortBy component", () => {
    const { getByLabelText } = render(<SortBy {...mockProps} />)
    expect(getByLabelText(/sort by/i)).toBeInTheDocument()
  })

  it("calls onSortChange when option is selected", () => {
    const { getByLabelText } = render(<SortBy {...mockProps} />)
    fireEvent.change(getByLabelText(/sort by/i), {
      target: { value: "price-desc" },
    })
    expect(mockProps.onSortChange).toHaveBeenCalledWith("price-desc")
  })

  it("matches snapshot", () => {
    const { asFragment } = render(<SortBy {...mockProps} />)
    expect(asFragment()).toMatchSnapshot()
  })
})
