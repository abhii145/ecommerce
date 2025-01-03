import React, { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import {
  clearCart,
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
} from "../store/cartSlice"
import { RootState } from "../store/store"
import { CartActionsProps, OrderItem, Customer } from "../types"
import {
  CartItem,
  CartSummary,
  EmptyState,
  AddressForm,
  StepInput,
} from "../components"
import { toast } from "react-toastify"
import { addOrder } from "../store/ordersSlice"
import { useNavigate } from "react-router"
import { FiShoppingCart } from "react-icons/fi"
import { motion } from "framer-motion"
import { clearPromoCode } from "../store/promoCodeSlice"
import { usePromoCode } from "../hooks/usePromoCode"
import Loader from "../components/Loader"

const CartActions = ({ onClear }: CartActionsProps) => (
  <button
    onClick={onClear}
    className="mt-4 p-2 bg-red-500 text-white rounded-md hover:bg-red-600"
  >
    Clear Cart
  </button>
)

const Cart = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { items: cartItems } = useSelector((state: RootState) => state.cart)
  const [address, setAddress] = useState<Customer | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const { handleApplyPromoCode } = usePromoCode()
  const [activeStep, setActiveStep] = useState(1)
  const [discount, setDiscount] = useState(0)
  const [promoCode, setPromoCode] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (address) {
      setIsLoading(false)
    }
  }, [address])

  useEffect(() => {
    dispatch(clearPromoCode())
  }, [cartItems, dispatch])

  const calculateTotal = () =>
    Number(
      cartItems
        ?.reduce((total, item) => total + item.price * item.quantity, 0)
        .toFixed(2)
    )

  const tax = (calculateTotal() * 0.18).toFixed(2)
  const totalWithTax = calculateTotal() + Number(tax)
  const totalWithShipping =
    totalWithTax < 499 ? totalWithTax + 50 : totalWithTax

  const handleRemoveItem = (id: number) => {
    dispatch(removeFromCart(id))
    toast.error("Product deleted", { position: "bottom-right", autoClose: 800 })
  }

  const handleQuantityChange = (
    id: number,
    action: "increase" | "decrease"
  ) => {
    dispatch(
      action === "increase" ? increaseQuantity(id) : decreaseQuantity(id)
    )
    if (action === "decrease") {
      dispatch(clearPromoCode())
    }
    handleApplyPromoCode()
  }

  const handleClearCart = () => {
    dispatch(clearCart())
    toast.error("Cart Cleared", { position: "bottom-right", autoClose: 800 })
  }

  const handleBuyNow = async (
    addressData: Customer,
    discount: number,
    promoCode: string
  ) => {
    setIsSubmitting(true)
    if (!addressData) {
      setActiveStep(2)
      return
    }
    const totalAmount = Math.round((totalWithShipping - discount) * 100)
    const deliveryCharge = calculateTotal() < 499 ? 50 : 0

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: totalAmount,
      currency: "INR",
      name: "Test Company",
      description: "Test Transaction",
      handler: async () => {
        const order = {
          id: new Date().toISOString(),
          items: cartItems as OrderItem[],
          total: calculateTotal().toFixed(2),
          date: new Date().toLocaleString(),
          deliveryCharge,
          customer: addressData as Customer,
          promoCode,
          discount,
        }
        dispatch(addOrder(order))
        dispatch(clearCart())
        toast.success("Payment Successful!", {
          position: "bottom-right",
          autoClose: 800,
        })
        navigate("/orders")
      },
      prefill: {
        name: addressData?.name,
        email: addressData?.email,
        contact: addressData?.mobile,
      },
      theme: { color: "#F37254" },
      method: { upi: true },
    }

    const script = document.createElement("script")
    script.src = "https://checkout.razorpay.com/v1/checkout.js"
    script.onload = () => {
      new (window as any).Razorpay(options).open()
      setIsSubmitting(false)
    }
    script.onerror = () => {
      toast.error("Failed to load payment gateway. Please try again.", {
        position: "bottom-right",
        autoClose: 800,
      })
      setIsSubmitting(false)
    }
    document.body.appendChild(script)
  }

  const handleCheckout = (
    addressData: Customer,
    discount: number,
    promoCode: string
  ) => {
    setAddress(addressData)
    handleBuyNow(addressData, discount, promoCode)
  }

  const handleProceedToCheckout = (discount: number, promoCode: string) => {
    setActiveStep(2)
    setDiscount(discount)
    setPromoCode(promoCode)
  }

  const handleBackToCartSummary = () => {
    setActiveStep(1)
  }

  const hasCartItems = cartItems.length > 0

  const handleShopNow = () => {
    navigate("/products")
  }

  return (
    <motion.div
      className="container mx-auto my-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col lg:flex-row gap-8">
        <motion.div
          className="flex-1 lg:w-1/2"
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl font-bold mb-4">
            {hasCartItems ? "Your Cart" : "Your cart is empty"}
          </h2>
          {hasCartItems ? (
            <div className="space-y-4">
              {cartItems.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  onIncrease={() => handleQuantityChange(item.id, "increase")}
                  onDecrease={() => handleQuantityChange(item.id, "decrease")}
                  onRemove={handleRemoveItem}
                />
              ))}
              <CartActions onClear={handleClearCart} />
            </div>
          ) : (
            <EmptyState
              message="Your cart is empty."
              buttonText="Shop Now"
              onButtonClick={handleShopNow}
              icon={<FiShoppingCart />}
            />
          )}
        </motion.div>
        {hasCartItems && (
          <motion.div
            className="flex-1 lg:w-1/2"
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-white rounded-md px-4 py-6">
              <StepInput
                steps={["Cart Summary", "Address"]}
                activeStep={activeStep}
              />
              {isLoading ? (
                <div className="flex justify-center items-center h-full">
                  <Loader />
                </div>
              ) : activeStep === 2 ? (
                <div>
                  <AddressForm
                    onChange={(addressData) =>
                      handleCheckout(addressData, discount, promoCode)
                    }
                    isSubmitting={isSubmitting}
                    onBack={handleBackToCartSummary}
                  />
                </div>
              ) : (
                <CartSummary
                  total={calculateTotal().toFixed(2)}
                  tax={tax}
                  onProceedToAddress={handleProceedToCheckout}
                />
              )}
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}

export default Cart
