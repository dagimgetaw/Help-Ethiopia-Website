import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const testimonialData = [
  {
    id: 1,
    message:
      "This platform has completely changed the way I work. The experience has been incredible!",
    image:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
    name: "John Doe",
  },
  {
    id: 2,
    message:
      "Highly recommend! The support team is amazing, and the interface is so easy to use.",
    image:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
    name: "Jane Smith",
  },
  {
    id: 3,
    message:
      "A fantastic experience from start to finish. I love the features!",
    image:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
    name: "Alice Johnson",
  },
];

export default function Testimonial() {
  const [index, setIndex] = useState(0);

  const prevTestimonial = () => {
    setIndex((prev) => (prev === 0 ? testimonialData.length - 1 : prev - 1));
  };

  const nextTestimonial = () => {
    setIndex((prev) => (prev === testimonialData.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="pt-4 pb-20 px-6 md:px-20 bg-gray-100 font-text text-center">
      <p className="text-3xl md:text-3x xl:text-4xl 2xl:text-5xl pb-12 font-text font-semibold mt-4 text-center text-gray-800">
        Testimonial
      </p>

      <div className="relative p-8 max-w-2xl mx-auto flex flex-col items-center">
        <img
          src={testimonialData[index].image}
          alt={testimonialData[index].name}
          className="w-24 h-24 rounded-full mb-4"
        />
        <p className="text-gray-600 italic text-lg">
          "{testimonialData[index].message}"
        </p>
        <h3 className="mt-4 text-lg font-semibold text-gray-900">
          {testimonialData[index].name}
        </h3>

        <div
          className="absolute top-1/2 transform -translate-y-1/2 -left-30 cursor-pointer text-gray-600 hover:text-gray-900"
          onClick={prevTestimonial}
        >
          <ChevronLeft size={32} />
        </div>

        <div
          className="absolute top-1/2 transform -translate-y-1/2 -right-30 cursor-pointer text-gray-600 hover:text-gray-900"
          onClick={nextTestimonial}
        >
          <ChevronRight size={32} />
        </div>
      </div>
    </div>
  );
}
