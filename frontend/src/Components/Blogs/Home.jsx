import { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import image1 from "../../assets/image1.webp";
import image2 from "../../assets/image2.webp";

const data = [
  {
    id: 1,
    image: image1,
    title: "Blog Title 1",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur debitis impedit accusantium aliquid in voluptates, voluptatum incidunt! Quo aut impedit assumenda officia ex voluptas laborum mollitia molestias, possimus, laudantium culpa?",
    author: "Abebe",
    date: "Jun 14",
    readTime: "3 min read",
  },
  {
    id: 2,
    image: image2,
    title: "Blog Title 2",
    content:
      "Another blog post content here. This is the second item in our blog carousel. You can add as many as you want.",
    author: "Kebede",
    date: "Jul 5",
    readTime: "5 min read",
  },
];

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    if (containerRef.current) {
      const container = containerRef.current;
      const handleTransitionEnd = () => setIsTransitioning(false);
      container.addEventListener("transitionend", handleTransitionEnd);
      return () =>
        container.removeEventListener("transitionend", handleTransitionEnd);
    }
  }, []);

  const navigate = (direction) => {
    if (isTransitioning) return;
    setIsTransitioning(true);

    setCurrentIndex((prev) => {
      if (direction === "next") {
        return (prev + 1) % data.length;
      } else {
        return (prev - 1 + data.length) % data.length;
      }
    });
  };

  const getTransform = () => {
    return `translateX(-${currentIndex * 100}%)`;
  };

  return (
    <div className="pt-30 text-center bg-gray-100 font-text">
      <h2 className="text-3xl md:text-4xl xl:text-5xl font-semibold mt-4 text-center text-gray-800 pb-10">
        Blogs
      </h2>
      <div className="flex flex-col lg:flex-row gap-10 items-center justify-center h-full">
        <ChevronLeft
          size={48}
          className="ml-10 cursor-pointer hover:scale-110 transition-transform duration-200 z-10"
          onClick={() => navigate("prev")}
        />
        <div className="w-full mx-4 overflow-hidden">
          <div
            ref={containerRef}
            className="flex transition-transform duration-500 ease-[cubic-bezier(0.33,1,0.68,1)]"
            style={{ transform: getTransform() }}
          >
            {data.map((blog) => (
              <div key={blog.id} className="flex-shrink-0 w-full">
                <div className="bg-gray-50 flex flex-col lg:flex-row gap-10 w-full h-full rounded-md">
                  <div className="w-full lg:w-1/2 h-full">
                    <img
                      src={blog.image}
                      alt={`Image for ${blog.title}`}
                      loading="lazy"
                      className="w-full h-full object-cover rounded-l-md"
                    />
                  </div>
                  <div className="w-full lg:w-1/2 h-full flex flex-col text-left p-6 mt-10">
                    <p className="text-gray-800 text-2xl xl:text-3xl font-semibold pb-4">
                      {blog.title}
                    </p>
                    <p className="text-base md:text-lg leading-8 pr-8">
                      {blog.content}
                    </p>
                    <p className="text-md pt-6 font-semibold">
                      Written by {blog.author}
                    </p>
                    <p className="text-base pt-2">
                      {blog.date} · {blog.readTime}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <ChevronRight
          size={48}
          className="mr-10 cursor-pointer hover:scale-110 transition-transform duration-200 z-10"
          onClick={() => navigate("next")}
        />
      </div>
    </div>
  );
}
