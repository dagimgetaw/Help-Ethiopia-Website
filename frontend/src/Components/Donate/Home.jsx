import member from "../../assets/member.webp";

export default function Home() {
  return (
    <div className="pt-30 pb-10 px-6 md:px-12 lg:px-20 bg-gray-100 font-text">
      <h2 className="text-3xl md:text-4xl xl:text-5xl font-semibold mt-4 text-center text-gray-800 mb-10">
        Make a Donation
      </h2>
      <div className="flex flex-col lg:flex-row ">
        <div className="flex justify-center lg:w-1/2">
          <img
            src={member}
            alt="Members of Help Ethiopia"
            className="w-full max-w-lg rounded-lg shadow-lg"
          />
        </div>
        <div className="lg:w-1/2 pt-10">
          <p className="text-lg leading-relaxed">
            HELP Ethiopia is run by volunteers and contributions from generous
            donors. Your donation will cover medical treatments, laboratory
            investigations, imaging, and surgical supplies for patients in need.
          </p>
          <p className="mt-4 text-lg font-semibold">
            Every donation makes a difference!
          </p>
        </div>
      </div>
    </div>
  );
}
