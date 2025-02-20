import Home from "../Components/Home/Home";
import Hero from "../Components/Home/Hero";
import Service from "../Components/Home/Service";
import News from "../Components/Home/News";
import Stats from "../Components/Home/Stats";
import Message from "../Components/Home/Message";
import Partner from "../Components/Home/Partner";
import FAQ from "../Components/Home/FAQ";
import Contact from "../Components/Home/Contact";

export default function HomePage() {
  return (
    <>
      <Home />
      <Hero />
      <Service />
      <News />
      <Stats />
      <Message />
      <Partner />
      <FAQ />
      <Contact />
    </>
  );
}
