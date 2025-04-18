import img from "../../assets/patient.webp";

export default function Hero() {
  return (
    <div className="py-16 px-6 md:px-12 lg:px-20 xl:px-36 bg-gray-100 font-text">
      <div className="max-w-7xl mx-auto">
        <div className="text-center pb-12 relative">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 pt-15">
            What We Do
          </h2>
        </div>

        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          <div className="w-full lg:w-1/2 flex justify-center">
            <div className="relative group">
              <img
                src={img}
                alt="Patient receiving medical care at a healthcare facility"
                loading="lazy"
                className="w-full max-w-full md:max-w-md lg:max-w-lg xl:max-w-xl h-auto rounded-xl shadow-xl transition-transform duration-300 hover:scale-[1.02]"
              />
              <div className="absolute inset-0 rounded-xl bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          </div>

          <div className="w-full lg:w-1/2 space-y-2 text-left">
            <p className="text-lg leading-8 md:leading-9 text-gray-700">
              <span className="font-semibold text-blue-600">HELP Ethiopia</span>{" "}
              fights for better healthcare in Ethiopia. Our{" "}
              <strong className="text-blue-600">
                Ye&apos;Eteye Health Charity
              </strong>{" "}
              directly aids patients struggling with medical bills at Tikur
              Anbessa Hospital.
            </p>

            <p className="text-lg leading-8 md:leading-9 text-gray-700">
              We go beyond finances, championing quality improvements in
              hospitals by streamlining procedures, improving patient transfers,
              and enhancing data management for better decision making. We also
              focus on optimizing hospital layouts for smoother patient flow and
              well-being.
            </p>

            <p className="text-lg leading-8 md:leading-9 text-gray-700">
              But HELP Ethiopia doesn&apos;t stop there. We invest in the future
              by building leadership skills in young Ethiopians, ensuring a new
              generation equipped to tackle healthcare challenges.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
