const blogData = [
  {
    id: 1,
    title: "Lorem ipsum dolor sit.",
    date: "Jun 14 . 3 min read",
    description:
      "Lorem ipsum dolor sit amet cons adipisicing elit. Consectetur debitis impedit accusantium aliquid in voluptates.",
    image:
      "https://hips.hearstapps.com/hmg-prod/images/types-of-doctors-1600114658.jpg?crop=1xw:0.8425829875518672xh;center,top&resize=1200:*",
    read: "Read more",
  },
  {
    id: 2,
    title: "Lorem ipsum dolor sit.",
    date: "Jun 14 . 3 min read",
    description:
      "Lorem ipsum dolor sit amet cons adipisicing elit. Consectetur debitis impedit accusantium aliquid in voluptates.",
    image:
      "https://hips.hearstapps.com/hmg-prod/images/types-of-doctors-1600114658.jpg?crop=1xw:0.8425829875518672xh;center,top&resize=1200:*",
    read: "Read more",
  },
  {
    id: 3,
    title: "Lorem ipsum dolor sit.",
    date: "Jun 14 . 3 min read",
    description:
      "Lorem ipsum dolor sit amet cons adipisicing elit. Consectetur debitis impedit accusantium aliquid in voluptates.",
    image:
      "https://hips.hearstapps.com/hmg-prod/images/types-of-doctors-1600114658.jpg?crop=1xw:0.8425829875518672xh;center,top&resize=1200:*",
    read: "Read more",
  },
];

export default function Recent() {
  return (
    <div className="pt-15 px-25 bg-gray-100 font-text">
      <p className="text-center text-gray-800 text-lg font-semibold mb-6 ">
        <span className="border-b-1 border-gray-800">Recent Posts</span>
      </p>
      <div className="pt-5 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-10 mt-6">
        {blogData.map((data) => (
          <div
            key={data.id}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <img
              src={data.image}
              alt={data.title}
              className="w-full h-50 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl text-center font-semibold text-gray-900 pt-2 pb-2">
                {data.title}
              </h3>
              <p className="text-sm text-gray-600 pb-4">{data.date}</p>
              <p className="text-gray-700 text-base mb-4">{data.description}</p>
              <a
                href="#"
                className="text-[#1E3A8A] font-semibold underline cursor-pointer font-text text-base md:text-md"
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
