import Carousel from "./Carousel"
import banner1 from "../assets/banner1.svg"

const Hero = () => {
  const slides = [
    {
      type: "gradient",
      background: "bg-gradient-to-r from-blue-500 to-indigo-600",
      title: "Welcome to ShopEasy",
      description: "Discover amazing products at unbeatable prices.",
      buttonText: "Shop Now",
      link: "/products",
    },
    {
      type: "image",
      imageSrc: banner1,
      altText: "Banner showcasing new arrivals",
      link: "/products",
    },
    {
      type: "image",
      imageSrc: banner1,
      altText: "Banner showcasing new arrivals",
      link: "/new-arrivals",
    },
  ]

  return (
    <section aria-labelledby="hero-heading">
      <h1 id="hero-heading" className="sr-only">Welcome to ShopEasy</h1>
      <Carousel slides={slides} />
    </section>
  )
}

export default Hero
