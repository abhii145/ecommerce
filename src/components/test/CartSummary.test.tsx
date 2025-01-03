import { render, screen, fireEvent } from "@testing-library/react"
import CartSummary from "../CartSummary"
import { BrowserRouter as Router } from "react-router"
import { usePromoCode } from "../../hooks/usePromoCode"

jest.mock("../../hooks/usePromoCode")

const mockUsePromoCode = usePromoCode as jest.MockedFunction<
  typeof usePromoCode
>

describe("CartSummary", () => {
  beforeEach(() => {
    mockUsePromoCode.mockReturnValue({
      promoCode: "",
      discount: 0,
      promoMessage: "",
      handleApplyPromoCode: jest.fn(),
      handlePromoCodeChange: jest.fn(),
      handleCouponSelect: jest.fn(),
    })
  })

  const setup = (props = {}) => {
    const defaultProps = {
      total: "1000",
      tax: "180",
      onProceedToAddress: jest.fn(),
      ...props,
    }
    return render(
      <Router>
        <CartSummary {...defaultProps} />
      </Router>
    )
  }

  it("matches snapshot", () => {
    const { asFragment } = setup()
    expect(asFragment()).toMatchSnapshot()
  })

  it("renders CartSummary component", () => {
    setup()
    expect(screen.getByText("Subtotal")).toBeInTheDocument()
    expect(screen.getByText("Tax (18%)")).toBeInTheDocument()
    expect(screen.getByText("Shipping")).toBeInTheDocument()
    expect(screen.getByText("Discount")).toBeInTheDocument()
    expect(screen.getByText("Total")).toBeInTheDocument()
  })

  it("calculates shipping charge correctly", () => {
    setup({ total: "400", tax: "72" })
    expect(screen.getByText("₹50.00")).toBeInTheDocument()
    expect(
      screen.getByText("Enjoy free delivery on orders over ₹499!")
    ).toBeInTheDocument()
  })

  it("renders shipping message correctly based on total", () => {
    setup({ total: "400", tax: "72" })
    expect(screen.getByText("₹50.00")).toBeInTheDocument()
    expect(
      screen.getByText("Enjoy free delivery on orders over ₹499!")
    ).toBeInTheDocument()
  })

  it("does not render free shipping message when total is over 499", () => {
    setup({ total: "500", tax: "90" })
    expect(screen.queryByText("₹50.00")).not.toBeInTheDocument()
    expect(
      screen.queryByText("Enjoy free delivery on orders over ₹499!")
    ).not.toBeInTheDocument()
  })

  it("applies promo code", () => {
    const handleApplyPromoCode = jest.fn()
    mockUsePromoCode.mockReturnValue({
      promoCode: "SAVE10",
      discount: 100,
      promoMessage: "Promo code applied successfully!",
      handleApplyPromoCode,
      handlePromoCodeChange: jest.fn(),
      handleCouponSelect: jest.fn(),
    })
    setup()
    fireEvent.click(screen.getByText("Apply"))
    expect(handleApplyPromoCode).toHaveBeenCalled()
    expect(
      screen.getByText("Promo code applied successfully!")
    ).toBeInTheDocument()
  })

  it("toggles coupon drawer", () => {
    setup()
    const button = screen.getByText("Best Coupons for You")
    fireEvent.click(button)
    expect(screen.getByText("Close Coupons")).toBeInTheDocument()
    fireEvent.click(screen.getByText("Close Coupons"))
    expect(screen.getByText("Best Coupons for You")).toBeInTheDocument()
  })

  it("proceeds to address", () => {
    const onProceedToAddress = jest.fn()
    setup({ onProceedToAddress })
    fireEvent.click(screen.getByText("Proceed to Address"))
    expect(onProceedToAddress).toHaveBeenCalledWith(0, "")
  })

  it("renders payment methods", () => {
    setup()
    expect(screen.getByAltText("American Express")).toBeInTheDocument()
    expect(screen.getByAltText("Visa")).toBeInTheDocument()
    expect(screen.getByAltText("MasterCard")).toBeInTheDocument()
    expect(screen.getByAltText("Google Pay")).toBeInTheDocument()
  })

  it("handles promo code change", () => {
    const handlePromoCodeChange = jest.fn()
    mockUsePromoCode.mockReturnValue({
      promoCode: "",
      discount: 0,
      promoMessage: "",
      handleApplyPromoCode: jest.fn(),
      handlePromoCodeChange,
      handleCouponSelect: jest.fn(),
    })
    setup()
    const input = screen.getByPlaceholderText("Promo Code")
    fireEvent.change(input, { target: { value: "NEWCODE" } })
    expect(handlePromoCodeChange).toHaveBeenCalled()
  })

  it("resets selected coupon on promo code change", () => {
    const handlePromoCodeChange = jest.fn()
    mockUsePromoCode.mockReturnValue({
      promoCode: "",
      discount: 0,
      promoMessage: "",
      handleApplyPromoCode: jest.fn(),
      handlePromoCodeChange,
      handleCouponSelect: jest.fn(),
    })
    setup()
    const input = screen.getByPlaceholderText("Promo Code")
    fireEvent.change(input, { target: { value: "NEWCODE" } })
    expect(handlePromoCodeChange).toHaveBeenCalled()
  })
})
