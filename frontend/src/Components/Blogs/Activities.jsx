const blogData = [
  {
    id: 1,
    title: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    date: "Jun 14 . 3 min read",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur debitis impedit accusantium aliquid in voluptates, voluptatum incidunt! Quo aut impedit assumenda officia ex voluptas laborum mollitia molestias, possimus, laudantium culpa?",
    image:
      "https://hips.hearstapps.com/hmg-prod/images/types-of-doctors-1600114658.jpg?crop=1xw:0.8425829875518672xh;center,top&resize=1200:*",
    read: "Read more",
  },
  {
    id: 2,
    title: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    date: "Jun 14 . 3 min read",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur debitis impedit accusantium aliquid in voluptates, voluptatum incidunt! Quo aut impedit assumenda officia ex voluptas laborum mollitia molestias, possimus, laudantium culpa?",
    image:
      "https://hips.hearstapps.com/hmg-prod/images/types-of-doctors-1600114658.jpg?crop=1xw:0.8425829875518672xh;center,top&resize=1200:*",
    read: "Read more",
  },
];
export default function Activities() {
  return (
    <div className="pt-15 px-25 bg-gray-100 font-text">
      <p className="text-center text-gray-800 text-lg font-semibold mb-6">
        <span className="border-b-2 border-gray-800 pb-1">Activities</span>
      </p>
      <div className="flex flex-col gap-10 pt-5">
        {blogData.map((data) => (
          <div
            key={data.id}
            className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col sm:flex-row hover:shadow-lg transition-shadow duration-300"
          >
            <img
              src={data.image}
              alt={data.title}
              className="h-56 w-120 object-cover"
            />
            <div className="p-4 flex flex-col pl-10">
              <h3 className="text-lg font-semibold text-gray-900 pt-4 pb-2">
                {data.title}
              </h3>
              <p className="text-sm text-gray-600">{data.date}</p>
              <p className="text-gray-700 text-md mt-2 line-clamp-3 pt-2">
                {data.description}
              </p>
              <a
                href="#"
                className="text-[#1E3A8A] font-semibold underline cursor-pointer text-sm mt-2 self-start"
              >
                {data.read}
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
