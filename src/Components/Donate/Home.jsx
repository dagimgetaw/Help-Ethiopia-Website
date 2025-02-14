import member from "../../assets/member.jpg";
import abyssinia from "../../assets/abyssinia.png";

export default function Home() {
  return (
    <div className="pt-40 pb-5 px-10 md:px-12 lg:px-20 xl:px-35 bg-gray-100">
      {/* Donation Header */}
      <h2 className="text-3xl md:text-4x xl:text-5xl 2xl:text-6xl font-text font-semibold text-gray-800 text-center">
        Make a Donation
      </h2>

      {/* Image and Description Section */}
      <div className="flex flex-col lg:flex-row gap-8 pt-12">
        {/* Image */}
        <div className="flex justify-center lg:w-1/2">
          <img
            src={member}
            alt="Team member of Help Ethiopia"
            className="w-full max-w-lg md:max-w-xl lg:max-w-2xl h-auto rounded-lg shadow-xl"
          />
        </div>

        {/* Donation Info */}
        <div className="lg:w-1/2 rounded-lg xl:pt-8 xl:pl-8">
          <p className="text-md md:text-lg leading-8 md:leading-9 font-text">
            HELP Ethiopia is run by volunteers and contributions from our
            generous donors. Your donation will cover medical treatments,
            laboratory investigations, imaging, and surgical supplies for
            patients in need.
          </p>
          <p className="mt-4 text-md md:text-lg leading-8 md:leading-9 font-semibold font-text">
            Every donation makes a difference!
          </p>
        </div>
      </div>

      {/* Bank Details */}
      <div className="mt-16 mb-20 mx-auto max-w-lg bg-white shadow-lg rounded-xl p-6 text-center">
        <img
          src={abyssinia}
          alt="Abyssinia Bank Logo"
          className="w-[240px] max-w-full mx-auto mb-4"
        />
        <h2 className="text-2xl md:text-3xl font-text font-semibold text-gray-800 pb-6">
          Bank Of Abyssinia
        </h2>
        <p className="text-gray-600 mt-2 font-text text-md md:text-lg leading-8 md:leading-9">
          Branch: <span className="font-medium">Filwuha Branch</span>
        </p>
        <p className="text-gray-600 font-text text-md md:text-lg leading-8 md:leading-9">
          Account Name: <span className="font-medium">YeEteye Charity</span>
        </p>
        <p className="text-gray-600 font-text text-md md:text-lg leading-8 md:leading-9">
          Account Number:{" "}
          <span className="font-medium text-[#1E3A8A] text-lg">83291621</span>
        </p>
      </div>
    </div>
  );
}
