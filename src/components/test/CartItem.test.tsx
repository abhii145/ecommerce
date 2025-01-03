import React from "react"
import { render, fireEvent } from "@testing-library/react"
import CartItem from "../CartItem"

const mockItem = {
  id: 1,
  title: "Sample Item",
  brand: "Sample Brand",
  price: 100,
  category: "Sample Category",
  quantity: 2,
  thumbnail: "sample-thumbnail.jpg",
  images: ["sample-image1.jpg", "sample-image2.jpg"],
}

describe("CartItem", () => {
  const onIncrease = jest.fn()
  const onDecrease = jest.fn()
  const onRemove = jest.fn()

  const renderComponent = () =>
    render(
      <CartItem
        item={mockItem}
        onIncrease={onIncrease}
        onDecrease={onDecrease}
        onRemove={onRemove}
      />
    )
  
   it("matches snapshot", () => {
     const { asFragment } = render(
       <CartItem
         item={mockItem}
         onIncrease={onIncrease}
         onDecrease={onDecrease}
         onRemove={onRemove}
       />
     )
     expect(asFragment()).toMatchSnapshot()
   })


  it("renders correctly", () => {
    const { getByText, getByAltText } = renderComponent()
    expect(getByText("Sample Item")).toBeInTheDocument()
    expect(getByText("Brand: Sample Brand")).toBeInTheDocument()
    expect(getByText("₹100")).toBeInTheDocument()
    expect(getByText("₹200.00")).toBeInTheDocument()
    expect(getByAltText("Sample Item")).toBeInTheDocument()
  })

  it("calls onIncrease when the increase button is clicked", () => {
    const { getByTestId } = renderComponent()
    fireEvent.click(getByTestId("increase-button"))
    expect(onIncrease).toHaveBeenCalledWith(mockItem.id)
  })

  it("calls onDecrease when the decrease button is clicked", () => {
    const { getByTestId } = renderComponent()
    fireEvent.click(getByTestId("decrease-button"))
    expect(onDecrease).toHaveBeenCalledWith(mockItem.id)
  })

  it("calls onRemove when the remove button is clicked", () => {
    const { getByTestId } = renderComponent()
    fireEvent.click(getByTestId("remove-button"))
    expect(onRemove).toHaveBeenCalledWith(mockItem.id)
  })

  it("displays the correct quantity", () => {
    const { getByText } = renderComponent()
    expect(getByText("2")).toBeInTheDocument()
  })

  it("displays the correct total price", () => {
    const { getByText } = renderComponent()
    expect(getByText("₹200.00")).toBeInTheDocument()
  })
})
