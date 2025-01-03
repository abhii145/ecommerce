import { Link } from "react-router"
import banner from "../assets/404.svg"

const NotFound = () => {
  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen"
      role="main"
    >
      <img
        src={banner}
        alt="404 Not Found"
        className="w-1/2 h-auto"
        loading="lazy"
      />
      <h1 className="text-4xl font-bold mb-2">Page Not Found</h1>
      <p className="text-lg mb-4">
        Sorry, the page you are looking for does not exist.
      </p>
      <Link
        to="/"
        className="text-blue-500 underline"
        aria-label="Go back to Home"
      >
        Go back to Home
      </Link>
    </div>
  )
}

export default NotFound
