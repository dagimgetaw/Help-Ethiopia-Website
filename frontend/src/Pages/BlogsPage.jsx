import Home from "../Components/Blogs/Home";
import Recent from "../Components/Blogs/Recent";
import Activities from "../Components/Blogs/Activities";
import YoutubeChannel from "../Components/Blogs/Youtube";
import Testimonial from "../Components/Blogs/Testimonia";
// import Info from "../Components/Blogs/Info";

export default function ContactPage() {
  return (
    <>
      <Home />
      <Recent />
      <YoutubeChannel />
      <Activities />
      <Testimonial />
      {/* <Info /> */}
    </>
  );
}
