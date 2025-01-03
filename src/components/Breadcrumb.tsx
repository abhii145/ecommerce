import { Link, useLocation } from "react-router"

const Breadcrumbs = () => {
  const location = useLocation()
  const pathnames = location.pathname.split("/").filter((x) => x)

  if (pathnames.length === 0) {
    return null
  }

  return (
    <nav aria-label="breadcrumb" className="text-sm text-gray-600 my-4">
      <ol className="flex space-x-2">
        <li>
          <Link to="/" className="hover:text-blue-500">
            Home
          </Link>
        </li>
        {pathnames.map((value, index) => {
          const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`
          const isLast = index === pathnames.length - 1
          return (
            <li key={index} className="flex items-center">
              <span className="mx-2" aria-hidden="true">/</span>
              {isLast ? (
                <span aria-current="page">{value}</span>
              ) : (
                <Link to={routeTo} className="hover:text-blue-500">
                  {value}
                </Link>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

export default Breadcrumbs
