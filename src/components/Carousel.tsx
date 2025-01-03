import { useState, useEffect, useCallback } from "react"
import { motion } from "framer-motion"
import { Link } from "react-router"

interface Slide {
  type: string
  background?: string
  imageSrc?: string
  title?: string
  description?: string
  buttonText?: string
  link?: string
}

interface CarouselProps {
  slides: Slide[]
}

const Carousel = ({ slides }: CarouselProps) => {
  const [currentSlide, setCurrentSlide] = useState(0)

  const handleNext = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }, [slides.length])

  const handlePrev = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }, [slides.length])

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext()
    }, 5000)

    return () => clearInterval(interval)
  }, [handleNext])

  return (
    <div className="relative" aria-roledescription="carousel">
      <motion.div
        className={`relative ${
          slides[currentSlide].type === "gradient"
            ? slides[currentSlide].background
            : ""
        } text-white`}
        style={
          slides[currentSlide].type === "image"
            ? {
                backgroundImage: `url(${slides[currentSlide].imageSrc})`,
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                height: "500px",
              }
            : { height: "500px" }
        }
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        role="group"
        aria-roledescription="slide"
        aria-label={`Slide ${currentSlide + 1} of ${slides.length}`}
      >
        <div className="container mx-auto text-center h-full flex flex-col justify-center items-center">
          {slides[currentSlide].type === "gradient" && (
            <>
              <h1 className="text-5xl font-bold">
                {slides[currentSlide].title}
              </h1>
              <p className="mt-4 text-lg max-w-md mx-auto">
                {slides[currentSlide].description}
              </p>
            </>
          )}

          <button className="mt-6 px-6 py-2 bg-white text-blue-600 rounded-lg shadow hover:bg-blue-100">
            <Link to={slides[currentSlide].link}>
              {slides[currentSlide].buttonText}
            </Link>
          </button>
        </div>
      </motion.div>

      <div className="absolute top-1/2 left-0 transform -translate-y-1/2 px-4">
        <button
          className="text-white text-2xl bg-black bg-opacity-50 p-2 rounded-full"
          onClick={handlePrev}
          aria-label="Previous Slide"
        >
          &#8249;
        </button>
      </div>
      <div className="absolute top-1/2 right-0 transform -translate-y-1/2 px-4">
        <button
          className="text-white text-2xl bg-black bg-opacity-50 p-2 rounded-full"
          onClick={handleNext}
          aria-label="Next Slide"
        >
          &#8250;
        </button>
      </div>

      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full ${
              index === currentSlide ? "bg-green-500" : "bg-gray-600"
            }`}
            onClick={() => setCurrentSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

export default Carousel
