import { FaMinus, FaPlus, FaTrashAlt } from "react-icons/fa"
import { CartItemProps } from "../types"

const CartItem: React.FC<CartItemProps> = ({
  item,
  onIncrease,
  onDecrease,
  onRemove,
}) => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between border-b py-4">
      <div className="flex items-center space-x-4 mb-4 md:mb-0">
        <img
          src={item.thumbnail}
          alt={item.title}
          className="w-24 h-24 object-cover rounded-md"
          loading="lazy"
        />
        <div>
          <h3 className="text-lg font-semibold">{item.title}</h3>
          <p className="text-gray-500">Brand: {item.brand}</p>
          <p className="text-gray-700">₹{item.price}</p>
        </div>
      </div>
      <div className="flex items-center space-x-4 w-full justify-between md:w-auto">
        <div className="flex items-center space-x-2">
          <button
            onClick={() => onDecrease(item.id)}
            className="p-2 bg-gray-200 rounded-full hover:bg-gray-300"
            aria-label={`Decrease quantity of ${item.title}`}
            data-testid="decrease-button"
          >
            <FaMinus />
          </button>
          <span className="text-gray-700" aria-live="polite">{item.quantity}</span>
          <button
            onClick={() => onIncrease(item.id)}
            className="p-2 bg-gray-200 rounded-full hover:bg-gray-300"
            aria-label={`Increase quantity of ${item.title}`}
            data-testid="increase-button"
          >
            <FaPlus />
          </button>
        </div>
        <p className="text-gray-700">
          ₹{(item.price * item.quantity).toFixed(2)}
        </p>
        <button
          onClick={() => onRemove(item.id)}
          className="text-red-500 hover:text-red-700"
          aria-label={`Remove ${item.title} from cart`}
          data-testid="remove-button"
        >
          <FaTrashAlt />
        </button>
      </div>
    </div>
  )
}

export default CartItem
