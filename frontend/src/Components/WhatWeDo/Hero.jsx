import img from "../../assets/patient.webp";

export default function Hero() {
  return (
    <div className="pt-30 pb-5 px-6 md:px-12 lg:px-20 xl:px-36 bg-gray-100 font-text">
      <p className="text-3xl md:text-4xl xl:text-5xl font-semibold mt-4 text-center text-gray-800 pb-10">
        What We Do
      </p>
      <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16 pt-10">
        <div className="w-full lg:w-1/2 flex justify-center">
          <img
            src={img}
            alt="Patient receiving medical care at a healthcare facility"
            loading="lazy"
            className="w-full max-w-full md:max-w-md lg:max-w-lg xl:max-w-xl h-auto rounded-lg shadow-lg"
          />
        </div>
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
