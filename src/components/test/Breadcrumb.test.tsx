import { render } from "@testing-library/react"
import { MemoryRouter } from "react-router"
import Breadcrumbs from "../Breadcrumb"
import { useLocation } from "react-router"

jest.mock("react-router", () => ({
  ...jest.requireActual("react-router"),
  useLocation: jest.fn(),
}))

describe("Breadcrumbs", () => {
  const renderBreadcrumbs = (pathname: string) => {
    ;(useLocation as jest.Mock).mockReturnValue({ pathname })
    return render(
      <MemoryRouter>
        <Breadcrumbs />
      </MemoryRouter>
    )
  }

  it("matches snapshot", () => {
    (useLocation as jest.Mock).mockReturnValue({ pathname: "/" })
    const { asFragment } = render(
      <MemoryRouter>
        <Breadcrumbs />
      </MemoryRouter>
    )
    expect(asFragment()).toMatchSnapshot()
  })


  it("renders correctly for root path", () => {
    const { container } = renderBreadcrumbs("/")
    expect(container.querySelector("nav")).toBeNull()
  })

  it("renders correctly for nested path", () => {
    const { container } = renderBreadcrumbs("/section/subsection")
    const links = container.querySelectorAll("a")
    expect(links).toHaveLength(2)
    expect(links[0].getAttribute("href")).toBe("/")
    expect(links[1].getAttribute("href")).toBe("/section")
  })

  it("renders correctly for single path", () => {
    const { container } = renderBreadcrumbs("/section")
    const links = container.querySelectorAll("a")
    expect(links).toHaveLength(1)
    expect(links[0].getAttribute("href")).toBe("/")
  })
})
