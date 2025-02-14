import img from "../../assets/patient.jpg";

export default function Hero() {
  return (
    <div className="pt-40 pb-5 px-6 md:px-12 lg:px-20 xl:px-36 bg-gray-100">
      {/* Section Title */}
      <p className="text-3xl md:text-4xl xl:text-5xl 2xl:text-6xl font-bold text-center text-gray-800">
        What We Do
      </p>

      {/* Layout: Text & Image */}
      <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16 pt-10">
        {/* Image Section - Full Width on Small Screens */}
        <div className="w-full lg:w-1/2 flex justify-center">
          <img
            src={img}
            alt="Eteye Image"
            className="w-full max-w-full md:max-w-md lg:max-w-lg xl:max-w-xl h-auto rounded-lg shadow-lg"
          />
        </div>

        {/* Text Section */}
        <div className="w-full lg:w-1/2 space-y-6 text-left">
          <p className="text-md md:text-lg leading-8 md:leading-9 font-text">
            HELP Ethiopia fights for better healthcare in Ethiopia. Our
            <strong> Ye’Eteye Health Charity </strong> directly aids patients
            struggling with medical bills at Tikur Anbessa Hospital.
          </p>
          <p className="text-md md:text-lg leading-8 md:leading-9 font-text">
            We go beyond finances, championing quality improvements in hospitals
            streamlining procedures, improving patient transfers, and enhancing
            data management for better decision making. We also focus on
            optimizing hospital layouts for smoother patient flow and
            well-being.
          </p>
          <p className="text-md md:text-lg leading-8 md:leading-9 font-text">
            But HELP Ethiopia doesn’t stop there. We invest in the future by
            building leadership skills in young Ethiopians, ensuring a new
            generation equipped to tackle healthcare challenges.
          </p>
        </div>
      </div>
    </div>
  );
}
