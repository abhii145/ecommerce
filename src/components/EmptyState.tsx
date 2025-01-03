import { ReactNode } from "react"

interface EmptyStateProps {
  message: string
  buttonText: string
  onButtonClick: () => void
  icon: ReactNode
}

const EmptyState = ({
  message,
  buttonText,
  onButtonClick,
  icon,
}: EmptyStateProps) => (
  <div className="flex flex-col items-center justify-center mt-12 space-y-4">
    <div className="text-6xl text-gray-300" aria-hidden="true">
      {icon}
    </div>
    <p className="text-lg text-gray-500" role="alert">
      {message}
    </p>
    <button
      className="bg-blue-500 text-white py-2 px-6 rounded-md shadow-md hover:bg-blue-600 transition-transform duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
      onClick={onButtonClick}
      aria-label={buttonText}
    >
      {buttonText}
    </button>
  </div>
)

export default EmptyState
