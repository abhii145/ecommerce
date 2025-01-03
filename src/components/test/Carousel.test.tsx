import { render, screen, fireEvent } from "@testing-library/react"
import Carousel from "../Carousel"
import { BrowserRouter as Router } from "react-router"

const slides = [
  {
    type: "gradient",
    background: "bg-gradient-to-r from-purple-400 via-pink-500 to-red-500",
    title: "Slide 1",
    description: "Description 1",
    buttonText: "Button 1",
    link: "/link1",
  },
  {
    type: "image",
    imageSrc: "https://via.placeholder.com/800x400",
    title: "Slide 2",
    description: "Description 2",
    buttonText: "Button 2",
    link: "/link2",
  },
]

describe("Carousel", () => {
  it("renders the first slide initially", () => {
    render(
      <Router>
        <Carousel slides={slides} />
      </Router>
    )
    expect(screen.getByText("Slide 1")).toBeInTheDocument()
    expect(screen.getByText("Description 1")).toBeInTheDocument()
  })

  it("matches snapshot", () => {
    const { asFragment } = render(
      <Router>
        <Carousel slides={slides} />
      </Router>
    )
    expect(asFragment()).toMatchSnapshot()
  })

  it("navigates to the previous slide", () => {
    render(
      <Router>
        <Carousel slides={slides} />
      </Router>
    )
    fireEvent.click(screen.getByLabelText("Next Slide"))
    fireEvent.click(screen.getByLabelText("Previous Slide"))
    expect(screen.getByText("Slide 1")).toBeInTheDocument()
    expect(screen.getByText("Description 1")).toBeInTheDocument()
  })
})
