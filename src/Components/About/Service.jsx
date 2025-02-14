import { Link } from "react-router-dom";

export default function Service() {
  return (
    <div className="py-12 px-6 md:px-16 lg:px-32 bg-gray-100">
      {/* Grid Layout for Responsive Display */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 font-text">
        {/* Our Mission */}
        <div className="bg-white p-6 rounded-lg shadow-md font-text">
          <h2 className="text-3xl font-semibold font-text text-gray-800 mb-4">
            Our Mission
          </h2>
          <p className="text-md md:text-lg md:leading-9 font-text leading-7.5">
            To catalyze sustainable development in Ethiopia by empowering
            healthcare professionals, driving innovation, and fostering a
            comprehensive and inclusive healthcare ecosystem.
          </p>
          <p className="text-md md:text-lg md:leading-9 font-text leading-7.5 mt-4">
            Our mission is fueled by the unwavering belief that every individual
            deserves access to quality healthcare and education, regardless of
            their circumstances.
          </p>
        </div>

        {/* Our Vision */}
        <div className="bg-white p-6 rounded-lg shadow-md font-text">
          <h2 className="text-3xl text-gray-800 font-semibold font-text mb-4">
            Our Vision
          </h2>
          <p className="text-md md:text-lg md:leading-9 font-text leading-7.5">
            We envision a Healthy and Resilient Ethiopia with advanced
            healthcare infrastructure, a well-trained workforce, streamlined
            processes, and inclusive healthcare services for all.
          </p>
        </div>

        {/* Our Activities */}
        <div className="bg-white p-6 rounded-lg shadow-md font-text">
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">
            Our Activities
          </h2>
          <p className="text-md md:text-lg md:leading-9 font-text leading-7.5">
            At HELP Ethiopia, our diverse activities range from supporting
            economically disadvantaged individuals to advocating for quality
            education, enhancing healthcare data registries, and fostering
            patient-friendly hospital environments.
          </p>
          <p className="text-lg mt-4">
            <Link
              to={"/what-we-do"}
              className="text-[#1E3A8A] font-semibold underline cursor-pointer font-text text-lg mt-4"
            >
              Click here to learn What We Do.
            </Link>{" "}
          </p>
        </div>

        {/* Our Team */}
        <div className="bg-white p-6 rounded-lg shadow-md font-text">
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">
            Our Team
          </h2>
          <p className="text-md md:text-lg md:leading-9 font-text leading-7.5">
            HELP Ethiopia is run by a team of professionals who are passionate
            and dedicated to making a positive impact in our community.
          </p>
          <p className="text-lg leading-7.5 mt-4">
            <Link
              to={"/our-team"}
              className="text-[#1E3A8A] font-semibold underline cursor-pointer font-text text-lg mt-4"
            >
              Click here to learn more about us.
            </Link>{" "}
          </p>
        </div>
      </div>
    </div>
  );
}
