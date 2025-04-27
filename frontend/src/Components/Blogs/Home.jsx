import { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Clock, Calendar, User } from "lucide-react";
import image1 from "../../assets/image1.webp";
import image2 from "../../assets/image2.webp";

const data = [
  {
    id: 1,
    image: image1,
    title: "lorem ipsum dolor sit amet",
    content:
      "lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    author: "Author 1",
    date: "Jun 14, 2023",
    readTime: "5 min read",
    category: "Technology",
    tags: ["Web Dev", "JavaScript", "Trends"],
  },
  {
    id: 2,
    image: image2,
    title: "lorem ipsum dolor sit amet",
    content:
      "lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    author: "Author 2",
    date: "Jul 5, 2023",
    readTime: "8 min read",
    category: "Design",
    tags: ["Sustainability", "UI/UX", "Eco-Tech"],
  },
];

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleTransitionEnd = () => setIsTransitioning(false);
    container.addEventListener("transitionend", handleTransitionEnd);

    return () => {
      container.removeEventListener("transitionend", handleTransitionEnd);
    };
  }, []);

  const navigate = (direction) => {
    if (isTransitioning) return;
    setIsTransitioning(true);

    setCurrentIndex((prev) => {
      return direction === "next"
        ? (prev + 1) % data.length
        : (prev - 1 + data.length) % data.length;
    });
  };

  const getTransform = () => {
    return `translateX(-${currentIndex * 100}%)`;
  };
  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-100 font-text">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 pt-15">
            Insights & Updates
          </h2>
          <p className="text-lg leading-8 md:leading-9 text-gray-700 mx-auto mt-4">
            Explore our collection of thought-provoking articles and stay
            updated with the latest trends.
          </p>
        </div>

        <div className="relative group">
          <button
            onClick={() => navigate("prev")}
            className="absolute top-1/2 -left-4 md:-left-6 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-blue-50 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 z-10 cursor-pointer"
            aria-label="Previous slide"
          >
            <ChevronLeft size={24} className="text-gray-700" />
          </button>

          <button
            onClick={() => navigate("next")}
            className="absolute top-1/2 -right-4 md:-right-6 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-blue-50 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 z-10 cursor-pointer"
            aria-label="Next slide"
          >
            <ChevronRight size={24} className="text-gray-700" />
          </button>

          <div
            ref={containerRef}
            className="overflow-hidden rounded-2xl shadow-xl"
          >
            <div
              className="flex transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
              style={{ transform: getTransform() }}
            >
              {data.map((blog) => (
                <div key={blog.id} className="flex-shrink-0 w-full">
                  <div className="bg-white flex flex-col lg:flex-row h-full">
                    <div className="w-full lg:w-1/2 h-80 lg:h-auto relative overflow-hidden">
                      <img
                        src={blog.image}
                        alt={`Image for ${blog.title}`}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                        <span className="inline-block px-3 py-1 text-xs font-medium text-white bg-blue-600 rounded-full">
                          {blog.category}
                        </span>
                      </div>
                    </div>

                    <div className="w-full lg:w-1/2 p-8 md:p-12 flex flex-col">
                      <div className="flex flex-wrap gap-2 mb-4">
                        {blog.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 text-xs font-medium text-gray-600 bg-gray-100 rounded-full"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>

                      <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                        {blog.title}
                      </h3>

                      <p className="text-gray-600 mb-6 leading-relaxed">
                        {blog.content}
                      </p>

                      <div className="mt-auto pt-4 border-t border-gray-100">
                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                          <div className="flex items-center">
                            <User size={14} className="mr-1" />
                            <span>{blog.author}</span>
                          </div>
                          <div className="flex items-center">
                            <Calendar size={14} className="mr-1" />
                            <span>{blog.date}</span>
                          </div>
                          <div className="flex items-center">
                            <Clock size={14} className="mr-1" />
                            <span>{blog.readTime}</span>
                          </div>
                        </div>

                        <button className="mt-4 inline-flex items-center px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors">
                          Read more
                          <ChevronRight size={16} className="ml-1" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Pagination Indicators */}
        <div className="flex justify-center mt-8 gap-2">
          {data.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                currentIndex === index
                  ? "bg-blue-600 w-6"
                  : "bg-gray-300 hover:bg-gray-400"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
