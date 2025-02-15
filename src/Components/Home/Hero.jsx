export default function Hero() {
  return (
    <div className="py-12 px-5 md:px-20 xl:px-30 2xl:px-40 bg-gray-100 rounded-md">
      <h2 className="text-center text-4xl md:text-5xl xl:text-5xl 2xl:text-6xl font-semibold text-gray-800">
        Help Ethiopia
      </h2>
      <p className="pt-10 pb-14 text-md md:text-lg leading-8 md:leading-9 font-text">
        HELP Ethiopia is a multi-disciplinary organization registered and
        accorded legal personality in Ethiopia. We have a dedicated charity
        program targeting economically disadvantaged groups of our society,
        known as Ye’Eteye Charity. Furthermore, we advocate for quality
        education, leadership, and collaboration as a tool for sustainable
        healthcare and societal development. Hence the name “HELP” which stands
        for Health, Education, Leadership, and Partnership.
      </p>
      <div className="grid md:flex gap-10">
        <div>
          <h2 className="pb-6 text-3xl text-gray-800 text-center font-semibold">
            Our Mission
          </h2>
          <p className="text-md md:text-lg leading-8 md:leading-9 font-text">
            To catalyze sustainable development in Ethiopia by empowering
            healthcare professionals, driving innovation, and fostering a
            comprehensive and inclusive healthcare ecosystem.
          </p>
          <p className="text-md md:text-lg leading-8 md:leading-9 pt-4 font-text">
            Our mission is fueled by the unwavering belief that every individual
            deserves access to quality healthcare and education, regardless of
            their circumstances.
          </p>
        </div>
        <div className="hidden md:block border-l-2 border-gray-800 h-80"></div>
        <div>
          <h2 className="pb-6 text-3xl text-gray-800 text-center font-semibold">
            Our Vision
          </h2>
          <p className="text-md md:text-lg leading-8 md:leading-9 pb-4 font-text">
            We envision a Healthy, and Resilient Ethiopia with advanced
            healthcare infrastructure, a well-trained workforce, streamlined
            processes, and inclusive healthcare services for all.
          </p>
        </div>
      </div>
    </div>
  );
}
