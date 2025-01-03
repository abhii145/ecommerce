import React from "react"
import { render, screen, fireEvent, act } from "@testing-library/react"
import AddressForm from "../AddressForm"

describe("AddressForm Component", () => {
  const mockOnChange = jest.fn()
  const mockOnBack = jest.fn()

  beforeEach(() => {
    render(
      <AddressForm
        onChange={mockOnChange}
        isSubmitting={false}
        onBack={mockOnBack}
      />
    )
  })


  it("matches snapshot", () => {
    const { asFragment } = render(
      <AddressForm
        onChange={mockOnChange}
        isSubmitting={false}
        onBack={mockOnBack}
      />
    )
    expect(asFragment()).toMatchSnapshot()
  })


  it("should render all input fields", () => {
    const fields = ["Name", "Mobile", "Address", "Email", "Pincode"]
    fields.forEach((field) => {
      expect(screen.getByLabelText(field)).toBeInTheDocument()
    })
  })

  it("should update state on input change", () => {
    const nameInput = screen.getByLabelText("Name")
    fireEvent.change(nameInput, { target: { value: "John Doe" } })
    expect(nameInput).toHaveValue("John Doe")
  })

  it("should call onChange with correct data when all fields are filled", async () => {
    const nameInput = screen.getByLabelText("Name")
    const mobileInput = screen.getByLabelText("Mobile")
    const addressInput = screen.getByLabelText("Address")
    const emailInput = screen.getByLabelText("Email")
    const pincodeInput = screen.getByLabelText("Pincode")

    await act(async () => {
      fireEvent.change(nameInput, { target: { value: "John Doe" } })
      fireEvent.change(mobileInput, { target: { value: "1234567890" } })
      fireEvent.change(addressInput, { target: { value: "123 Main St" } })
      fireEvent.change(emailInput, { target: { value: "john@example.com" } })
      fireEvent.change(pincodeInput, { target: { value: "123456" } })
      fireEvent.submit(
        screen.getByRole("button", { name: /proceed to payment/i })
      )
    })

    expect(mockOnChange).toHaveBeenCalledWith({
      name: "John Doe",
      mobile: "1234567890",
      address: "123 Main St",
      pincode: "123456",
      email: "john@example.com",
    })
  })

  it("should call onBack when the back button is clicked", () => {
    fireEvent.click(
      screen.getByRole("button", { name: /go back to the previous step/i })
    )
    expect(mockOnBack).toHaveBeenCalled()
  })

  it("should show validation errors for empty fields", async () => {
    await act(async () => {
      fireEvent.submit(
        screen.getByRole("button", { name: /proceed to payment/i })
      )
    })

    expect(screen.getByText("Name is required")).toBeInTheDocument()
    expect(
      screen.getByText("Mobile number must be exactly 10 digits")
    ).toBeInTheDocument()
    expect(screen.getByText("Address is required")).toBeInTheDocument()
    expect(screen.getByText("Invalid email address")).toBeInTheDocument()
    expect(
      screen.getByText("Pincode must be exactly 6 digits")
    ).toBeInTheDocument()
  })

})
