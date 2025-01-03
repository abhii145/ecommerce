import React from "react"
import { render, fireEvent } from "@testing-library/react"
import Pagination from "../Pagination"

describe("Pagination component", () => {
  const renderPagination = (props = {}) => {
    const defaultProps = {
      currentPage: 1,
      total: 100,
      limit: 10,
      onPageChange: jest.fn(),
      ...props,
    }
    return render(<Pagination {...defaultProps} />)
  }

it("matches snapshot", () => {
  const { asFragment } = renderPagination()
  expect(asFragment()).toMatchSnapshot()
})


  it("renders Pagination component", () => {
    const { getByText } = renderPagination()
    expect(getByText(/showing/i)).toBeInTheDocument()
  })

  it("calls onPageChange when next button is clicked", () => {
    const onPageChange = jest.fn()
    const { getByText } = renderPagination({ onPageChange })
    fireEvent.click(getByText(/next/i))
    expect(onPageChange).toHaveBeenCalledWith(2)
  })

  it("calls onPageChange when previous button is clicked", () => {
    const onPageChange = jest.fn()
    const { getByText } = renderPagination({ currentPage: 2, onPageChange })
    fireEvent.click(getByText(/previous/i))
    expect(onPageChange).toHaveBeenCalledWith(1)
  })

  it("disables previous button on first page", () => {
    const { getByText } = renderPagination()
    expect(getByText(/previous/i)).toBeDisabled()
  })

  it("disables next button on last page", () => {
    const { getByText } = renderPagination({ currentPage: 10 })
    expect(getByText(/next/i)).toBeDisabled()
  })

  it("calls onPageChange when a page number is clicked", () => {
    const onPageChange = jest.fn()
    const { getByText } = renderPagination({ onPageChange })
    fireEvent.click(getByText("3"))
    expect(onPageChange).toHaveBeenCalledWith(3)
  })

  it("calls handlePageChange when previous button is clicked in mobile view", () => {
    const onPageChange = jest.fn()
    const { getByText } = renderPagination({ currentPage: 2, onPageChange })
    fireEvent.click(getByText(/previous/i))
    expect(onPageChange).toHaveBeenCalledWith(1)
  })

  it("calls handlePageChange when next button is clicked in mobile view", () => {
    const onPageChange = jest.fn()
    const { getByText } = renderPagination({ onPageChange })
    fireEvent.click(getByText(/next/i))
    expect(onPageChange).toHaveBeenCalledWith(2)
  })

  it("calls handlePageChange when previous button is clicked in desktop view", () => {
    const onPageChange = jest.fn()
    const { container } = renderPagination({ currentPage: 2, onPageChange })
    const previousButton = container.querySelector('button[data-testid="previous-button"]')
    fireEvent.click(previousButton)
    expect(onPageChange).toHaveBeenCalledWith(1)
  })

  it("calls handlePageChange when next button is clicked in desktop view", () => {
    const onPageChange = jest.fn()
    const { container } = renderPagination({ onPageChange })
    const nextButton = container.querySelector('button[data-testid="next-button"]')
    fireEvent.click(nextButton)
    expect(onPageChange).toHaveBeenCalledWith(2)
  })
})