import university from "../../assets/aau.webp";
import hospital from "../../assets/anbesa.webp";

const partners = [
  {
    src: university,
    alt: "Addis Ababa University Logo",
    style: "w-40 md:w-50",
  },
  {
    src: hospital,
    alt: "Tikur Anbesa Hospital Logo",
    style: "max-w-full h-auto w-60 md:w-70",
  },
  {
    src: university,
    alt: "Addis Ababa University Logo",
    style: "w-50 hidden md:flex",
  },
  {
    src: hospital,
    alt: "Tikur Anbesa Hospital Logo",
    style: "max-w-full h-auto w-60 md:w-70 hidden xl:flex",
  },
  {
    src: university,
    alt: "Addis Ababa University Logo",
    style: "w-50 hidden xl:flex",
  },
];
export default function Partner() {
  return (
    <div className="py-10 px-10 text-center bg-gray-100">
      <h2 className="text-3xl md:text-3x xl:text-4xl 2xl:text-5xl font-text font-semibold mt-4 text-center text-gray-800">
        Our Partners
      </h2>
      <div className="flex justify-evenly gap-2 pt-14">
        {partners.map((partner, index) => (
          <img
            key={index}
            src={partner.src}
            alt={partner.alt}
            loading="lazy"
            className={`${partner.style} h-auto`}
          />
        ))}
      </div>
    </div>
  );
}
