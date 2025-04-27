import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

const testimonialData = [
  {
    id: 1,
    message:
      "This platform has completely changed the way I work. The experience has been incredible! I've seen a 40% increase in productivity since switching.",
    image:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&auto=format&fit=crop&q=60",
    name: "John Doe",
    role: "CTO, TechCorp",
  },
  {
    id: 2,
    message:
      "Highly recommend! The support team is amazing, and the interface is so intuitive. Our onboarding time for new employees was cut in half.",
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=60",
    name: "Jane Smith",
    role: "Product Manager, Innovate Inc",
  },
  {
    id: 3,
    message:
      "A fantastic experience from start to finish. The features are exactly what our team needed to collaborate effectively across different time zones.",
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&auto=format&fit=crop&q=60",
    name: "Alice Johnson",
    role: "Director of Operations, Global Solutions",
  },
  {
    id: 4,
    message:
      "The ROI has been outstanding. We've streamlined our workflow and reduced operational costs by 25% in just three months of using this platform.",
    image:
      "https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=200&auto=format&fit=crop&q=60",
    name: "Michael Brown",
    role: "CEO, Enterprise Systems",
  },
];

export default function Testimonial() {
  const [index, setIndex] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  const [height, setHeight] = useState(0);
  const testimonialRef = useRef(null);

  const prevTestimonial = () => {
    setIndex((prev) => (prev === 0 ? testimonialData.length - 1 : prev - 1));
    setAutoPlay(false);
  };

  const nextTestimonial = () => {
    setIndex((prev) => (prev === testimonialData.length - 1 ? 0 : prev + 1));
    setAutoPlay(false);
  };

  const goToTestimonial = (idx) => {
    setIndex(idx);
    setAutoPlay(false);
  };

  // Set fixed height based on content
  useEffect(() => {
    if (testimonialRef.current) {
      const resizeObserver = new ResizeObserver((entries) => {
        const height = entries[0].target.scrollHeight;
        setHeight(height);
      });

      resizeObserver.observe(testimonialRef.current);
      return () => resizeObserver.disconnect();
    }
  }, []);

  // Auto-play functionality
  useEffect(() => {
    if (!autoPlay) return;

    const interval = setInterval(() => {
      setIndex((prev) => (prev === testimonialData.length - 1 ? 0 : prev + 1));
    }, 5000);

    return () => clearInterval(interval);
  }, [autoPlay]);

  return (
    <div className="py-16 px-6 md:px-12 lg:px-24 bg-gray-100 font-text">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            What Our Members Say
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Don&apos;t just take our word for it. Here&apos;s what our customers
            have to say about their experience.
          </p>
        </div>

        <div
          className="relative max-w-4xl mx-auto"
          style={{ minHeight: height > 0 ? `${height}px` : "auto" }}
          ref={testimonialRef}
        >
          <div className="bg-white p-8 md:p-10 rounded-xl shadow-lg w-full">
            <div className="flex justify-center mb-6">
              <Quote className="text-blue-500 rotate-180" size={32} />
            </div>

            <div className="flex flex-col items-center text-center">
              <p className="text-lg md:text-xl text-gray-700 mb-8 leading-relaxed max-w-3xl">
                {testimonialData[index].message}
              </p>

              <div className="flex flex-col items-center">
                <img
                  src={testimonialData[index].image}
                  alt={testimonialData[index].name}
                  className="w-16 h-16 rounded-full mb-4 object-cover border-4 border-blue-100"
                />
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    {testimonialData[index].name}
                  </h3>
                  <p className="text-blue-600">{testimonialData[index].role}</p>
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={prevTestimonial}
            className="absolute top-1/2 -left-4 md:-left-6 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-blue-50 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="text-gray-700 cursor-pointer" size={28} />
          </button>

          <button
            onClick={nextTestimonial}
            className="absolute top-1/2 -right-4 md:-right-6 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-blue-50 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Next testimonial"
          >
            <ChevronRight className="text-gray-700 cursor-pointer" size={28} />
          </button>
        </div>

        <div className="flex justify-center mt-6 md:mt-10 space-x-2">
          {testimonialData.map((item, idx) => (
            <button
              key={item.id}
              onClick={() => goToTestimonial(idx)}
              className={`w-3 h-3 rounded-full transition-colors cursor-pointer ${
                index === idx ? "bg-blue-600" : "bg-gray-300 hover:bg-gray-400"
              }`}
              aria-label={`Go to testimonial ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
