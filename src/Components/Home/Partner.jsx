import university from "../../assets/aau.png";
import hospital from "../../assets/anbesa.png";

const partners = [
  {
    src: university,
    alt: "Addis Ababa University Logo",
    width: "w-40",
    mdWidth: "md:w-50",
  },
  {
    src: hospital,
    alt: "Tikur Anbesa Hospital Logo",
    width: "w-60",
    mdWidth: "md:w-70",
  },
  {
    src: university,
    alt: "Addis Ababa University Logo",
    width: "w-50",
    mdWidth: "hidden md:flex",
  },
  {
    src: hospital,
    alt: "Tikur Anbesa Hospital Logo",
    width: "w-70",
    mdWidth: "hidden xl:flex",
  },
  {
    src: university,
    alt: "Addis Ababa University Logo",
    width: "w-50",
    mdWidth: "hidden xl:flex",
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
            className={`${partner.width} h-auto ${partner.mdWidth}`}
          />
        ))}
      </div>
    </div>
  );
}
