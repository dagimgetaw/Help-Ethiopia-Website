import aau from "../../assets/aau.png";
import anbesa from "../../assets/anbesa.png";

export default function Partner() {
  return (
    <div className="py-10 px-10 text-center bg-gray-100">
      <h2 className="text-3xl md:text-3x xl:text-4xl 2xl:text-5xl font-text font-semibold mt-4 text-center text-gray-800">
        Our Partners
      </h2>
      <div className="flex justify-evenly gap-2 pt-14">
        <img
          src={aau}
          alt="Addis Ababa University Logo"
          className="w-40 h-auto md:w-50"
        />
        <img
          src={anbesa}
          alt="Tikur Anbesa Logo"
          className="w-60 h-auto md:w-70"
        />
        <img
          src={aau}
          alt="Addis Ababa University Logo"
          className="w-50 h-auto hidden md:flex"
        />
        <img
          src={anbesa}
          alt="Tikur Anbesa Logo"
          className="w-70 h-auto hidden xl:flex"
        />
        <img
          src={aau}
          alt="Addis Ababa University Logo"
          className="w-50 h-auto hidden xl:flex"
        />
      </div>
    </div>
  );
}
