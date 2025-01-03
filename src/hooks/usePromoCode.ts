import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../store/store"
import {
  setPromoCode,
  clearPromoCode,
  applyPromoCode,
  selectPromoCode,
  clearPromoMessage,
} from "../store/promoCodeSlice"

export const usePromoCode = () => {
  const dispatch = useDispatch()
  const { promoCode, discount, promoMessage } = useSelector(selectPromoCode)
  const { orders } = useSelector((state: RootState) => state.orders)
  const cartItems = useSelector((state: RootState) => state.cart.items)

  const handleApplyPromoCode = () => {
    dispatch(applyPromoCode({ cartItems, orders }))
  }

  const handlePromoCodeChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    resetSelectedCoupon: () => void
  ) => {
    dispatch(setPromoCode(e?.target?.value))
    if (e.target.value === "") {
      dispatch(clearPromoCode())
      resetSelectedCoupon()
    }
  }

  const handleCouponSelect = (couponCode: string) => {
    dispatch(setPromoCode(couponCode))
    dispatch(clearPromoMessage())
  }

  return {
    promoCode,
    discount,
    promoMessage,
    handleApplyPromoCode,
    handlePromoCodeChange,
    handleCouponSelect,
  }
}
