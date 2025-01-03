import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../store/store"
import { FaTruck, FaFileInvoice } from "react-icons/fa"
import { addToCart } from "../store/cartSlice"
import { useNavigate } from "react-router"
import { FiBox } from "react-icons/fi"
import { EmptyState } from "../components"
import { handleDownloadReceipt } from "../utils/downloadPdf"
import { Customer, Order, OrderItem } from "../types"
import { motion } from "framer-motion"

const Orders = () => {
  const navigate = useNavigate()
  const { orders } = useSelector((state: RootState) => state.orders)
  const hasOrders = orders?.length > 0
  const dispatch = useDispatch()

  const handleReorder = (items: OrderItem[]) => {
    items.forEach((item) => {
      dispatch(addToCart(item))
    })
  }

  const handleShopNow = () => {
    navigate("/products")
  }

  const handleDownloadOrderReceipt = (order: Order, customer: Customer) => {
    handleDownloadReceipt(order, customer, order.promoCode, order.discount)
  }

  return (
    <div className="container mx-auto my-8">
      <motion.h2
        className="text-2xl font-bold mb-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {hasOrders ? "Your Orders" : "No Orders Found"}
      </motion.h2>

      {hasOrders ? (
        <motion.div
          className="grid gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {orders.map((order: Order) => (
            <motion.div
              key={order.id}
              className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-1 transition duration-300"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              {/* Order Header */}
              <div className="flex justify-between items-center mb-3 border-b pb-2">
                <div>
                  <h3 className="text-base font-semibold text-gray-800">
                    Order #{order.id}
                  </h3>
                  <p className="text-sm text-gray-500">{order.date}</p>
                </div>
                <FaTruck className="text-xl text-blue-500" />
              </div>

              {/* Order Items */}
              <div className="space-y-3">
                {order.items.map((item: OrderItem) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-3 border-b pb-3 last:border-none"
                  >
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="w-16 h-16 object-cover rounded-md shadow-sm transition-transform duration-300 hover:scale-105"
                      loading="lazy"
                    />
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-gray-800 truncate">
                        {item.title}
                      </p>
                      <p className="text-xs text-gray-500">
                        ₹{item.price.toFixed(2)} &times; {item.quantity}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Total */}
              <div className="mt-4 text-right">
                <p className="text-sm font-semibold text-gray-800">
                  Subtotal: ₹{Number(order.total).toFixed(2)}
                </p>
                {order?.promoCode ? (
                  <p className="text-xs text-green-500">
                    Promo Code <strong>{order.promoCode}</strong> applied.
                    Discount: ₹{order.discount?.toFixed(2)}
                  </p>
                ) : (
                  <p className="text-xs text-green-500">
                    Promo Code: None applied. Discount: ₹0.00
                  </p>
                )}
                <p className="text-sm font-semibold text-gray-800">
                  Tax (18%): ₹{(Number(order.total) * 0.18).toFixed(2)}
                </p>
                {order?.deliveryCharge ? (
                  <p className="text-xs text-red-500">
                    Delivery charge: ₹{order.deliveryCharge.toFixed(2)}
                  </p>
                ) : (
                  <p className="text-xs text-red-500">Delivery charge: ₹0.00</p>
                )}
                <p className="text-sm font-semibold text-gray-800">
                  Total: ₹
                  {(
                    Number(order.total) +
                    (order?.deliveryCharge || 0) -
                    (order?.discount || 0) +
                    Number(order.total) * 0.18
                  ).toFixed(2)}
                </p>
                <div className="flex justify-end gap-2 mt-2">
                  <button
                    onClick={() =>
                      handleDownloadOrderReceipt(order, order.customer)
                    }
                    className="bg-blue-500 text-white py-1 px-3 rounded-md text-sm shadow-md hover:bg-blue-600 transition-transform duration-300 hover:scale-105"
                  >
                    <FaFileInvoice className="inline-block mr-1" />
                    Download Receipt
                  </button>
                  <button
                    onClick={() => handleReorder(order.items)}
                    className="bg-green-500 text-white py-1 px-3 rounded-md text-sm shadow-md hover:bg-green-600 transition-transform duration-300 hover:scale-105"
                  >
                    Reorder
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <EmptyState
          message="You haven’t placed any orders yet."
          buttonText="Shop Now"
          onButtonClick={handleShopNow}
          icon={<FiBox />}
        />
      )}
    </div>
  )
}

export default Orders
