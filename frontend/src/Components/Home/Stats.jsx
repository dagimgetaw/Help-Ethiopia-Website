import CountUp from "react-countup";

export default function Stats() {
  return (
    <div className="py-10 px-6 text-center bg-gray-100 ">
      <h2 className="text-3xl md:text-3x xl:text-4xl 2xl:text-5xl font-text font-semibold mt-4 text-center text-gray-800">
        Our Stats
      </h2>
      <div className="flex items-center justify-evenly font-text pt-14 gap-8">
        <div>
          <h2 className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl  font-title font-bold text-gray-800">
            <CountUp start={0} end={10} duration={4.5} />+
          </h2>
          <p className="text-sm font-text sm:text-md text-gray-700">
            Active Programs
          </p>
        </div>
        <div>
          <h2 className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl  font-title font-bold text-gray-800">
            <CountUp start={0} end={100} duration={4.5} />+
          </h2>
          <p className="text-sm font-text sm:text-md text-gray-700">
            Volunteers
          </p>
        </div>
        <div>
          <h2 className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-title font-bold text-gray-800">
            <CountUp start={0} end={1000} duration={4.5} />+
          </h2>
          <p className="text-sm font-text sm:text-md text-gray-700">
            Patients Helped
          </p>
        </div>
      </div>
    </div>
  );
}
