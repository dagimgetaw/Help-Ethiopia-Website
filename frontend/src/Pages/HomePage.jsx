import Home from "../Components/Home/Home";
import Hero from "../Components/Home/Hero";
import Service from "../Components/Home/Service";
import Stats from "../Components/Home/Stats";
import Message from "../Components/Home/Message";
import Partner from "../Components/Home/Partner";
import FAQ from "../Components/Home/FAQ";
import Testimonial from "../Components/Home/Testimonial";
import Contact from "../Components/Home/Contact";

export default function HomePage() {
  return (
    <>
      <Home />
      <Hero />
      <Service />
      <Stats />
      <Message />
      <Partner />
      <FAQ />
      <Testimonial />
      <Contact />
    </>
  );
}
