import { useState, useMemo } from "react"
import { Link } from "react-router"
import { CartSummaryProps } from "../types"
import americanExpress from "../assets/american-express.svg"
import visa from "../assets/visa.svg"
import masterCard from "../assets/mastercard.svg"
import gpay from "../assets/gpay.svg"
import { usePromoCode } from "../hooks/usePromoCode"
import { availableCoupons } from "../constants"

const CartSummary = ({ total, tax, onProceedToAddress }: CartSummaryProps) => {
  const {
    promoCode,
    discount,
    promoMessage,
    handleApplyPromoCode,
    handlePromoCodeChange,
    handleCouponSelect,
  } = usePromoCode()

  const [isCouponDrawerOpen, setCouponDrawerOpen] = useState(false)
  const [selectedCoupon, setSelectedCoupon] = useState("")

  const resetSelectedCoupon = () => setSelectedCoupon("")

  const shippingCharge = useMemo(
    () => (Number(total) + Number(tax) < 499 ? 50 : 0),
    [total, tax]
  )
  const taxAmount = useMemo(() => (Number(total) * 0.18).toFixed(2), [total])
  const finalTotal = useMemo(
    () =>
      (
        Number(total) +
        shippingCharge +
        Number(taxAmount) -
        Number(discount)
      ).toFixed(2),
    [total, shippingCharge, taxAmount, discount]
  )

  return (
    <div className="bg-white rounded-md px-4 py-6 h-max">
      <ul className="text-gray-800 space-y-4">
        {[
          { label: "Subtotal", value: total },
          { label: "Tax (18%)", value: taxAmount },
          { label: "Shipping", value: shippingCharge.toFixed(2) },
          { label: "Discount", value: `${discount}` },
        ].map((item) => (
          <li key={item.label} className="flex flex-wrap gap-4 text-sm">
            <span>{item.label}</span>
            <span
              className="ml-auto font-bold"
              aria-label={`${item.label} amount`}
            >
              ₹{item.value}
            </span>
          </li>
        ))}
        {shippingCharge > 0 && (
          <li className="text-red-500 text-sm">
            Enjoy free delivery on orders over ₹499!
          </li>
        )}
        <hr className="border-gray-300" />
        <li className="flex flex-wrap gap-4 text-sm font-bold">
          <span>Total</span>
          <span className="ml-auto" aria-label="Total amount">
            ₹{finalTotal}
          </span>
        </li>
      </ul>
      <div className="mt-4 flex items-center space-x-2">
        <label htmlFor="promoCode" className="sr-only">
          Promo Code
        </label>
        <input
          id="promoCode"
          type="text"
          placeholder="Promo Code"
          value={promoCode}
          onChange={(e) => handlePromoCodeChange(e, resetSelectedCoupon)}
          className="text-sm px-4 py-2 w-full border border-gray-300 rounded-md appearance-none focus:outline-none"
        />
        <button
          type="button"
          onClick={handleApplyPromoCode}
          className="text-sm px-2 py-2 font-semibold tracking-wide bg-green-400 hover:bg-green-500 text-white rounded-md"
        >
          Apply
        </button>
      </div>

      {promoMessage && (
        <p
          className={`mt-2 text-sm ${
            discount ? "text-green-500" : "text-red-500"
          }`}
        >
          {promoMessage}
        </p>
      )}

      <div className="mt-4">
        <button
          type="button"
          onClick={() => setCouponDrawerOpen(!isCouponDrawerOpen)}
          className="text-sm text-blue-600 hover:text-blue-800"
        >
          {isCouponDrawerOpen ? "Close Coupons" : "Best Coupons for You"}
        </button>
      </div>

      {isCouponDrawerOpen && (
        <div className="mt-4 p-4 border border-gray-300 rounded-md">
          <h3 className="text-lg font-bold">Available Coupons</h3>
          <ul className="space-y-2">
            {availableCoupons.map((coupon) => (
              <li key={coupon.code} className="flex items-center gap-2">
                <input
                  type="radio"
                  id={coupon.code}
                  name="coupon"
                  value={coupon.code}
                  checked={selectedCoupon === coupon.code}
                  onChange={() => {
                    setSelectedCoupon(coupon.code)
                    handleCouponSelect(coupon.code)
                  }}
                  className="text-sm"
                />
                <label htmlFor={coupon.code} className="text-sm">
                  <strong>{coupon.description}</strong> <br />
                  <span className="text-xs text-gray-500">{coupon.terms}</span>
                </label>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-8 space-y-2">
        <button
          type="button"
          className="text-sm px-4 py-2.5 w-full font-semibold tracking-wide bg-gray-800 hover:bg-gray-900 text-white rounded-md"
          onClick={() => onProceedToAddress(discount, promoCode)}
        >
          Proceed to Address
        </button>
        <button
          type="button"
          className="text-sm px-4 py-2.5 w-full font-semibold tracking-wide bg-transparent hover:bg-gray-100 text-gray-800 border border-gray-300 rounded-md"
        >
          <Link to="/products">Continue Shopping</Link>
        </button>
      </div>

      {/* Payment Methods */}
      <div className="mt-4 flex flex-wrap justify-center gap-4">
        <img
          src={americanExpress}
          alt="American Express"
          className="w-10 object-contain"
          loading="lazy"
        />
        <img
          src={visa}
          alt="Visa"
          className="w-10 object-contain"
          loading="lazy"
        />
        <img
          src={masterCard}
          alt="MasterCard"
          className="w-10 object-contain"
          loading="lazy"
        />
        <img
          src={gpay}
          alt="Google Pay"
          className="w-10 object-contain"
          loading="lazy"
        />
      </div>
    </div>
  )
}

export default CartSummary
