import { useState } from "react";

const faqs = [
  {
    title: "How can I contribute to the health initiative?",
    text: "You can contribute by donating to our charity or volunteering your time and skills.",
  },
  {
    title: "What types of medical treatments do you provide?",
    text: "We provide a wide range of medical services including surgeries, diagnostics, and medical care for those in need.",
  },
  {
    title: "Can I donate online?",
    text: "Yes, we offer secure online donation options via our website for your convenience.",
  },
  {
    title: "How do I know if my donation was used appropriately?",
    text: "We provide regular updates and transparent reporting on how donations are used to help those in need.",
  },
  {
    title: "Is my donation tax-deductible?",
    text: "Yes, all donations made to our charity are tax-deductible as per the regulations.",
  },
  {
    title: "Where is the charity based?",
    text: "Our charity is based in Addis Ababa, Ethiopia, but we support communities across the country.",
  },
];

export default function FAQ() {
  const [curOpen, setCurOpen] = useState(null);
  return (
    <div className="pt-10 px-10 pb-20 xl:pt-20 2xl:pt-30 bg-gray-100 font-text">
      <h2 className="text-3xl md:text-3x xl:text-4xl 2xl:text-5xl pb-12 font-text font-semibold mt-4 text-center text-gray-800">
        Most Frequently Asked Questions
      </h2>
      {faqs.map((el, i) => (
        <Accordion
          curOpen={curOpen}
          onOpen={setCurOpen}
          title={el.title}
          num={i}
          key={el.title}
        >
          {el.text}
        </Accordion>
      ))}
    </div>
  );
}

// eslint-disable-next-line react/prop-types
function Accordion({ num, title, curOpen, onOpen, children }) {
  const isOpen = num === curOpen;

  function handleToggle() {
    onOpen(isOpen ? null : num);
  }

  return (
    <div
      className={`bg-white shadow-lg pt-8 pl-5 pr-5 pb-8 cursor-pointer border-t-4 ${
        isOpen ? "border-gray-800" : "border-transparent"
      } grid grid-cols-[auto_1fr_auto] gap-x-6 gap-y-8 items-center my-6 mx-2 md:my-8 md:mx-30 xl:mx-60 2xl:mx-80`}
      onClick={handleToggle}
    >
      <p className="text-md md:text-lg">{num < 9 ? `0${num + 1}` : num + 1}</p>
      <p className="text-md md:text-lg">{title}</p>
      <p className="text-md md:text-lg">{isOpen ? "-" : "+"}</p>

      {isOpen && (
        <div className="col-span-2 text-lg pb-4 font-text text-gray-600 text-md text-md md:text-lg leading-8 md:leading-9">
          {children}
        </div>
      )}
    </div>
  );
}
